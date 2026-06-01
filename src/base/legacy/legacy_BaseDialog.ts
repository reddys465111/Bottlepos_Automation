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
        try {
            if (this._page?.isClosed && this._page.isClosed()) return false;
            return await this._locator.isVisible({timeout: 8000});
        } catch (e: any) {
            if (e && typeof e.message === 'string' && e.message.includes('Target page, context or browser has been closed')) {
                return false;
            }
            throw e;
        }
    }

    public async IsNotVisible(): Promise<boolean> {
        try {
            if (this._page?.isClosed && this._page.isClosed()) return true;
            return await this._locator.isHidden({timeout: 8000});
        } catch (e: any) {
            if (e && typeof e.message === 'string' && e.message.includes('Target page, context or browser has been closed')) {
                return true;
            }
            throw e;
        }
    }
    public async GetMessage(): Promise<string> {
        return await this._locator.locator('.empty-price-text').innerText();
    }

    public async GetModalContent(): Promise<string> {
        return await this._locator.locator('.ui-dialog-content').textContent() ?? '';
    }
    public async WaitForVisible(options?: { timeout?: number }): Promise<void> {
        await this._locator.waitFor({state: 'visible', timeout: options?.timeout ?? 12000});
    }
    public async WaitForHidden(): Promise<void> {
        await this._locator.waitFor({state: 'hidden'});
    }
}