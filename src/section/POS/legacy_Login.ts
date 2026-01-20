import { type Page, type Locator, expect } from "@playwright/test";
import { TextField } from "../../objects/textField";
import { Button } from "../../objects/button";
import { POS } from "../POS";
import { Session } from "../../utils/session";
import { Loader } from "../../objects/loader";
import { Dialog_Logout } from "./dialogs/dialog_Logout";

export class Legacy_Login {
    _locator: Locator;
    _page: Page;
    //** first Identify objects */
    public UserName: TextField;
    public Password: TextField;
    public LoginButton: Button;
    public Loader: Loader;

    private Logout: Dialog_Logout;
    constructor(page: Page) {
        this._page = page;
        this._locator = page.locator('#loginmodal');
        // Initialize all the objects
        this.UserName = new TextField(this._locator.locator('#username'));
        this.Password = new TextField(this._locator.locator('#password'));
        this.LoginButton = new Button(this._locator.getByRole('button', { name: 'Login' }));
        this.Loader = new Loader(page);
        this.Logout = new Dialog_Logout(page);

        this.LoginButton.SetAfterEvent(async () => {
            await this.Loader.waitForVisible();
            await this.Loader.waitForHidden();
        });
    }

    /**
     * Wait for the login form to be visible
     * @returns void
     */
    public async WaitForLoginVisible(): Promise<void> {
        await this._locator.waitFor({ state: 'visible' });
    }

    /**
     * Wait for the login form to be hidden
     * @returns void
     */
    public async WaitForLoginHidden(): Promise<void> {
        await this._locator.waitFor({ state: 'hidden' });
    }
    /**
     * Wait for the login form to be visible
     * @returns true if the login form is visible, false if not
     */
    public async FormVisible(): Promise<boolean> {
        await this._locator.waitFor({ state: 'visible' });
        return this._locator.isVisible();
    }

    /**
     * Wait up to 25 seconds for the login form to be hidden
     * @returns true if the login form is not longer visible, false if not
     */
    public async FormNotVisible(): Promise<boolean> {
        await this._locator.waitFor({ state: 'hidden' });
        return this._locator.isHidden();
    }

    /**
     * Wait for the loading bar to be visible
     * @returns void
     */ 
    public async WaitForLoadingBar(): Promise<void> {
        await this._page.getByText('Getting device settings...').waitFor({ state: "hidden" });
        await this._page.getByText('Getting Stored Items...').waitFor({ state: 'hidden' });
        await this._page.getByText('Getting Customer Accounts...').waitFor({ state: 'hidden' });
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
     * @param reloadURL , if needed to reload the browser urlç
     * @param validateForm , if needed to validate the login form
     * @example await POS.Login.In({user: 'register', password: 'newPassword', device: 'Device (Inventory)', location: 'Inventory', reloadURL: true});
     */
    public async In(options?: { user?: string, password?: string, device?: string, location?: string, reloadURL?: boolean, validateForm?: boolean }): Promise<void> {
        if (options?.reloadURL) {
            await this._page.goto(Session.URL);
        }

        // wait until the login form is displayed
        if (options?.validateForm) {
            expect(await this.FormVisible(), 'The login form is not visible').toBeTruthy();
        }

        if (await POS.Dialog.Legacy_Alert.IsVisible()) {
            await POS.Dialog.Legacy_Alert.Ok.Click();
        }

        //If the Alert dialog is displayed then close it
        if (await POS.Dialog.Legacy_AlertDeviceSetup.IsVisible()) {
            await POS.Dialog.Legacy_AlertDeviceSetup.Ok.Click();
        }
        //Set the user and password and then  click on the login button
        await POS.Login.UserName.setText({ value: (options?.user ?? Session.User).trim() });
        await POS.Login.Password.setText({ value: (options?.password ?? Session.Password).trim() });
        await POS.Login.LoginButton.Click();
        
        if (await POS.Dialog.Legacy_InitialDeviceSetup.IsVisible() && (options?.reloadURL !== undefined || options?.reloadURL !== false)) {

            // if (await POS.Dialog.Legacy_InitialDeviceSetup.ExistingDevice.IsVisible()) {
                //From Existing Device dropdown select the Pax(Auto) (Inventory)
            await POS.Dialog.Legacy_InitialDeviceSetup.ExistingDevice.SelectOption({ byText: options?.device ?? Session.Device.Name });
            // }

            //From existing Location dropdown select Inventory
            if (await POS.Dialog.Legacy_InitialDeviceSetup.ExistingLocation.IsVisible()) {
                await POS.Dialog.Legacy_InitialDeviceSetup.ExistingLocation.SelectOption({ byText: options?.location ?? Session.Location.Name });
            }

            // register device
            await POS.Dialog.Legacy_InitialDeviceSetup.Register.Click();
            await this.WaitForLoadingBar();
        }
       
        //Verify the Login form is not longer visible
        if (options?.validateForm) {
            expect(await POS.Login.FormNotVisible(), 'The login form is still visible').toBeTruthy();
        }
        
        // Try to wait for the Logout button to become visible to ensure login completed.
        // This is bounded and wrapped in try/catch to avoid breaking flows that show other dialogs.
        try {
            await this._page.getByRole('button', { name: 'Logout' }).waitFor({ state: 'visible', timeout: 10000 });
        } catch (err) {
            // Ignore: in some scenarios a different dialog or flow appears after login.
        }
    }
}