import { type Locator, type Page } from "@playwright/test";
import { Tab } from "../../../../objects/tab";
import { Table_PosSales } from "../../tables/table_PosSales";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";
import { Dialog_AdvanceSearch } from "../../dialogs/dialog_AdvanceSearch";


export class PosSales extends Tab {
    public Home:Button;
    public Refresh: Button;
    public ShowEntries : Dropdown;
    public ShowingEntries: Table_Pagination;
    public Pagination!: Table_Pagination;
    public Table: Table_PosSales
    public Ref : {
        SearchField: TextField,
        SearchButton: Button;
    }

    public Search!: TextField;
    public AdvancedSearch: Button;
    public Dialog:{
        AdvanceSearch : Dialog_AdvanceSearch
    }

    constructor(page: Page){
 
        super(page, 'PosSales');

        this.Home = new Button(this._page.locator("ul.breadcrumb li a[onclick='WPOS.goToHome();']"));
        this.Refresh = new Button(this._page.locator('button[title=Refresh]'));
        this.Ref = {
            SearchField: new TextField(this._locator.locator("#salestable_filter input[type=search][aria-controls='salestable']")),
            SearchButton: new Button(this._locator.locator('#advance_search')),
        }
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='salestable_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#salestable_paginate'));
        this.Table = new Table_PosSales(this._locator.locator('table#salestable'))

        this.AdvancedSearch = new Button(this._locator.locator('#advance_search'));
        this.Dialog = {
            AdvanceSearch: new Dialog_AdvanceSearch(page),
        }
    }

}