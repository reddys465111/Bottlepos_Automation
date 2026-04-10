import { Page } from "@playwright/test";
import { BaseTable } from "../../../../base/baseTable";


export type Columns_TakingsCount = "Method" | "# Payments" | "Takings" | "# Refunds" | "Refunds" | "# Payout" | "Payout" | "Balance";
export class TakingsCount {

    private _page: Page;
    public Table: BaseTable<Columns_TakingsCount>;

    constructor(page: Page) {
        this._page = page;
        this.Table  = new BaseTable<Columns_TakingsCount>(this._page.getByTestId('takings-report-table'));
    }

    public async Click(): Promise<void> {
        await this._page.getByRole('button', { name: "Takings Count"}).click();
    }

}