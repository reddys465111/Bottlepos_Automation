import { Locator } from "@playwright/test";
import { Table_Expenses } from "./Tables/table_Expenses";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class Expenses {

    public Filter: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_Expenses;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator('#custom_daterangepicker')); 
        this.Filter = new Dropdown(this._locator.locator('#expenseSelect'));
        this.Search = new TextField(this._locator.locator("input.form-control.input-sm[aria-controls='expense-report']"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='expense-report_length'][aria-controls='expense-report'].form-control.input-sm"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#expense-report_paginate'));
        this.Table = new Table_Expenses(this._locator.locator("table#expense-report"));
    }
    
}