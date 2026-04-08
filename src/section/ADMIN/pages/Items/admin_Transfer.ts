import { Page } from "@playwright/test";
import { Dialog_TransferStock } from "../../dialogs/dialog_TransferStock";
import { Table_Transfer } from "../../tables/table_transfer";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class Admin_Transfer {

    public Home: Button;
    public Referesh: Button;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public TransferTable: Table_Transfer;
    public TransferDialog: Dialog_TransferStock;
    public TransferItems: Button;
    public ShowingEntries: Table_Pagination;

    constructor(page: Page) {
        this.Home = new Button(page.locator("li a[onclick='WPOS.goToHome();']"));
        this.Referesh = new Button(page.locator('[title="Refresh"]'));
        this.Search = new TextField(page.locator("input[type='search']"));
        this.TransferItems = new Button(page.locator("[title='Transfer Items']"));
        this.ShowEntries = new Dropdown(page.locator("#receiveitemstable_length"));
        this.TransferTable = new Table_Transfer(page.locator("table#receiveitemstable"));
        this.ShowingEntries = new Table_Pagination(page.locator('#receiveitemstable_paginate'));
        this.TransferDialog = new Dialog_TransferStock(page);
    }
}