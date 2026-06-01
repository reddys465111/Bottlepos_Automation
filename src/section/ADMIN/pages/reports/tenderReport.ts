import { Locator } from "@playwright/test";
import { Table_TenderReport } from "./Tables/table_TenderReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";
import { KEY } from "../../../../utils";

export class TenderReport {
    
    public Filter: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_TenderReport;
    public _locator: Locator;

    constructor(locator: Locator){

        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator('#custom_daterangepicker')); 
        this.Filter = new Dropdown(this._locator.locator('#tenderreportselect'));
        this.Search = new TextField(this._locator.locator('#takings-report_filter input'));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='takings-report_length'][aria-controls='takings-report'].form-control.input-sm"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#takings-report_paginate'));
        this.Table = new Table_TenderReport(this._locator.locator('table#takings-report'));
 
    }

    /**
     * Clear the search filter and wait for the table to update with all results
     */
    public async ClearSearch(): Promise<void> {
        await this.Search.setText({ value: "", press: KEY.ENTER });
        // Wait for the table to reload with all data after clearing search
        await this._locator.page().waitForTimeout(1500);
        // Wait for table to be visible and stable
        await this.Table.WaitUntilVisible();
    }
    
   
}