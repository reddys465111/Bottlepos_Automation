import { type Page, type Locator, expect } from "@playwright/test";
import { TextField } from "../../objects/textField";
import { Button } from "../../objects/button";
import { POS } from "../POS";
import { Session } from "../../utils/session";
import { LegacyDialog_Alert } from "../POS/dialogs/legacy/legacyDialog_Alert";
import { LegacyDialog_InitialDeviceSetup } from "../POS/dialogs/legacy/legacyDialog_InitialDeviceSetup";
import { LegacyDialog_AlertDeviceSetup } from "../POS/dialogs/legacy/legacyDialog_AlertDeviceSetup";
import { Loader } from "../../objects/loader";

export class Admin_Login {
    _locator: Locator;
    _page: Page;
    //** first Identify objects */
    public UserName: TextField;
    public Password: TextField;
    public LoginButton: Button;
    public Loader: Loader;

    constructor(page: Page) {
        this._page = page;
        this._locator = page.locator('#loginmodal');
        // Initialize all the objects
        this.UserName = new TextField(this._locator.locator('#loguser'));
        this.Password = new TextField(this._locator.locator('#logpass'));
        this.LoginButton = new Button(this._locator.getByRole('button', { name: 'Login' }));
        this.Loader = new Loader(page);
        this.LoginButton.SetAfterEvent(async () => {
            await this._page.waitForTimeout(500);
        });
    }

    /**
     * Wait for the login form to be visible
     * @returns true if the login form is visible, false if not
     */
    public async FormVisible(): Promise<boolean> {
        return await this._page.locator('#loginmodal').isVisible({timeout: 3000});
    }

    /**
     * Wait up to 25 seconds for the login form to be hidden
     * @returns true if the login form is not longer visible, false if not
     */
    public async FormNotVisible(): Promise<boolean> {
        const loginModal = this._page.locator('#loginmodal');
 
        try {
            await Promise.race([
                loginModal.waitFor({ state: 'hidden', timeout: 5000 }),
                loginModal.waitFor({ state: 'detached', timeout: 5000 }),
                this._page.waitForURL(
                    url => !url.href.includes('login'),
                    { timeout: 5000 }
                ),
            ]);
            return true;
        } catch {
            return false;
        }
    }

    public async LoadingBarVisible(): Promise<void> {
        try {
            // await this._page.locator('#loadingdiv[style*="display: block"]').waitFor({timeout: 5000})
            await this._page.getByText('Getting stored items...').waitFor({ timeout: 5000 });
            // await this._page.locator('#loadingprog[style*="60%"]').waitFor({timeout: 5000});
        } catch (e) { }
        try {
            await this._page.locator('#loadingprog[style*="80%"]').waitFor({ timeout: 5000 });
        } catch (e) { }

    }

    public async LoadingBarNotVisible(): Promise<void> {
        try {
            await this._page.locator('#loadingdiv[style*="display: none"]').waitFor({ timeout: 10000 })
        } catch (e) { }
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

        //Set the user and password and then  click on the login button
        await this.UserName.setText({ value: credentials?.user ?? Session.User });
        await this._page.waitForTimeout(500);
        await this.Password.setText({ value: credentials?.password ?? Session.Password });
        await this._page.waitForTimeout(500);

        await this.LoginButton.Click();
       
        //Verify the Login form is not longer visible
        expect(await this.FormNotVisible(), 'The login form is still visible').toBeTruthy();
    }
}