import { Locator, Page } from "@playwright/test";
import { Dialog_AdvanceSearch } from "./dialogs/dialog_AdvanceSearch";
import { Table_Summary } from "./Tables/table_Summary";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class Summary {
    
    public Stores: Dropdown;
    public Shift: Dropdown;
    public Range: Dropdown;
    public AdvanceSearch: Button;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_Summary;
    public Dialog_AdvanceSearch : Dialog_AdvanceSearch;
    public _locator:Locator;


    constructor(page: Page, locator: Locator){

        this._locator=locator
        this.Stores = new Dropdown(this._locator.locator('#linkedstoreselect'));
        this.Range = new Dropdown(this._locator.locator('#custom_daterangepicker'));
        this.Shift = new Dropdown(this._locator.locator('#userstaffshiftsselect'));
        this.AdvanceSearch = new Button(this._locator.locator('#sale_advance_search'));
        this.Search = new TextField(this._locator.locator('#summary-report_filter'));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='summary-report_length'][aria-controls='summary-report'].form-control.input-sm"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#summary-report_paginate'));
        this.Table = new Table_Summary(this._locator.locator('#summary-report'));
        this.Dialog_AdvanceSearch = new Dialog_AdvanceSearch(page);

    }
}