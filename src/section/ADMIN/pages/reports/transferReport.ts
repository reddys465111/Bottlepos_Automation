import { Locator } from "@playwright/test";
import { Table_TransferReport } from "./Tables/table_TransferReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class TransferReport {
    
    public GroupBy: Dropdown;
    public TransferFrom: Dropdown;
    public TransferTo: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_TransferReport;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.GroupBy = new Dropdown(this._locator.locator('#transfergroupbysel'));
        this.TransferFrom = new Dropdown(this._locator.locator('#transfer_from_filter'));
        this.TransferTo = new Dropdown(this._locator.locator('#transfer_to_filter'));
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#transfer-report_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='transfer-report_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#transfer-report_paginate'));
        this.Table = new Table_TransferReport(this._locator.locator('table#transfer-report'));
     
    }
}