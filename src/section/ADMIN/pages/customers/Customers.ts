import { Page } from "@playwright/test";
import { Table_Customers } from "./tables/table_Customers";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class Customers{

    public Home: Button;
    public Referesh: Button;
    public ExportCSV: Button;
    public Add: Button;
    public SmsPromotion: Button;
    public ManageGroups: Button;
    public ManageRewards: Button;
    public Search: TextField
    public AdvanceSearch: Button;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_Customers


    constructor(page: Page){

        const container = page.locator('#maincontent');
        this.Home = new Button(container.locator("ul.breadcrumb li a[onclick='WPOS.goToHome();']"));
        this.Referesh = new Button(container.locator('[title="Refresh"]'));
        this.ExportCSV = new Button(container.locator("button[title='Export CSV']"));
        this.Add = new Button(container.locator('#addbtn'));
        this.SmsPromotion = new Button(container.locator('#smsemailprmbtn'));
        this.ManageGroups = new Button(container.locator('#mnggrmbtn'));
        this.ManageRewards = new Button(container.locator("button[title='Manage Customer Offers']"));
        this.Search = new TextField(container.locator("input[aria-controls='customertable']"));
        this.AdvanceSearch = new Button(container.locator('#advance_search'));
        this.ShowEntries = new Dropdown(container.locator('#customertable_length'));
        this.ShowingEntries = new Table_Pagination(container.locator('#customertable_paginate'));
        this.Table = new Table_Customers(container.locator('#customertable_wrapper'));
    }
}