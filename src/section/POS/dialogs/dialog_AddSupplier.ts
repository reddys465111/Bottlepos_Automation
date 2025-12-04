import { Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { BaseDialog } from "../../../base/baseDialog";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Loader } from "../../../objects/loader";
import { Processing } from "../../../objects/processing";

export class dialog_AddSupplier extends Legacy_BaseDialog {
    public Name: TextField;
    public Email: TextField;
    public Phone: TextField;
    public Address: TextField;
    public AutoinvoiceName: TextField;
    public RepName: TextField;
    public RepPhone: TextField;
    public Notes:TextField;

    public Save: Button;
    public Cancel: Button;
    
    constructor(page: Page) {
        super(page, "Add Supplier");
        this.Name = new TextField(this._locator.locator("#newsuppliername"));
        this.Email = new TextField(this._locator.locator("#newsupplieremail"));
        this.Phone = new TextField(this._locator.locator("#newsupplierphone"));
        this.Address = new TextField(this._locator.locator("#newsupplieraddress"));
        this.AutoinvoiceName = new TextField(this._locator.locator("#newsupplierautoinvname"));
        this.RepName = new TextField(this._locator.locator("#newsupplierrepname"));
        this.RepPhone = new TextField(this._locator.locator("#newsupplierrepphone"));
        this.Notes = new TextField(this._locator.locator("#newsuppliernotes"));
        this.Save = new Button(this._locator.getByRole("button", {name: "Save"}));
        this.Cancel = new Button(this._locator.getByRole("button", {name: "Cancel"}));

        this.Save.SetAfterEvent(async () => {
            const loader = new Loader(page);
            const processing = new Processing(this._locator);
            await Promise.all([
                loader.waitForHidden(),
                processing.waitForHidden()
            ]);
        });
    }
}