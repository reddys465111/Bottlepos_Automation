import{ test } from "@playwright/test";
import { Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { TextField } from "../../../../objects/textField";
import { Table_Expense } from "../../tables/table_Expense";

export class Expense {
    private _page: Page;    
    // Main page elements
    public ManageExpensesTypes: Button;
    public ManageVendor: Button;
    public ManageCategory: Button;
    public Add:Button;
    public Search: TextField;
    public ExpenseTable:Table_Expense

    constructor(page: Page) {
        this._page = page;
        const locator = this._page.locator("#maincontent");
        this.ManageExpensesTypes = new Button(locator.getByRole('button', { name: 'Manage Expense Types' }));
        this.ManageVendor = new Button(locator.getByRole('button', { name: 'Manage Vendor' }));
        this.ManageCategory = new Button(locator.getByRole('button', { name: 'Manage Category' }));
        this.Add = new Button(locator.getByRole('button', { name: 'Add' }));
        this.Search = new TextField(this._page.locator('input[aria-controls="closingtable"]'));
        this.ExpenseTable = new Table_Expense(this._page.locator('.dataTables_scrollBody table#closingtable'));
       
   
    }
    
}
