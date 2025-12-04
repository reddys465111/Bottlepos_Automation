import { Locator } from "@playwright/test";
import { Table_PayrollReport } from "./Tables/table_PayrollReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class PayrollReport {
    
    public Filter: Dropdown;
    public All: Dropdown;
    public Stores: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_PayrollReport;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Filter = new Dropdown(this._locator.locator('#payrollgroupbyselect'));
        this.All = new Dropdown(this._locator.locator('#stafflistsselect'));
        this.Stores = new Dropdown(this._locator.locator('#linkedstoreselect'));
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#payroll-report_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='payroll-report_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#payroll-report_paginate'));
        this.Table = new Table_PayrollReport(this._locator.locator('table#payroll-report'));
     
    }
}