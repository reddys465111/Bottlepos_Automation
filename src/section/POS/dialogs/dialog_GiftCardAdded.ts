import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { LabelField } from "../../../objects/labelField";

export class Dialog_GiftCardAdded extends BaseDialog {
    public OK: Button;
    public Message: LabelField;
    constructor(page: Page) {
        super(page, 'Gift Card Added');
        this.OK = new Button(this._locator.getByRole('button', { name: "OK" }));
        this.Message = new LabelField(this._locator.getByTestId('simple-message-modal-message'));
        this.OK.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2500);
        });
    }
}