import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";


export class Dialog_EditExpenseCategory extends Legacy_BaseDialog {
    public Name: TextField;
    public Update: Button;
    public Cancel: Button;
   

    constructor(page: Page) {
        super(page, "Edit Category");
        this.Name = new TextField(this._locator.locator('#categoryname'));
        this.Update = new Button(this._locator.getByRole('button', { name: 'Update' }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));
    }
}