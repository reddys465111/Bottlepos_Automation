import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { Dialog_AddCustomerGroup } from "./dialog_AddCustomerGroup";
import { Table_Pagination } from "../tables/table_Pagination";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { table_ManageVendor } from "../tables/table_ExpenseManageVendor";


export class Dialog_ExpenseManageVendor extends Legacy_BaseDialog {
    public Add: Button;
    public ShowEntries: Dropdown;
    public Search: TextField;
    public Table_ExpenseVendor:table_ManageVendor;
    

    constructor(page: Page) {
        super(page, "Manage Vendor");
        this.Add = new Button(this._locator.getByRole('button', { name: 'Add' }));
        this.ShowEntries = new Dropdown(this._locator.locator('#managevendortable_length select[name="managevendortable_length"]'));
        this.Search = new TextField(this._locator.locator('#managevendortable_filter input[type="search"]'));
        this.Table_ExpenseVendor = new table_ManageVendor(this._locator.locator('#managevendortable'), page);
    }
}