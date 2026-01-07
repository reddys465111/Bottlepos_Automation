import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";


export class dialog_AddExpenseCategory extends Legacy_BaseDialog {
    public Name: TextField;
    public Save: Button;
    public Cancel: Button;
   

    constructor(page: Page) {
        super(page, "Add Category");
        this.Name = new TextField(this._locator.locator('#categoryname'));
        this.Save = new Button(this._locator.getByRole('button', { name: 'Save' }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));
    }
}