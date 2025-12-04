import { Locator } from "@playwright/test";
import { Table_LoginReport } from "./Tables/table_LoginReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class LoginReport {

    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_LoginReport;
    private _locator: Locator;

    constructor(locator: Locator){

        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#messagesenthist_filter input[type='search']"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='messagesenthist_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#messagesenthist_paginate'));
        this.Table = new Table_LoginReport(this._locator.locator('table#messagesenthist'));
     
    }
}