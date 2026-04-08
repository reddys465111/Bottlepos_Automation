import { type Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../../objects/button";
import { TextField } from "../../../../objects/textField";

export class LegacyDialog_VoidTransaction extends Legacy_BaseDialog {

    public Process : Button;
    public Cancel : Button;
    public ReasonInput : TextField;
    public Yes: Button;
    public No: Button;

    constructor(page: Page){ 
        super(page, page.locator('#transactionVoidModal'));

        //this.ReasonInput = new TextField(this._locator.getByTestId('void-reason-input'));
        this.ReasonInput = new TextField(this._locator.locator('textarea'));
        this.Process = new Button(this._locator.getByRole('button', {name: 'Process'}));
        this.Cancel = new Button(this._locator.getByRole('button', {name: 'Cancel'}));
        this.Yes = new Button(this._locator.getByRole('button', {name: 'Yes'}));
        this.No = new Button(this._locator.getByRole('button', {name: 'No'}));
    }
}