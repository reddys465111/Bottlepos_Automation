import { Locator } from "@playwright/test";
import { Table_NotesReport } from "./Tables/table_NotesReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class NotesReport {
    
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_NotesReport;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#sale-item-notes_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='sale-item-notes_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#sale-item-notes_paginate'));
        this.Table = new Table_NotesReport(this._locator.locator('table#sale-item-notes'));
    }
}