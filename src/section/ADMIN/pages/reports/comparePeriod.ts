import { Locator } from "@playwright/test";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";
import { Table_ComparePeriod } from "./Tables/table_ComparePeriod";


export class ComparePeriod {

    public Filter: Dropdown;
    public Compare: {
        Period1: Dropdown
        Period2: Dropdown
    }
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
     public Table: Table_ComparePeriod;
    public _locator: Locator;
    
    constructor(locator: Locator){
        this._locator = locator;
        this.Compare = {
            Period1: new Dropdown(this._locator.locator('#custom_daterangepicker1')),
            Period2: new Dropdown(this._locator.locator('#custom_daterangepicker2'))
        }
        this.Filter = new Dropdown(this._locator.locator('#compareselect'));
        this.Search = new TextField(this._locator.locator("div#summary-report_filter input[aria-controls='summary-report']"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='summary-report_length'][aria-controls='summary-report'].form-control.input-sm"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#summary-report_paginate'));
         this.Table = new Table_ComparePeriod(this._locator.locator('table#summary-report'));
    }
}