import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { TextField } from "../../../objects/textField";

export class Dialog_TransactionCancelled extends BaseDialog {

    public Yes: Button;
    public No: Button;

    constructor(page: Page){ 
        super(page, 'Transaction Cancelled');

        this.Yes = new Button(this._locator.getByRole('button', {name: 'Yes'}));
        this.No = new Button(this._locator.getByRole('button', {name: 'No'}));
    }
}