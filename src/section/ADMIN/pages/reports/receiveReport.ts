import { Locator } from "@playwright/test";
import { Table_ReceiveReport } from "./Tables/table_ReceiveReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class ReceiveReport {
    
    public Filter: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_ReceiveReport;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Filter = new Dropdown(this._locator.locator('#receivegroupbyselect'));
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#receive-report_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='receive-report_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#receive-report_paginate'));
        this.Table = new Table_ReceiveReport(this._locator.locator('table#receive-report'))
     
    }
}