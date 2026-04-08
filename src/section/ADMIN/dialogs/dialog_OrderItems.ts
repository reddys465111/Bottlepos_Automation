import { Locator, Page } from "@playwright/test";
import { Table_OrderItems } from "../tables/table_OrderItems";
import { Dialog_EditItem } from "../../POS/dialogs/dialog_EditItem";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { ADMIN } from "../../ADMIN";


export class Dialog_OrderItems extends Legacy_BaseDialog {
    public Supplier: Dropdown;
    public GenerateOrder: Button;
    public Total: TextField;
    public Margin: TextField;
    public Cases: TextField;
    public Product: TextField;
    public Date: Dropdown;
    public ViewBycase:Button;
    public ViewByBottle:Button;
    public AddItem: Button;
    public VendorItemNo: TextField;
    public Search: TextField;
    public AdvanceSearch: Button
    public SupplierOrderView: Checkbox;
    public Table: Table_OrderItems;
    public ExportAsFile: Button;
    public PrintBySupplier: Button;
    public PrintAll: Button;
    public Save: Button;
    public Cancel: Button;

    constructor(page: Page) {
        super(page, "Order Items");
        this.Supplier = new Dropdown(this._locator.locator("#neworderitemsupplier")); // Supplier dropdown
        this.GenerateOrder = new Button(this._locator.locator("#generate-records")); // Generate order button
        this.Total = new TextField(this._locator.locator("#neworderitemstotal")); // Total field
        this.Margin = new TextField(this._locator.locator("#neworderitemsmargin")); // Margin field
        this.Cases = new TextField(this._locator.locator("#neworderitemscases")); // Cases field
        this.Product = new TextField(this._locator.locator("#neworderitemproduct")); // Product search field
        this.Date = new Dropdown(this._locator.locator("#neworderitemdate")); // Date field
        this.ViewBycase = new Button(this._locator.locator(".toggle-on")); // View by toggle (case)
        this.ViewByBottle = new Button(this._locator.locator(".toggle-off")); // View by toggle (case)
        this.AddItem = new Button(this._locator.locator('button[onclick="resetAddItemDialog();addNewItemDialog();"]'));
        this.VendorItemNo = new TextField(this._locator.locator("#neworderitemvendorproduct")); // Vendor item no field
        this.Search = new TextField(this._locator.locator("input[aria-controls='neworderitemtabledetail']"));
        this.SupplierOrderView = new Checkbox(this._locator.locator(".addordersupplierprint"));
        this.Table = new Table_OrderItems(this._locator.locator("#neworderitemtabledetail").last());

        this.ExportAsFile = new Button(this._locator.locator("button[title='Export As File']"));
        this.PrintBySupplier = new Button(this._locator.locator("button[title='Print By Supplier']"));
        this.PrintAll = new Button(this._locator.locator("button[title='Print All']"));
        this.Save = new Button(this._locator.locator("button[title='Save']"));
        this.Cancel = new Button(this._locator.locator("button[title='Cancel']"));
        this.AdvanceSearch = new Button(this._locator.locator("button[title='Advance Search']"));
    }

    async getAllSuppliers(): Promise<string[]> {
        return await this.Supplier._locator.locator('option').allTextContents();
    }


    async orderproductsuggestion(productNameOrBarcode: string): Promise<"new" | "duplicate"> {
        const productInput = this._page.locator('#neworderitemproduct');
        await productInput.click();
        await productInput.fill('');
        await productInput.type(productNameOrBarcode, { delay: 80 });
        await productInput.press('Enter');

        await this._page.waitForTimeout(500);

        const suggestionItems = this._page.locator('#suggestion-order-box ul.dropreceive li');

        if (await suggestionItems.first().isVisible().catch(() => false)) {
            await this._page
                .locator(`#suggestion-order-box ul.dropreceive li:has-text("${productNameOrBarcode}")`)
                .first()
                .click();
        }

        // Poll every 500ms for up to 5s
        for (let i = 0; i < 10; i++) {
            if (await ADMIN.Dialog.OrderItemDetails.IsVisible()) return "new";
            if (await ADMIN.Dialog.Error.IsVisible()) return "duplicate";
            await this._page.waitForTimeout(500);
        }

        throw new Error("Neither item details nor error dialog appeared within expected time.");
    }
    async VendorItemnoSuggestion(itemNo: string): Promise<"new" | "duplicate"> {
        const input = this._page.locator('#neworderitemvendorproduct');
        await input.click();
        await input.fill('');
        await input.type(itemNo, { delay: 80 });
        await input.press('Enter');
        await this._page.waitForTimeout(500);

        const list = this._page.locator('#suggestionvendor-order-box ul.dropreceive li');
        if (await list.first().isVisible().catch(() => false)) {
            const item = this._page.locator(`#suggestionvendor-order-box ul.dropreceive li:has-text("${itemNo}")`).first();
            await (await item.isVisible().catch(() => false) ? item : list.first()).click();
           
        }

        for (let i = 0; i < 10; i++) {
            if (await ADMIN.Dialog.OrderItemDetails.IsVisible()) return "new";
            if (await ADMIN.Dialog.Error.IsVisible()) return "duplicate";
            await this._page.waitForTimeout(500);
        }
        throw new Error("Timeout: No result dialog.");
    }



}

