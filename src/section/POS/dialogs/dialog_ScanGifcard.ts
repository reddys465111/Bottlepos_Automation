import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";

export class Dialog_ScanGiftCard extends BaseDialog {
    public GiftCardCode: TextField;
    public Save: Button;
    constructor(page: Page) {
        super(page, 'Scan Gift Card');
        this.GiftCardCode = new TextField(this._locator.getByRole('textbox', { name: 'Gift Card Code:' }));
        this.Save = new Button(this._locator.getByRole('button', { name: "Save" }));
        this.Save.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2500);
        });
    }
}