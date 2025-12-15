import { type Locator, type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";
import { Table_ManageCustomerGroups } from "../pages/customers/tables/table_ManageCustomerGroups";
import { Dialog_AddCustomerGroup } from "./dialog_AddCustomerGroup";
import { Table_Pagination } from "../tables/table_Pagination";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";

export class Dialog_ManageCustomerGroups extends Legacy_BaseDialog {
    public Add: Button;
    public ShowEntries: Dropdown;
    public Search: TextField;
    public ShowingEntries: Table_Pagination;
    public ManageCustomerGroupsTable: Table_ManageCustomerGroups;
    public AddCustomerGroup!: Dialog_AddCustomerGroup;

    constructor(page: Page) {
        super(page, "Manage Customer Groups");
        this.Add = new Button(this._locator.locator('#addcustgroupbtn'));
        this.ShowEntries = new Dropdown(this._locator.locator('select[name="manage_custgrouptable_length"]'));
        this.Search = new TextField(this._locator.locator('#manage_custgrouptable_filter input[type="search"]'));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#manage_custgrouptable_paginate'))
        this.ManageCustomerGroupsTable = new Table_ManageCustomerGroups(this._locator.locator('#manage_custgrouptable'));
    }
}