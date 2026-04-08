import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { NumberField } from "../../../objects/numberField";
import { TextField } from "../../../objects/textField";
import { type Page } from "@playwright/test";
import { DiscountToggle } from "../../../objects/specialObjects/discountToggle";

export class Dialog_Discount extends BaseDialog {

    public Discount : NumberField;
    public Authorize : Button;
    public Cancel : Button;
    public Password : TextField;
    public AddDiscount: Button;
    public DiscountToggle: DiscountToggle;
    constructor(page: Page) { 
        super(page, 'Apply Discount');
        this.Password = new TextField(this._locator.locator('input[name="password"]'));
        this.Discount = new NumberField(this._locator.locator('input[name="discount"]'));
        this.Authorize = new Button(this._locator.getByRole('button', { name: 'Authorize' }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));

        this.AddDiscount = new Button(this._locator.getByRole('button', {name: 'Add Discount'}));
        this.DiscountToggle = new DiscountToggle(this._page, this._locator.getByTestId('discount-toggle'));
    }
}