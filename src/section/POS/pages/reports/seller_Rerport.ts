import { Page } from "@playwright/test";
import { BaseTable } from "../../../../base/baseTable";

export type Columns_SellerReport = "User" | "Sales" | "Voids" | "Refunds" | "Balance";
export class SellerReport {

    private _page: Page;
    public Table: BaseTable<Columns_SellerReport>;

    constructor(page: Page) {
        this._page = page;
        this.Table  = new BaseTable<Columns_SellerReport>(this._page.getByTestId('seller-report-table'));
    }

    public async Click(): Promise<void> {
        await this._page.getByRole('button', { name: "Seller Report"}).click();
    }

}