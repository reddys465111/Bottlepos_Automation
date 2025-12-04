import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";

export class Dialog_Customerinfo extends BaseDialog {

    public Name: LabelField;
    public Mobile: LabelField;
    public Email: LabelField;
    public DOB: LabelField;
    public Address: LabelField;
    public Zipcode: LabelField;
    public Sms_Email_Promotion: LabelField;
    public Points: LabelField;
    public Redeem: Button;
    public Ok : Button;
    public Edit:Button;
    public Notes: TextField;

    constructor(page: Page) {
        // super(page, 'Customer Info');
        super(page, '');
        this.Name = new LabelField(this._locator.getByTestId('customer-name'));
        this.Email = new LabelField(this._locator.getByTestId('customer-email'));
        this.Mobile = new LabelField(this._locator.getByTestId('customer-mobile'));
        this.DOB = new LabelField(this._locator.getByTestId('customer-dob'));
        this.Address = new LabelField(this._locator.getByTestId('customer-address'));
        this.Zipcode = new LabelField(this._locator.getByTestId('customer-zipcode'));
        this.Sms_Email_Promotion = new LabelField(this._locator.getByTestId('customer-promotions'));
        this.Notes = new TextField(this._locator.getByTestId('customer-notes'));
        this.Points = new LabelField(this._locator.getByTestId('customer-points'));
        this.Redeem = new Button(this._locator.getByRole('button', { name: 'Redeem' }));
        this.Ok = new Button(this._locator.getByRole('button', { name: 'Ok' }));
        this.Edit = new Button(this._locator.getByRole('button', { name: 'Edit' }));
    }
}