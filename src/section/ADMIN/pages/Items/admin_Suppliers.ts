import { Page, Locator } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { BaseTable } from "../../../../base/baseTable";
import { Legacy_BaseTable } from "../../../../base/legacy/legacy_BaseTable";

export type ColumnTitles = "ID" | "Name" | "Email" | "Mobile" | "Actions";
export class Admin_Suppliers {

     private _page: Page;
    public Add: Button;
    public Table: Legacy_BaseTable<ColumnTitles>;

    public constructor(page: Page) {
        this._page = page;
        const locator = this._page.locator("#maincontent");
        this.Add = new Button(locator.getByRole("button", { name: "Add" }));
        this.Table = new Legacy_BaseTable<ColumnTitles>(locator.locator("#supplierstable"));
    }
}
