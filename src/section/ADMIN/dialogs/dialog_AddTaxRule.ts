import { Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { Checkbox } from "../../../objects/checkbox";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { BaseTaxes_Table } from "./dialog_Components/baseTaxes_table";
import { Select } from "../../../objects/select";
import { BaseTaxes_Location } from "./dialog_Components/baseTaxes_location";

export class Dialog_AddTaxRule extends Legacy_BaseDialog {

    public Name: TextField;
    public Inclusive: Checkbox;
    public MultiMode: Select<"Single" | "Multiple">;
    public POSTaxButton: Select<"Select" | "Button 1" | "Button 2" | "Button 3">;
    public AddBaseTax: Button;
    public AddRule: Button;
    // public LocationsTable: Locations_Table;
    public BaseTaxesTable: BaseTaxes_Table;
    public LocationsTable: BaseTaxes_Location;
    public Save: Button;
    public Update: Button;
    public Cancel: Button;

    constructor(page: Page, title?: string){
        super(page, title || "Add Tax Rule");
        this.Name = new TextField(this._locator.locator("#taxrulename"));
        this.Inclusive = new Checkbox(this._locator.locator("#taxruleinc"));
        this.MultiMode = new Select<"Single" | "Multiple">(this._locator.locator("#taxrulemode"));
        this.POSTaxButton = new Select<"Select" | "Button 1" | "Button 2" | "Button 3">(this._locator.locator("#taxruleposbuttons"));

        this.BaseTaxesTable = new BaseTaxes_Table(this._locator.locator("#taxrulebasetable"));
        this.AddBaseTax = new Button(this._locator.getByRole("button", {name: "Add Base Tax"}));
        
        this.LocationsTable = new BaseTaxes_Location(this._locator.locator("#taxrulelocalstable"));
        this.AddRule = new Button(this._locator.getByRole("button", {name: "Add Rule"}));

        this.Save = new Button(this._locator.getByRole("button", {name: "Save"}));
        this.Cancel = new Button(this._locator.getByRole("button", {name: "Cancel"}));
        this.Update = new Button(this._locator.getByRole("button", {name: "Update"}));
    }
}
