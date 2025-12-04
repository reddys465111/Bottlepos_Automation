import { Locator } from "@playwright/test";
import { Table_OverStock } from "./Tables/table_OverStock";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class OverStock {
    
    public Filter: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_OverStock;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Filter = new Dropdown(this._locator.locator('#reorderpointSelect'));
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("div#over-stock-report_filter input[aria-controls='over-stock-report']"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='over-stock-report_length'][aria-controls='over-stock-report'].form-control.input-sm" ));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('div#over-stock-report_paginate'));
        this.Table = new Table_OverStock(this._locator.locator('table#over-stock-report'));
     
    }
}