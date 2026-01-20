import { Locator } from "playwright";
import { Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { TextField } from "../../../../objects/textField";
import { Table_Inventory } from "../../tables/table_Inventory";
import { Dropdown } from "../../../../objects/dropdown";
import { Table_Categories } from "../../tables/table_Categories";
import { Table_Pagination } from "../../tables/table_Pagination";
import { Dialog_ManageCategoryGroup } from "../../dialogs/dialog_ManageCategoryGroup";
import { Dialog_AddCategory } from "../../dialogs/dailog_AddCategory";

export class Admin_Categories{
    public _page: Page;
    public Home: Button;
    public Referesh: Button;
    public ManageCategoryGroup: Button;
    public Add: Button;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public Table: Table_Categories;
    public ShowingEntries: Table_Pagination;
    public Dialog_ManageCategoryGroup: Dialog_ManageCategoryGroup;
    public Dialog_AddCategory: Dialog_AddCategory;

    constructor(page: Page){
        this._page = page;
        this.Home = new Button(this._page.locator("li a[onclick='WPOS.goToHome();']"));
        this.Referesh = new Button(this._page.locator('[title="Refresh"]'))
        this.Referesh.SetAfterEvent(async () => {await this._page.waitForTimeout(2500);});
        this.ManageCategoryGroup = new Button(this._page.locator('[title="Manage Category Group"]'));
        this.Add = new Button(this._page.locator('#addbtn'));
        this.Search = new TextField(this._page.locator("input.form-control.input-sm[aria-controls='categoriestable']"));
        this.ShowEntries = new Dropdown(this._page.locator("select[name='categoriestable_length']"));
        this.Table = new Table_Categories(this._page.locator('#categoriestable'));
        this.ShowingEntries = new Table_Pagination(this._page.locator('#categoriestable_paginate'));
        this.Dialog_ManageCategoryGroup = new Dialog_ManageCategoryGroup(this._page);
        this.Dialog_AddCategory = new Dialog_AddCategory(this._page);
        
    }
}