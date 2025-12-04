import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { TextField } from "../../../objects/textField";

export class Dialog_VoidTransaction extends BaseDialog {

    public Process : Button;
    public Cancel : Button;
    public ReasonInput : TextField;
    public Yes: Button;
    public No: Button;

    constructor(page: Page){ 
        super(page, 'Void Transaction');

        this.ReasonInput = new TextField(this._locator.getByTestId('reason-input'));
        this.Process = new Button(this._locator.getByRole('button', {name: 'Process'}));
        this.Cancel = new Button(this._locator.getByRole('button', {name: 'Cancel'}));
        this.Yes = new Button(this._locator.getByRole('button', {name: 'Yes'}));
        this.No = new Button(this._locator.getByRole('button', {name: 'No'}));

    }
}