import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { Checkbox } from "../../../objects/checkbox";
import { TextField } from "../../../objects/textField";

export class Dialog_CustomerDetails extends BaseDialog {

    public Name: TextField;
    public Mobile: TextField;
    public Email: TextField;
    public DOB: TextField;
    public Address: TextField;
    public Zipcode: TextField;
    public Sms_Email_Promotion: Checkbox;
    public Save : Button;
    public Cancel:Button;

    constructor(page: Page) { 
        super(page, 'Customer Details');
        this.Name = new TextField(this._locator.locator('input[name="name"]'));
        this.Mobile = new TextField(this._locator.locator('input[name="mobile"]'));
        this.Email = new TextField(this._locator.locator('input[name="email"]'));
        this.DOB = new TextField(this._locator.locator('input[name="dateOfBirth"]'));
        this.Address = new TextField(this._locator.locator('input[name="address"]'));
        this.Zipcode = new TextField(this._locator.locator('input[name="zipcode"]'));
        this.Sms_Email_Promotion = new Checkbox(this._locator.locator('input[name="promotions"]'));
        this.Save = new Button(this._locator.getByRole('button', { name: 'Save' }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));
    }
}