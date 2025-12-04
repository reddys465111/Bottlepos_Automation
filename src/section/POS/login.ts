import { type Page, type Locator, expect } from "@playwright/test";
import { TextField } from "../../objects/textField";
import { Button } from "../../objects/button";
import { POS } from "../POS";
import { Session } from "../../utils/session";

export class Login {
    _locator: Locator;
    _page: Page;
    //** first Identify objects */
    public UserName: TextField;
    public Password: TextField;
    public LoginButton: Button;

    constructor(page: Page) {
        this._page = page;
        this._locator = this._page.locator('#loginmodal');
        // Initialize all the objects
        this.UserName = new TextField(this._locator.locator('#username'));
        this.Password = new TextField(this._locator.locator('#password'));
        this.LoginButton = new Button(this._locator.getByRole('button', { name: 'Login' }));
    }

    /**
     * Wait for the login form to be visible
     * @returns true if the login form is visible, false if not
     */
    public async FormVisible(): Promise<boolean> {
        return await this._locator.isVisible();
    }

    /**
     * Wait up to 25 seconds for the login form to be hidden
     * @returns true if the login form is not longer visible, false if not
     */
    public async FormNotVisible(): Promise<boolean> {
        return await this._locator.isHidden();
    }

    public async WaitForLoadingBar(): Promise<void> {
        await this._page.getByText('Getting device settings...').waitFor({ state: "attached" });
        await this._page.getByText('Getting Stored Items...').waitFor({ state: 'attached' });
    }
    /**
     * Checks if the field is editable
     * @param field The field to check
     * @returns true if the field is editable, false if not
     */
    public async IsFieldEditable(field: TextField): Promise<boolean> {
        if (field === this.UserName) {
            return await this.UserName.IsEditable();
        } else if (field === this.Password) {
            return await this.Password.IsEditable();
        } else {
            throw new Error(`Field is not recognized`);
        }
    }

    /**
     * In methods will login with default admin credentials,
     * all the following params are optionals
     * @param user, if needed to login with an specific credential
     * @param password, if needed a different password
     * @param device , if needed a different device
     * @param location , if needed a different location
     * @param reloadURL , if needed to reload the browser url
     * @example await POS.Login.In({user: 'register', password: 'newPassword', device: 'Device (Inventory)', location: 'Inventory', reloadURL: true});
     */
    public async In(credentials?: { user?: string, password?: string, device?: string, location?: string, reloadURL?: boolean }): Promise<void> {
        if (credentials?.reloadURL) {
            await this._page.goto(Session.URL);
        }
        // wait until the login form is displayed
        expect(await this.FormVisible(), 'The login form is not visible').toBeTruthy();
        if (await POS.Dialog.Alert.IsVisible()) {
            await POS.Dialog.Alert.Ok.Click();
        }

        //If the Alert dialog is displayed then close it
        if (await POS.Dialog.AlertDeviceSetup.IsVisible()) {
            await POS.Dialog.AlertDeviceSetup.Ok.Click();
        }

        //Set the user and password and then  click on the login button
        await POS.Login.UserName.setText({ value: credentials?.user ?? Session.User });
        await POS.Login.Password.setText({ value: credentials?.password ?? Session.Password });
        await POS.Login.LoginButton.Click();

        if (await POS.Dialog.InitialDeviceSetup.IsVisible() && (credentials?.reloadURL !== undefined || credentials?.reloadURL !== false)) {

            console.log('InitialDeviceSetup is visible');
            // if (await POS.Dialog.InitialDeviceSetup.ExistingDevice.IsVisible()) {
            await POS.Dialog.InitialDeviceSetup.ExistingDevice.SelectOption({ byText: credentials?.device ?? Session.Device.Name });
            // }
            //From existing Location dropdown select Inventory
            if (await POS.Dialog.InitialDeviceSetup.ExistingLocation.IsVisible()) {
                await POS.Dialog.InitialDeviceSetup.ExistingLocation.SelectOption({ byText: credentials?.location ?? Session.Location.Name });
            }
            
            // register device
            await POS.Dialog.InitialDeviceSetup.Register.Click();
            await this.WaitForLoadingBar();

            console.log('InitialDeviceSetup is not visible');
        }
       
        //Verify the Login form is not longer visible
        expect(await POS.Login.FormNotVisible(), 'The login form is still visible').toBeTruthy();
    }
}