import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { LabelField } from "../../../objects/labelField";

export class Dialog_GiftCardBalance extends BaseDialog {
    public OK: Button;
    public Message: LabelField;
    constructor(page: Page) {
        super(page, 'Gift Card Balance');
        this.OK = new Button(this._locator.getByRole('button', { name: "OK" }));
       this.Message = new LabelField(this._locator.getByTestId('Gift-Card-Balance-modal').locator('h5'));
        this.Message.SetBeforeEvent(async () => {
            await this._page.waitForTimeout(2000);
        });
    }
}