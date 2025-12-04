import { type Locator, type Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../../objects/button";
import { Checkbox } from "../../../../objects/checkbox";
import { TextField } from "../../../../objects/textField";


export class LegacyDialog_AddCustomer extends Legacy_BaseDialog {
    public Name: TextField;
    public Mobile: TextField;
    public DOB: TextField;
    public Email: TextField;
    public Address: TextField;
    public Zipcode: TextField;
    public Points: TextField;
    public SMSPromotionOptIn: Checkbox;
    public HouseAccountEligible: Checkbox;
    public MaxBalanceLimit: TextField;
    public SaveButton: Button;
    public CancelButton: Button;
    public CloseButton: Button;

    constructor(page: Page) {
        super(page, "Add Customer");

        this.Name = new TextField(this._locator.locator('#newcustname'));
        this.Mobile = new TextField(this._locator.locator('#newcustmobile'));
        this.DOB = new TextField(this._locator.locator('#newcustdob'));
        this.Email = new TextField(this._locator.locator('#newcustemail'));
        this.Address = new TextField(this._locator.locator('#newcustaddress'));
        this.Zipcode = new TextField(this._locator.locator('#newcustpostcode'));
        this.Points = new TextField(this._locator.locator('#newcustpoints'));
        this.SMSPromotionOptIn = new Checkbox(this._locator.locator('#newcustpromotionoptin'));
        this.HouseAccountEligible = new Checkbox(this._locator.locator('#newcusthouseeligible'));
        this.MaxBalanceLimit = new TextField(this._locator.locator('#newcustmaxlimit'));
        this.SaveButton = new Button(this._locator.locator('button[title="Save"]'));
        this.CancelButton = new Button(this._locator.locator('button[title="Cancel"]'));
        this.CloseButton = new Button(this._locator.locator('button[title="Close"]'));
    }
}
