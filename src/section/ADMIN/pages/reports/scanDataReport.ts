import { Locator } from "@playwright/test";
import { Table_ScanDataReport } from "./Tables/table_ScanDataReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class ScanDataReport {
    
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_ScanDataReport;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#scandataprogramtable_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='scandataprogramtable_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#scandataprogramtable_paginate'));
        this.Table = new Table_ScanDataReport(this._locator.locator('table#scandataprogramtable'));
     
    }
}