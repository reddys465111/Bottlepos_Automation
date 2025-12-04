import { type Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../../objects/button";
import { TextField } from "../../../../objects/textField";

export class LegacyDialog_EnterPassword extends Legacy_BaseDialog {

    public Submit : Button;
    public Cancel : Button;
    public Password : TextField;

    constructor(page: Page){ 
        super(page, 'Enter Password');
        this.Submit = new Button(this._locator.getByRole('button', {name: "Submit"}));
        this.Cancel = new Button(this._locator.getByRole('button', {name: "Cancel"}));
        this.Password = new TextField(this._locator.locator('#passwordinput'));
    }
}