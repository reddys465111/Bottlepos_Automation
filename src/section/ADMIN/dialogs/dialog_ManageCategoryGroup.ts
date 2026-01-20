import { Locator, Page } from "@playwright/test";
import { Dialog_AddGroupCategory } from "./dialog_AddGroupCategory";
import { Table_ManageGroupCategory } from "../pages/reports/Tables/tables_ManageGroupCategory";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { Table_Pagination } from "../tables/table_Pagination";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";

export class Dialog_ManageCategoryGroup extends Legacy_BaseDialog {
    
    public Add : Button;

    public Search : TextField;
    public Dialog_AddGroupCategory: Dialog_AddGroupCategory;
    public ShowEntries: Dropdown;
    public Table: Table_ManageGroupCategory;
    public ShowingEntries: Table_Pagination;
    
    constructor(page: Page) { 
        super(page, "Manage Group Category");
        this.Add = new Button(this._locator.locator('[title ="Add"]'));
        this.Dialog_AddGroupCategory = new Dialog_AddGroupCategory(page);
        this.Search = new TextField(this._locator.locator("input.form-control.input-sm[aria-controls='managecategorygrptable']"));
        this.Table = new Table_ManageGroupCategory(this._locator.locator('#managecategorygrptable'));
        this.ShowingEntries = new Table_Pagination(this._page.locator('#categoriestable_paginate'));
        this.ShowEntries = new Dropdown(this._page.locator("select[name='managecategorygrptable_length']"));
    }
}


