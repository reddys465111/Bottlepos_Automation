import { Page } from "@playwright/test";

import { Table_ViewPerInvoice } from "../../tables/table_ViewPerInvoice";
import { Table_ViewBySupplier } from "../../tables/table_ViewBySupplier";
import { Table_ViewByItems } from "../../tables/table_ViewByItems";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class Admin_Recieve{

    public Home: Button;
    public Referesh: Button;
    public ViewPerInvoice: Button;
    public ViewPerSupplier: Button;
    public ViewPerItems: Button;
    public ImportCSV: Button;
    public ExportCSV: Button;
    public ReceiveItems: Button;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public Table_ViewPerInvoice: Table_ViewPerInvoice;
    public Table_ViewBySupplier: Table_ViewBySupplier;
    public Table_ViewByItems: Table_ViewByItems;
    public ShowingEntries: Table_Pagination;

    
    constructor(page: Page){
        this.Home = new Button(page.locator("li a[onclick='WPOS.goToHome();']"));
        this.Referesh = new Button(page.locator('[title="Refresh"]'));
        this.ViewPerInvoice = new Button(page.locator('[title="View Per Invoice"]'));
        this.ViewPerSupplier = new Button(page.locator('[title="View By Supplier"]'));
        this.ViewPerItems = new Button(page.locator('[title="View By Items"]'));
        this.ReceiveItems = new Button(page.locator('[title="Receive Items"]'));
        this.Search = new TextField(page.locator('#receiveitemstable_filter input[type="search"]'))
        this.ShowEntries = new Dropdown(page.locator("select[name='receiveitemstable_length']"));
        this.Table_ViewPerInvoice = new Table_ViewPerInvoice(page.locator('table#receiveitemstable'));
        this.Table_ViewBySupplier = new Table_ViewBySupplier(page.locator('table#receiveitemstable'));
        this.Table_ViewByItems = new Table_ViewByItems(page.locator('table#receiveindividualitemstable'));
        this.ShowingEntries = new Table_Pagination(page.locator('#receiveitemstable_paginate'));
        this.ImportCSV = new Button(page.locator('[title="Import CSV"]'));
        this.ExportCSV = new Button(page.locator('[title="Export CSV"]'));
    }
}
