import { Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";

export class Dialog_EditSupplier extends Legacy_BaseDialog {
    public Name: TextField;
    public Email: TextField;
    public Phone: TextField;
    public Address: TextField;
    public AutoinvoiceName: TextField;
    public RepName: TextField;
    public RepPhone: TextField;
    public Notes:TextField;

    public Update: Button;
    public Cancel: Button;
    
    constructor(page: Page) {
        super(page, "Edit Supplier");
        this.Name = new TextField(this._locator.locator("#suppliername"));
        this.Email = new TextField(this._locator.locator("#supplieremail"));
        this.Phone = new TextField(this._locator.locator("#supplierphone"));
        this.Address = new TextField(this._locator.locator("#supplieraddress"));
        this.AutoinvoiceName = new TextField(this._locator.locator("#supplierautoinvname"));
        this.RepName = new TextField(this._locator.locator("#supplierrepname"));
        this.RepPhone = new TextField(this._locator.locator("#supplierrepphone"));
        this.Notes = new TextField(this._locator.locator("#suppliernotes"));
        this.Update = new Button(this._locator.getByRole("button", {name: "Update"}));
        this.Cancel = new Button(this._locator.getByRole("button", {name: "Cancel"}));
    }
}