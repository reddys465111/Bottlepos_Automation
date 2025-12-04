import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { TextField } from "../../../objects/textField";
import { Dropdown } from "../../../objects/dropdown";
import { Checkbox } from "../../../objects/checkbox";
import { Button } from "../../../objects/button";
import { Page } from "playwright";
import { Select } from "../../../objects/select";

export class Dialog_AddAdditionalFees extends Legacy_BaseDialog {
    public Name: TextField;
    public Type: Select<"Percentage" | "Amount">;
    public Value: TextField;
    public Taxable: Checkbox;
    public Save: Button;
    public Update: Button;
    public Cancel: Button;

    constructor(page: Page, title?: string) {
        super(page, title || "Add Additional Fee");
        
        this.Name = new TextField(this._locator.locator("#addnlchargesname"));
        this.Type = new Select<"Percentage" | "Amount">(this._locator.locator("#addnlchargestype"));
        this.Value = new TextField(this._locator.locator("#addnlchargesamount"));
        this.Taxable = new Checkbox(this._locator.locator("#enabletaxableadditional"));

        this.Save = new Button(this._locator.getByRole("button", {name: "Save"}));
        this.Update = new Button(this._locator.getByRole("button", {name: "Update"}));
        this.Cancel = new Button(this._locator.getByRole("button", {name: "Cancel"}));
    }
}