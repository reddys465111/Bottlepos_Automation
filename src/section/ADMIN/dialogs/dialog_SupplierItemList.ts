import { Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { table_SupplierItemList } from "../tables/table_SupplierItemList";

export class Dialog_SupplierItemList extends Legacy_BaseDialog {
    public search: TextField;
    public Close: Button;
    public supplierItemTable: table_SupplierItemList;
    
    constructor(page: Page) {
        super(page, "Items List");
        this.search = new TextField(this._locator.getByRole('searchbox', { name: 'Search:' }));
        this.Close = new Button(this._locator.getByRole("button", {name: "Close"}));
        this.supplierItemTable = new table_SupplierItemList(this._locator.locator("table#itemstablesupp"));
       
    }
}