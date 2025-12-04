import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { DiscountToggle } from "../../../objects/specialObjects/discountToggle";
import { NumberField } from "../../../objects/numberField";

export class Dialog_Authorization extends BaseDialog {

    public AddDiscount : Button;
    public Cancel: Button;
    public StaffName: Dropdown;
    public Password: TextField;
    public Discount: NumberField;
    public DiscountToggle: DiscountToggle
    
    constructor(page: Page){ 
        super(page, 'Authorization');
        this.AddDiscount = new Button(this._locator.getByRole('button', {name: 'Add Discount'}));
        this.Cancel = new Button(this._locator.getByRole('button', {name: 'Cancel'}));

        this.StaffName = new Dropdown(this._locator.locator('[role=combobox]'));
        this.Password = new TextField(this._locator.locator('[name="password"]'));
        this.Discount = new NumberField(this._locator.locator('[name="discount"]'));
        this.DiscountToggle = new DiscountToggle(this._page, this._locator.getByTestId('discount-toggle'));

    }
}