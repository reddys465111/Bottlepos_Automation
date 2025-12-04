import { type Page, type Locator } from "@playwright/test";

/**
 * Base class to share the common methods accross all the dialogs 
 */
export class BaseDialog{
    _locator: Locator;
    _page: Page;
    _dialogTitle: string;
    
    constructor(page: Page,  title: string){
        this._page = page;
        this._dialogTitle = title;
        if (title) {
            this._locator = page.getByTestId(`${title.replaceAll(' ', '-')}-modal`);
        } else {
            this._locator = page.getByTestId(/.*-modal$/);
        }
    }
     /**
     * Ask if the given dialog is visible
     * @returns true if the alert dialog is visible
     */
     public async IsVisible(): Promise<boolean>{
        return await this._locator.isVisible();

    }

    /**
     * Ask if the given dialog is not visible
     * @returns true if the alert dialog is not visible
     */
    public async IsNotVisible(): Promise<boolean> {
        return await this._locator.isHidden();
    }
    
    /**
     * Get the message of the dialog
     * @returns the message of the dialog
     */
    public async GetMessage(): Promise<string> {
        return await this._locator.getByTestId('simple-message-modal-message').innerText();
    }

    /**
     * Close the dialog by pressing the Escape key
     * @returns void
     */
    public async Close(): Promise<void> {
        await this._locator.locator('header button').click();
        // await this._page.keyboard.press('Escape');
    }

    /**
     * Wait for the dialog to be visible
     * @returns void
     */
    public async WaitForVisible(): Promise<void> {
        await this._locator.waitFor({ state: 'visible' });
    }
    
    /**
     * Wait for the dialog to be hidden
     * @returns void
     */
    public async WaitForHidden(): Promise<void> {
        await this._locator.waitFor({ state: 'hidden' });
    }
}