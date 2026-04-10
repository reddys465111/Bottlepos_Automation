import { Locator } from "@playwright/test";
import { Table_DeadStock } from "./Tables/table_DeadStock";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class DeadStock {
    
    public Filter: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_DeadStock;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Filter = new Dropdown(this._locator.locator('#differenceSelect'));
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("div#dead-stock-report_filter input[aria-controls='dead-stock-report']"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='dead-stock-report_length'][aria-controls='dead-stock-report'].form-control.input-sm"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('div#dead-stock-report_paginate'));
        this.Table = new Table_DeadStock(this._locator.locator('table#dead-stock-report'));
    }
}