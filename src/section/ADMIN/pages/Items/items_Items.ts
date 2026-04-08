import { Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { Table_Item } from "../../tables/table_Items";

export class Items_Items {

    public _page: Page;
    public Add: Button;
    public BulkUpdate: Button;
    public ManageItemSizes: Button;
    public ManagePromotions: Button;

    public Table: Table_Item;
    constructor(page: Page){
        this._page = page;
        const locator = this._page.locator("#maincontent");
        this.Add = new Button(locator.getByRole('button', {name: 'Add'}));
        this.BulkUpdate = new Button(locator.getByRole('button', {name: 'Bulk Update'}));
        this.ManageItemSizes = new Button(locator.getByRole('button', {name: 'Manage Item Sizes'}));
        this.ManagePromotions = new Button(locator.getByRole('button', {name: 'Manage Promotions'}));

        this.Table = new Table_Item(locator.locator('#itemstable_wrapper'));
    }
}