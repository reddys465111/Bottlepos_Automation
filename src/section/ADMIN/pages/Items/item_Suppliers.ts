import { Locator, Page } from "@playwright/test";
import { BaseTable } from "../../../../base/baseTable";
import { Button } from "../../../../objects/button";

export type ColumnTitles = "ID" | "Name" | "Email" | "Mobile" | "Actions";
export class Item_Suppliers {
    private _page: Page;
    public Add: Button;
    public Table: BaseTable<ColumnTitles>;

    public constructor(page: Page) {
        this._page = page;
        const locator = this._page.locator("#maincontent");
        this.Add = new Button(locator.getByRole("button", { name: "Add" }));
        this.Table = new BaseTable<ColumnTitles>(locator.locator("#supplierstable"));
    }
}
    