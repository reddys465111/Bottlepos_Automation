
import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";

export class LegacyDialog_Alert extends Legacy_BaseDialog {

    public Ok : Button;
    constructor(page: Page){ 
        super(page);
        this._locator = this._page.locator('//*[@role="dialog"][.//*[text()="Alert!"]]');
        this.Ok = new Button(this._locator.locator('button[title=Ok]'));
    }

    /**
     * Dismisses the current dialog or element by clicking the OK button
     */
    public async Dismiss(): Promise<void> {
        await this.Ok.Click();
    }
}