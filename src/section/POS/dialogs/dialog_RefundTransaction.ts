import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { TextField } from "../../../objects/textField";

export class Dialog_RefundTransaction extends BaseDialog {

    public Cash : Button;
    public Card : Button;
    public Total: TextField;

    constructor(page: Page) { 
        super(page, 'Refund Transaction');
        this.Cash = new Button(this._locator.getByRole('button', {name: 'Cash'}));
        this.Card = new Button(this._locator.getByRole('button', {name: 'Card'}));
        this.Total = new TextField(this._locator.getByTestId('transaction-total'))

    }
}
