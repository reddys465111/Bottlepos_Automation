import { Page, Locator } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { BaseTable } from "../../../../base/baseTable";
import { Legacy_BaseTable } from "../../../../base/legacy/legacy_BaseTable";
import { Table_Suppliers } from "../../tables/table_Suppliers";
import { TextField } from "../../../../objects/textField";
import { Dropdown } from "../../../../objects/dropdown";


export class Admin_Suppliers {

     private _page: Page;
    public Add: Button;
    public Table: Table_Suppliers
    public Search: TextField;
    public showEntries: Dropdown;

    public constructor(page: Page) {
        this._page = page;
        const locator = this._page.locator("#maincontent");
        this.Add = new Button(locator.getByRole("button", { name: "Add" }));
        this.Table = new Table_Suppliers(locator.locator("#supplierstable"));
        this.Search = new TextField(locator.getByRole('searchbox', { name: 'Search:' }));
        this.showEntries = new Dropdown(locator.locator('select[name="supplierstable_length"]'));

    }
}
