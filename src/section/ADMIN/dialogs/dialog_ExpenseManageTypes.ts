import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Table_ManageExpenseTypes } from "../tables/table_ExpenseManageTypes";

export class Dialog_ExpenseManageTypes extends Legacy_BaseDialog {
    public Add: Button;
    public ShowEntries: Dropdown;
    public Search: TextField;
    public ManageExpenseTypesTable: Table_ManageExpenseTypes;
    public close:Button
    

    constructor(page: Page) {
        super(page, "Manage Expense types");
        this.Add = new Button(this._locator.locator('#manageexpensetypedialog button[onclick="addExpenseType();"]'));
        this.ShowEntries = new Dropdown(this._locator.locator('#manageexpensetypetable_length select'));
        this.Search = new TextField(this._locator.locator('#manageexpensetypetable_filter input[type="search"]').first());
        this.ManageExpenseTypesTable = new Table_ManageExpenseTypes(this._locator.locator('#manageexpensetypetable'), page);
        this.close = new Button(this._locator.locator('.ui-dialog-buttonpane .ui-dialog-buttonset button[title="Close"]'));
        



    }
}