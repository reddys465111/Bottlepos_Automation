import { type Page, type Locator } from "@playwright/test";
import { Timeouts } from "../../utils";

/**
 * Base class to share the common methods accross all the dialogs 
 */
export class Legacy_BaseDialog{
    _locator: Locator;
    _page: Page;
    _dialogTitle: string|undefined;
    
    constructor(page: Page, title: string|Locator|undefined = undefined){
        this._page = page;
        if(title) {
            if(typeof title === 'string') {
                this._dialogTitle = title;
                this._locator = this._page.getByLabel(title);
            } else {
                this._dialogTitle = undefined;
                this._locator = title;
            }
        } else {
            this._locator = this._page.locator('[role="dialog"]').filter({ has: this._page.locator(':visible') });
        }
    }
     /**
     * Ask if the given dialog is visible
     * @returns true if the alert dialog is visible
     */
     public async IsVisible(): Promise<boolean>{
        return await this._locator.isVisible({timeout: 12000});
    }

    public async IsNotVisible(): Promise<boolean> {
        return await this._locator.isHidden({timeout: 12000});
    }
    public async GetMessage(): Promise<string> {
        return await this._locator.locator('.empty-price-text').innerText();
    }

    public async GetModalContent(): Promise<string> {
        return await this._locator.locator('.ui-dialog-content').textContent() ?? '';
    }
}