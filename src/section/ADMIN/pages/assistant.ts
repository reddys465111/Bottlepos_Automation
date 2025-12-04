import { Locator, Page } from "@playwright/test"

import { Table_AssistantTable } from "./pages/reports/Tables/table_Assistant";
import { Button } from "../../objects/button";
import { Dropdown } from "../../objects/dropdown";
import { TextField } from "../../objects/textField";

export class Assistant{
    private _locator: Locator;
    public Home: Button;
    public Refresh: Button;
    public Range: Dropdown;
    public Search : {
        Search: TextField,
        SearchButton: Button,
    }
    public Table!: Table_AssistantTable;
    constructor(page: Page, locator: Locator){
    
        this._locator = locator;
        this.Home = new Button(page.locator("ul.breadcrumb li a[onclick='WPOS.goToHome();']"));
        this.Refresh = new Button(page.locator('button[title=Refresh]'));
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search={
            Search: new TextField(this._locator.locator('#search_query')),
            SearchButton: new Button(this._locator.locator('#search_link')),

        }
    }
}