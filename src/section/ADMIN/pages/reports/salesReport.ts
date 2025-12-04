import { Locator, Page } from "@playwright/test";
import { Dialog_AdvanceSearch } from "./dialogs/dialog_AdvanceSearch";
import { Table_SalesReport } from "./Tables/table_SalesReport";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class SalesReport {

    public Filter: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_SalesReport;
    public _locator: Locator;
    public AdvanceSearch: Button;
    public Dialog_AdvanceSearch : Dialog_AdvanceSearch;
    public ColumnVisibility : Button;

    constructor(page: Page, locator: Locator){
        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator('#custom_daterangepicker')); 
        this.Filter = new Dropdown(this._locator.locator('#salesgroupselect'));
        this.Search = new TextField(this._locator.locator("input.form-control.input-sm[aria-controls='item-sales-report']"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='item-sales-report_length'][aria-controls='item-sales-report'].form-control.input-sm"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#item-sales-report_paginate'));
        this.Table = new Table_SalesReport(this._locator.locator('table#takings-report'));
        this.AdvanceSearch = new Button(this._locator.locator('#sale_advance_search'));
        this.Dialog_AdvanceSearch = new Dialog_AdvanceSearch(page);
        this.ColumnVisibility = new Button(this._locator.locator("div.dt-buttons > button.dt-button.buttons-collection[aria-controls='item-sales-report']"));     
    }
}