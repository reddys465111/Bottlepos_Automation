import { Locator } from "playwright";
import { Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { TextField } from "../../../../objects/textField";
import { Table_Inventory } from "../../tables/table_Inventory";
import { Dropdown } from "../../../../objects/dropdown";

export class Admin_Inventory {
     public _page: Page;
        public Home: Button;
        public Referesh: Button;
        public ExportCSV: Button;
        public Add: Button;
        public Search: TextField;
        public ShowEntries: Dropdown;
        
        public Table: Table_Inventory;
        constructor(page: Page){
            this._page = page;
            const locator = this._page.locator("#maincontent");
            this.Home = new Button(this._page.locator("li a[onclick='WPOS.goToHome();']"));
            this.Referesh = new Button(this._page.locator('[title="Refresh"]'));
            this.ExportCSV = new Button(this._page.locator('[title="Export CSV"]'));
            this.Add = new Button(locator.getByRole('button', {name: 'Add'}));
            this.Search = new TextField(locator.getByRole('searchbox', { name: 'Search' }));
            this.ShowEntries = new Dropdown(locator.locator('select[name="stocktable_length"]'));
            this.Table = new Table_Inventory(locator.locator('#stocktable'));
        }
    
}