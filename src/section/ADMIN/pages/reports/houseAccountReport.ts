import { Locator } from "@playwright/test";
import { Table_HouseAccountReport } from "./Tables/table_HouseAccountReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class HouseAccountReport {
 
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_HouseAccountReport;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#customer-ledger-report_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='customer-ledger-report_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#customer-ledger-report_paginate'));
        this.Table = new Table_HouseAccountReport(this._locator.locator('table#customer-ledger-report'));
     
    }
}