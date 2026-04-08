import { Locator, type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Table_CustomersInGroup } from "../pages/customers/tables/table_CustomersInGroup";
import { Table_SearchAndSelectCustomers } from "../pages/customers/tables/table_SearchAndSeletCustomers";
import { Dialog_GroupAdvanceSearch } from "./dialog_GroupAdvanceSearch";
import { TextField } from "../../../objects/textField";
import { Table_Pagination } from "../tables/table_Pagination";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { LabelField } from "../../../objects/labelField";

export class Dialog_EditCustomerGroup extends Legacy_BaseDialog {
    public GroupName: TextField;
    public Save: Button;
    public Cancel: Button;
    public Search: TextField;
    public AdvanceSearch: Button;
    public ShowingEntries: Table_Pagination;
    public GroupAdvanceSearch!: Dialog_GroupAdvanceSearch;
    public SearchAndSelectCustomers: Table_SearchAndSelectCustomers;
    public CustomersInGroup: Table_CustomersInGroup;
    public Addicon: Button;
    public Customercount: LabelField

    constructor(page: Page) {
        super(page, "Edit Cutomer Group");

        this.Search = new TextField(this._locator.locator('.dataTables_filter'))
        this.AdvanceSearch = new Button(this._locator.locator('#groupadvance_search_cross'))
        this.GroupName = new TextField(this._locator.locator('#custgroupname'));
        this.Save = new Button(this._locator.locator('button[title="Save"]'));
        this.Cancel = new Button(this._locator.locator('button[title="Cancel"]'));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#groupcustomersearchtable_paginate'));
        this.SearchAndSelectCustomers = new Table_SearchAndSelectCustomers(this._locator.locator('#groupcustomersearchtable'));
        this.CustomersInGroup = new Table_CustomersInGroup(this._locator.locator('#groupcustomerstable_processing'));
        this.Addicon = new Button(this._locator.locator("i.icon-plus[title='Add Item']").first());
        this.Customercount = new LabelField(this._locator.locator('#totalgrpcustomers'));

    }

}
