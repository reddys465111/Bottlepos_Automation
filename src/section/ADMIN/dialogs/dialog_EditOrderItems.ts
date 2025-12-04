import { Locator, Page } from "@playwright/test";
import { Table_OrderItems } from "../tables/table_OrderItems";
import { Dialog_EditItem } from "../../POS/dialogs/dialog_EditItem";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { ADMIN } from "../../ADMIN";
import { th } from "@faker-js/faker";


export class dialog_EditOrderItem extends Legacy_BaseDialog {
    public Supplier: Dropdown;
    public GenerateOrder: Button;
    public Total: TextField;
    public Margin: TextField;
    public Cases: TextField;
    public Product: TextField;
    public Date: Dropdown;
    public ViewBy: Button;
    public AddItem: Dialog_EditItem;
    public VendorItemNo: TextField;
    public Search: TextField;
    public SupplierOrderView: Checkbox;
    public Table: Table_OrderItems;
    public ExportAsFile: Button;
    public PrintBySupplier: Button;
    public PrintAll: Button;
    public Save: Button;
    public Cancel: Button;
    public Update:Button

    constructor(page: Page) {
        super(page, "Add Items in order");
        this.Supplier = new Dropdown(this._locator.locator("#neworderitemsupplier")); // Supplier dropdown
        this.GenerateOrder = new Button(this._locator.locator("#generate-records")); // Generate order button
        this.Total = new TextField(this._locator.locator("#neworderitemstotal")); // Total field
        this.Margin = new TextField(this._locator.locator("#neworderitemsmargin")); // Margin field
        this.Cases = new TextField(this._locator.locator("#neworderitemscases")); // Cases field
        this.Product = new TextField(this._locator.locator("#neworderitemproduct")); // Product search field
        this.Date = new Dropdown(this._locator.locator("#neworderitemdate")); // Date field
        this.ViewBy = new Button(this._locator.locator("#toggle-two")); // View by toggle (case/bottles)
        this.AddItem = new Dialog_EditItem(page); // Add Item
        this.VendorItemNo = new TextField(this._locator.locator("#neworderitemvendorproduct")); // Vendor item no field
        this.Search = new TextField(this._locator.locator("input[aria-controls='neworderitemtabledetail']"));
        this.SupplierOrderView = new Checkbox(this._locator.locator(".addordersupplierprint"));
        this.Table = new Table_OrderItems(this._locator.locator("#neworderitemtabledetail")); // Table for order items
        this.ExportAsFile = new Button(this._locator.locator("button[title='Export As File']"));
        this.PrintBySupplier = new Button(this._locator.locator("button[title='Print By Supplier']"));
        this.PrintAll = new Button(this._locator.locator("button[title='Print All']"));
        this.Save= new Button(this._locator.locator("button[title='Save']"));
        this.Update=new Button(this._locator.locator('button[title="Update"]'))
        this.Cancel = new Button(this._locator.locator("button[title='Cancel']"));
    }

    async getAllSuppliers(): Promise<string[]> {
        return await this.Supplier._locator.locator('option').allTextContents();
    }
  

   async editorderproductsuggestion(productNameOrBarcode: string): Promise<"new" | "duplicate"> {
    const productInput = this._page.locator('#newaddorderitemproduct');

    // Type product
    await productInput.click();
    await productInput.fill('');
    await productInput.type(productNameOrBarcode, { delay: 60 });
    await productInput.press('Enter');

    // Wait for suggestions to appear (if any)
    const suggestionList = this._page.locator('#suggestion-order-box-items ul.dropreceive li');

    if (await suggestionList.first().isVisible().catch(() => false)) {
        await this._page
            .locator(`#suggestion-order-box-items ul.dropreceive li:has-text("${productNameOrBarcode}")`)
            .first()
            .click();
    }

    // Wait for either Item Details Dialog or Duplicate Error Dialog
    for (let i = 0; i < 10; i++) {   // polls for 5 seconds total
        if (await ADMIN.Dialog.OrderItemDetails.IsVisible()) return "new";
        if (await ADMIN.Dialog.Error.IsVisible()) return "duplicate";
        await this._page.waitForTimeout(500);
    }

    throw new Error("Item Details or Duplicate dialog did not appear in time.");
}


 
}

