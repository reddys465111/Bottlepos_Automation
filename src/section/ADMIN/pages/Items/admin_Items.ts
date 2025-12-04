import { Locator, Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { Table_Item } from "../../tables/table_Items";
import { TextField } from "../../../../objects/textField";

export class Admin_Items{
    public _page: Page;
    public Home: Button;
    public Referesh: Button;
    public ManageItemSizes: Button;
    public ManagePromotions: Button;
    public ImportCSV: Button;
    public ExportCSV: Button;
    public BulkUpdate: Button;
    public Add: Button;
    public AdvanceSearch: Button;
    public Search: TextField;
    public Table: Table_Item;

    constructor(page: Page){
        this._page = page;
        const locator = this._page.locator("#maincontent");
        this.Home = new Button(this._page.locator("li a[onclick='WPOS.goToHome();']"));
        this.Referesh = new Button(this._page.locator('[title="Refresh"]'));


        this.ImportCSV = new Button(this._page.locator('[title="Import CSV"]'));
        this.ExportCSV = new Button(this._page.locator('[title="Export CSV"]'));

        this.AdvanceSearch = new Button(this._page.locator('#advance_search'));

        this.Add = new Button(locator.getByRole('button', {name: 'Add'}));
        this.BulkUpdate = new Button(locator.getByRole('button', {name: 'Bulk Update'}));
        this.ManageItemSizes = new Button(locator.getByRole('button', {name: 'Manage Item Sizes'}));
        this.ManagePromotions = new Button(locator.getByRole('button', {name: 'Manage Promotions'}));
        this.Search = new TextField(locator.getByRole('searchbox', { name: 'Search' }));
        this.Table = new Table_Item(locator.locator('#itemstable_wrapper'));
        // this.Table = new Table_Item(page.locator('#itemstable_wrapper'));
        // this.Dialog = {
            // ManageItemSizes : new Dialog_ManageItemSizes(),
            // ManagePromotions : new Dialog_ManagePromotions(),
            // BulkUpdate : new Dialog_BulkUpdate(),
            // AddItem : new Dialog_EditItem(),
            // AdvanceSearch : new Dialog_AdvanceSearch()
        // }
    }
}