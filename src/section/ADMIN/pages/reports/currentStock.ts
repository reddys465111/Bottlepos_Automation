import { Locator } from "@playwright/test";

import { Table_CurrentStock } from "./Tables/table_CurrentStock";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";


export class CurrentStock {
    
    public Filter: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_CurrentStock;
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
        this.Filter = new Dropdown(this._locator.locator('#currentstockselect'));
        this.Search = new TextField(this._locator.locator("#current-stock-report_filter input[aria-controls='current-stock-report"));
        this.ShowEntries = new Dropdown(this._locator.locator("#current-stock-report_length select[aria-controls='current-stock-report']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#current-stock-report_paginate'));
        this.Table = new Table_CurrentStock(this._locator.locator('table#current-stock-report'));
    }
}