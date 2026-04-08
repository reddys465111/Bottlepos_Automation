import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Table_ManageExpensecaetgory } from "../tables/table_ExpenseManageCategory";


export class Dialog_ExpenseManageCategory extends Legacy_BaseDialog {
    public Add: Button;
    public ShowEntries: Dropdown;
    public Search: TextField;
    public ExpenseManageCategoryTable: Table_ManageExpensecaetgory;
    public close:Button
    

    constructor(page: Page) {
        super(page, "Manage Category");
        this.Add = new Button(this._locator.locator('#managecategorydialog button[onclick="addExpenseCategory();"]'));
        this.ShowEntries = new Dropdown(this._locator.locator('#managecategorytable_length select'));
        this.Search = new TextField(this._locator.locator('#managecategorytable_filter input[type="search"]'));
        this.ExpenseManageCategoryTable = new Table_ManageExpensecaetgory(this._locator.locator('#managecategorytable'), page);
        this.close = new Button(this._locator.locator('.ui-dialog-buttonpane button[title="Close"]'));



    }
}