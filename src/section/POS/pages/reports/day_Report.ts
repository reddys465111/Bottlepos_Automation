import { Page } from "@playwright/test";
import { BaseTable } from "../../../../base/baseTable";

export type Columns_DayReport = "# Sales" | "Total";
export class DayReport {

    private _page: Page;
    public Table: BaseTable<Columns_DayReport>;

    constructor(page: Page) {
        this._page = page;
        this.Table  = new BaseTable<Columns_DayReport>(page.getByTestId('day-report-table'));
    }

    public async Click(): Promise<void> {
        await this._page.getByRole('button', { name: "Day Report"}).click();
    }

}