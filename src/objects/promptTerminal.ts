import { Locator, Page } from "@playwright/test";
import { BaseDialog } from "../base/baseDialog";

export class PromptTerminal extends BaseDialog {
    //private _locator: Locator;
    constructor(page: Page) {
        //this._locator = page.locator('[title="Follow Prompts on Terminal"]');
        super(page, 'Follow Prompts On Terminal');
    }

    public async isVisible(): Promise<boolean> {
        return await this._locator.isVisible();
    }

    public async waitForHidden(): Promise<void> {
        await this._locator.waitFor({state: 'hidden'});
    }

    public async waitForVisible(): Promise<void> {
        await this._locator.waitFor({state: 'visible'});
    }

}