import { Locator } from "@playwright/test";
import { Table_MessageSentHistory } from "./Tables/table_MessageSentHistory";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class MessageSentHistory {
    
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_MessageSentHistory;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#messagesenthist_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='messagesenthist_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#messagesenthist_paginate'));
        this.Table = new Table_MessageSentHistory(this._locator.locator('table#messagesenthist'));
     
    }
}