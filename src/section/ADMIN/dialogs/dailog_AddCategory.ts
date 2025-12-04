import { Page } from "@playwright/test";
import { Dialog_AddGroupCategory } from "./dialog_AddGroupCategory";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";

export class Dialog_AddCategory extends BaseDialog {
    
    
    public CategoryGroup :  {
        Select: Dropdown;
        Add: Button
    }
    public Dialog_AddGroupCategory: Dialog_AddGroupCategory;
    public Name: TextField;
    public DefaultTax: Dropdown;
    public AgeVerification: TextField;
    public DefaultMargin: TextField;
    public AllowEBT: Checkbox;
    public DoNotDiscount: Checkbox;
    public DoNotShowToWebstore: Checkbox;
    public ExcludeNonCashAdj: Checkbox;
    public ExcludeLoyaltyReward: Checkbox;
    public Save : Button;
    public Cancel : Button;

    
    constructor(page: Page){ 
        super(page, "Add Category");
      
        this.CategoryGroup = {
            Select: new Dropdown(this._locator.locator('#categorygrp')),
            Add: new Button(this._locator.locator('[title="Add"]'))
        }
        this.Dialog_AddGroupCategory= new Dialog_AddGroupCategory(page);
        this.Name = new TextField(this._locator.locator('#newcategoryname'));
        this.DefaultTax = new Dropdown(this._locator.locator('#newdefaulttax'));
        this.AgeVerification = new TextField(this._locator.locator('#newageverification'));
        this.DefaultMargin = new TextField(this._locator.locator('#newdefaultmargin'));
        this.AllowEBT = new Checkbox(this._locator.locator('#newallowebt'));
        this.DoNotDiscount = new Checkbox(this._locator.locator('#newdonotdiscount'));
        this.DoNotShowToWebstore = new Checkbox(this._locator.locator('#newaddtowebstore'));
        this.ExcludeNonCashAdj = new Checkbox(this._locator.locator('#newexclusenoncashadj'));
        this.ExcludeLoyaltyReward = new Checkbox(this._locator.locator('#newexcludeloyaltyreward'));
        this.Save = new Button(this._locator.locator('[title="Save"]'));
        this.Cancel = new Button(this._locator.locator('[title="Cancel"]'));
    }
}