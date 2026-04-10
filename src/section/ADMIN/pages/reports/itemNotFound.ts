import { Locator } from "@playwright/test";
import { Table_ItemNotFound } from "./Tables/table_ItemNotFound";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class ItemsNotFound {

    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_ItemNotFound;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#items-no-found_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='items-no-found_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#items-no-found_paginate'));
        this.Table = new Table_ItemNotFound(this._locator.locator('table#items-no-found'));
    }
}