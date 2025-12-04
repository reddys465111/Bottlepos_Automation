import { Locator } from "@playwright/test";
import { Dropdown } from "../../../../objects/dropdown";
import { Checkbox } from "../../../../objects/checkbox";
import { TextField } from "../../../../objects/textField";
import { Button } from "../../../../objects/button";
 
export class DuelPicing{
 
    private _locator: Locator;
    public Type: Dropdown;
    public EBT: Checkbox;
    public Debit: Checkbox;
    public GiftCard: Checkbox;
    public SideCard: Checkbox;
    public Percentage: TextField;
    public NcaPercentage:TextField;
    public Minimum: TextField;
    public Label: TextField;
    public CustomerScreenText: TextField;
    public ShowCashTotalasGrandTotalOnCustomerScreen: Checkbox;
    public ShowCashAndNonCashOnPayButton: Checkbox;
    public ShowExcludeNonCashButton: Checkbox;
    public ShowCashRegularPriceOnPayButton: Checkbox;
    public Roundto9thcent: Checkbox;
    public Save: Button;
 
    constructor(locator: Locator) {
        this._locator = locator;
        this.Type = new Dropdown(this._locator.locator('#noncash_dual'));
        this.EBT = new Checkbox(this._locator.locator('#checknoncashadjustmentebt'));
        this.Debit = new Checkbox(this._locator.locator('#dualdebit'));
        this.GiftCard = new Checkbox(this._locator.locator('#checknoncashadjustmentgift'));
        this.SideCard = new Checkbox(this._locator.locator('#checknoncashadjustmentsidecard'));
        this.Percentage = new TextField(this._locator.locator('#noncashadjustmentpercentdual'));
        this.NcaPercentage = new TextField(this._locator.locator('#noncashadjustmentpercent'));
        
        this.Minimum = new TextField(this._locator.locator('#noncashadjustmentminimum'));
        this.Label = new TextField(this._locator.locator('#noncashadjustmentlabel'));
        this.CustomerScreenText = new TextField(this._locator.locator('#noncashadjustmenttext'));
        this.ShowCashTotalasGrandTotalOnCustomerScreen = new Checkbox(this._locator.locator('#checknoncashadjustmentcashasgrand'));
        this.ShowCashAndNonCashOnPayButton = new Checkbox(this._locator.locator('#showcashnoncashtocashbtn'));
        this.ShowExcludeNonCashButton = new Checkbox(this._locator.locator('#noncashexcludebutton'));
        this.ShowCashRegularPriceOnPayButton = new Checkbox(this._locator.locator('#showdualcashtocashbtn'));
        this.Roundto9thcent = new Checkbox(this._locator.locator('#roundtocentbutton'));
        this.Save = new Button(this._locator.locator('button[title="Save"]'));
 
    }

    public async IsVisible(): Promise<boolean> {
        try {
            const sectionHeading = this._locator.locator('h4.lighter', { hasText: 'Non Cash Adj/Dual Pricing' });
            return await sectionHeading.isVisible();
        } catch (e) {
            return false;
        }
    }
};