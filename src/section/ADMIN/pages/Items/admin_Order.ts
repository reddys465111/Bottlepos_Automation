import { Page } from "@playwright/test";
import { Table_Order } from "../../tables/table_Order";
import { Dialog_OrderItems } from "../../dialogs/dialog_OrderItems";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class Admin_Order {

    public Home: Button;
    public Referesh: Button;
    public Search: TextField;
    public CreateOrder: Button;
    public ShowEntries: Dropdown;
    public OrderTable: Table_Order;
    public OrderDialog: Dialog_OrderItems;
    public ShowingEntries: Table_Pagination;

    constructor(page: Page) {

        this.Home = new Button(page.locator("li a[onclick='WPOS.goToHome();']"));
        this.Referesh = new Button(page.locator('[title="Refresh"]'));
        this.Search = new TextField(page.locator("input[type='search'][aria-controls='orderitemstable']"));
        this. CreateOrder = new Button(page.locator("[title='Create Order']"));
        this.ShowEntries = new Dropdown(page.locator("#orderitemstable_length"));
        this.OrderTable = new Table_Order(page.locator("table#orderitemstable"));
        this.OrderDialog = new Dialog_OrderItems(page);
        this.ShowingEntries = new Table_Pagination(page.locator('#orderitemstable_paginate'));
    }
}
