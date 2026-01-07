import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { Dropdown } from "../../../objects/dropdown";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";

export class Dialog_AddExpense extends Legacy_BaseDialog {

    // Hidden
    public ExpenseId: Locator;

    // Fields
    public ExpenseDate: TextField;
    public Category: Dropdown;
    public PaymentMode: Dropdown;
    public CheckNumber: TextField;
    public Amount: TextField;
    public Type: Dropdown;
    public Vendor: Dropdown;
    public Invoice: TextField;
    public Memo: TextField;

    // Plus buttons
    public AddCategory: Button;
    public AddType: Button;
    public AddVendor: Button;

    // Footer buttons
    public Save: Button;
    public Cancel: Button;
    public Close: Button;

    constructor(page: Page) {
        super(page, "Add Expense");

        // Hidden field
        this.ExpenseId = this._locator.locator('#expid');

        // Inputs
        this.ExpenseDate = new TextField(this._locator.locator('#expdate'));
        this.Amount = new TextField(this._locator.locator('#expamount'));
        this.CheckNumber = new TextField(this._locator.locator('#expchecknumber'));
        this.Invoice = new TextField(this._locator.locator('#expinvoice'));
        this.Memo = new TextField(this._locator.locator('#expmemo'));

        // Dropdowns
        this.Category = new Dropdown(this._locator.locator('#expcategory'));
        this.PaymentMode = new Dropdown(this._locator.locator('#exppayment'));
        this.Type = new Dropdown(this._locator.locator('#exptype'));
        this.Vendor = new Dropdown(this._locator.locator('#expvendor'));

        // Plus icons
        this.AddCategory = new Button(
            this._locator.locator('span[onclick="addExpenseCategory();"]')
        );

        this.AddType = new Button(
            this._locator.locator('span[onclick="addExpenseType();"]')
        );

        this.AddVendor = new Button(
            this._locator.locator('span[onclick="addExpenseVendor();"]')
        );

        // Footer buttons
        this.Save = new Button(
            this._locator.getByRole('button', { name: 'Save' })
        );

        this.Cancel = new Button(
            this._locator.getByRole('button', { name: 'Cancel' })
        );

        //  Titlebar close (X)
        this.Close = new Button(
            this._locator.locator('.ui-dialog-titlebar-close')
        );
    }
}
