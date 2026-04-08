import { Page } from "playwright";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { TextField } from "../../../objects/textField";
import { Button } from "../../../objects/button";
import { Select } from "../../../objects/select";

export class Dialog_AddTaxItem extends Legacy_BaseDialog {

    public Name: TextField;
    public AltName: TextField
    public Type: Select<"Standard" | "VAT">;
    public Value: TextField;
    public Save: Button;
    public Cancel: Button;
    public Update: Button;

    constructor(page: Page, title?: string){
        super(page, title || "Add Tax Item");
        this.Name = new TextField(this._locator.locator('#taxitemname'));
        this.AltName = new TextField(this._locator.locator('#taxitemaltname'));
        this.Type = new Select<"Standard" | "VAT">(this._locator.locator('#taxitemtype'));
        this.Value = new TextField(this._locator.locator('#taxitemvalue'));
        this.Save = new Button(this._locator.getByRole('button', { name: 'Save' }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));
        this.Update = new Button(this._locator.getByRole('button', { name: 'Update' }));
    }
}