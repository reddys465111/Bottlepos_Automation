import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Loader } from "../../../objects/loader";

export class Dialog_EditCustomer extends Legacy_BaseDialog {
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
    public Update: Button;
    public Cancel: Button;
    public Close: Button;
    private _loader: Loader;

    constructor(page: Page) {
        super(page, "Edit Customer");

        this.Name = new TextField(this._locator.locator('#custname'));
        this.Mobile = new TextField(this._locator.locator('#custmobile'));
        this.DOB = new TextField(this._locator.locator('#custdob'));
        this.Email = new TextField(this._locator.locator('#custemail'));
        this.Address = new TextField(this._locator.locator('#custaddress'));
        this.Zipcode = new TextField(this._locator.locator('#custpostcode'));
        this.Points = new TextField(this._locator.locator('#custpoints'));
        this.SMSPromotionOptIn = new Checkbox(this._locator.locator('#custpromotionoptin'));
        this.HouseAccountEligible = new Checkbox(this._locator.locator('#custhouseeligible'));
        this.MaxBalanceLimit = new TextField(this._locator.locator('#custmaxlimit'));
        this.Update = new Button(this._locator.locator('button[title="Update"]'));
        this.Cancel = new Button(this._locator.locator('button[title="Cancel"]'));
        this.Close = new Button(this._locator.locator('button[title="Close"]'));
        this._loader = new Loader(this._page);
        
        this.Update.SetAfterEvent(async () => {
            await this._loader.waitForHidden();
        });
    }
}
