import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { TextField } from "../../../objects/textField";

export class Dialog_CheckGiftCardBalance extends BaseDialog {
    public GiftCardCode: TextField;
    public CheckBalance: Button;
    public Cancel: Button;


    constructor(page: Page) {
        super(page, 'Check Gift Card Balance');
        this.GiftCardCode = new TextField(this._locator.getByRole('textbox', { name: 'Gift Card Code:' }));
        this.CheckBalance = new Button(this._locator.getByRole('button', { name: "Check Balance" }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: "Cancel" }));
        this.CheckBalance.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2500);
        });
    }
}