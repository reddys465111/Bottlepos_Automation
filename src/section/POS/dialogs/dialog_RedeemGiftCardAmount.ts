import { type Page } from "playwright";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";

export class Dialog_RedeemGiftCardAmount extends BaseDialog {

    public Amount:TextField
    public Yes: Button;
    public No: Button;

    constructor(page: Page){
        super(page, 'Gift Card Amount');
        this.Amount = new TextField(this._locator.locator('#amount'));
        this.Yes = new Button(this._locator.getByRole('button', { name: 'Yes' }));
        this.No = new Button(this._locator.getByRole('button', { name: 'No' }));
    }
}