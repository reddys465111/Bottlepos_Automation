import { Locator, Page } from "playwright";
import { TaxRules } from "./taxRules";
import { TaxItems } from "./taxItems";
import { BottleDeposit } from "./bottleDeposit";
import { AdditionalFees } from "./additionalFees";
import { Button } from "../../../../objects/button";
import { DuelPicing } from "./duelpricing";
 
export class AccountingSettings {
 
    private _page: Page;
    private _locator: Locator;
    public TaxRules: TaxRules;
    public TaxItems: TaxItems;
    public AdditionalFees: AdditionalFees;
    public BottleDeposit: BottleDeposit;
    public Save: Button;
    public DuelPricing: DuelPicing;
    
    constructor(page: Page){
        this._page = page;
        this._locator = this._page.locator('#maincontent');
        this.DuelPricing =new DuelPicing(this._locator);
        this.TaxRules = new TaxRules(this._locator);
        this.TaxItems = new TaxItems(this._locator);
        this.AdditionalFees = new AdditionalFees(this._locator);
        this.BottleDeposit = new BottleDeposit(this._locator);
        this.Save = new Button(this._locator.locator('button:has-text("Save")'));
    }
}
