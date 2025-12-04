import { type Locator, type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { NumberField } from "../../../objects/numberField";
import { TextField } from "../../../objects/textField";

export class Dialog_GroupAdvanceSearch extends BaseDialog {
    public StockCode: TextField;
    public ItemName: TextField;
    public Size: Dropdown;
    public Supplier: Dropdown;
    public Category: Dropdown;
    public CategoryGroup: Dropdown;
    public PaymentType: Dropdown;
    public TransactionAmount : {
        From : NumberField,
        To : NumberField
    }
    public User: Dropdown;
    public Device: Dropdown;
    public Tags: TextField;
    public DateRange: Dropdown;
    public Search: Button;
    public Cancel: Button;
    
    constructor(page: Page) {
        super(page, "Group Advance Search");

        this.StockCode = new TextField(this._locator.locator("#grpadvancesearchitemcode"));
        this.ItemName = new TextField(this._locator.locator("#grpadvsearchitemname"));
        this.Size = new Dropdown(this._locator.locator("#grpadvsearchitemdesc"));
        this.Supplier = new Dropdown(this._locator.locator("#grpadvsearchitemsupplier"));
        this.Category = new Dropdown(this._locator.locator("#grpadvsearchitemcategory"));
        this.CategoryGroup = new Dropdown(this._locator.locator("#grpadvsearchitemcategorygrp"));
        this.PaymentType = new Dropdown(this._locator.locator("#grpadvsearchpaymenttype"));
        this.TransactionAmount = {
            From: new NumberField(this._locator.locator('#grpadvsearchtranamtfrom')),
            To: new NumberField(this._locator.locator('#grpadvsearchtranamtto')),
        }

        this.User = new Dropdown(this._locator.locator("#grpadvsearchcustusers"));
        this.Device = new Dropdown(this._locator.locator("#grpadvsearchcustdevice"));
        this.Tags = new TextField(this._locator.locator("#grpsearchitemtags"));
        this.DateRange = new Dropdown(this._locator.locator("#adv_daterangepicker"));

        this.Search = new Button(this._locator.locator('button[title="Search"]'));
        this.Cancel = new Button(this._locator.locator('button[title="Cancel"]'));
    }

}
