import { Locator } from "@playwright/test";
import { TaxRules_Table } from "./taxRuleTable";
import { Dropdown } from "../../../../objects/dropdown";
import { Checkbox } from "../../../../objects/checkbox";
import { TextField } from "../../../../objects/textField";
import { Button } from "../../../../objects/button";

export class TaxRules {

    private _locator: Locator;
    public Table : TaxRules_Table;
    public DefaultTax: Dropdown;
    public TaxButton: Dropdown;
    public TaxButtonEnable: Checkbox;
    public TaxLabel: TextField;
    public DefaultEBTTax: Dropdown;
    public DefaultEBTTaxEnable: Checkbox;

    public Add: Button;
    constructor(locator: Locator){
        this._locator = locator;
        this.Table = new TaxRules_Table(this._locator.locator('#tax-rule-table'));

        this.DefaultTax = new Dropdown(this._locator.locator('#defaulttaxid'));
        this.TaxButton = new Dropdown(this._locator.locator('#taxbutton'));
        this.TaxButtonEnable = new Checkbox(this._locator.locator('#etbenable'));
        this.TaxLabel = new TextField(this._locator.locator('#ebtlabel'));
        this.DefaultEBTTax = new Dropdown(this._locator.locator('#defaultebttax'));
        this.DefaultEBTTaxEnable = new Checkbox(this._locator.locator('#defaultebttaxenable'));

        this.Add = new Button(this._locator.locator('#addtaxrulebtn'));
    }
}