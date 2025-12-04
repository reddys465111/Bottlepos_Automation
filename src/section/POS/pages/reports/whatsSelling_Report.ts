import { Page } from "@playwright/test";
import { BaseTable } from "../../../../base/baseTable";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";


export type Columns_WhatsSelling =  "Item" | "# Sold" | "Total";
export class WhatsSelling {

    private _page: Page;
    public Search: TextField;
    public Table: BaseTable<Columns_WhatsSelling>;
    public ShowEntries: Dropdown;

    public Pagination: {
        Previous: Button,
        Next: Button,
    };

    constructor(page: Page) {
        this._page = page;
        const whatSellingLocator = this._page.getByTestId('whats-selling-container');

        this.Search = new TextField(whatSellingLocator.getByLabel('Search'));
        this.Table  = new BaseTable<Columns_WhatsSelling>(whatSellingLocator.locator('table'));
        this.ShowEntries = new Dropdown(whatSellingLocator.getByLabel('Show'));
        this.Pagination = {
            Previous: new Button(whatSellingLocator.getByRole('button', { name: 'Previous' })),
            Next: new Button(whatSellingLocator.getByRole('button', { name: 'Next' })),
        }
    }

    public async Click(): Promise<void> {
        await this._page.getByRole('button', { name: "What's Selling"}).click();
    }

}