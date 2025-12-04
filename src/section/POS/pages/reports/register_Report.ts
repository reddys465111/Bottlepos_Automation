import { Page } from "@playwright/test";
import { BaseTable } from "../../../../base/baseTable";

export type Columns_RegisterReport = "# Sales" | "Total" ;
export class RegisterReport {
    private _page: Page;
    public Table: BaseTable<Columns_RegisterReport>;

    constructor(page: Page) {
        this._page = page;
        this.Table  = new BaseTable<Columns_RegisterReport>(this._page.getByTestId('register-report-table'));
    }

    public async Click(): Promise<void> {
        await this._page.getByRole('button', { name: "Register Report"}).click();
        await this._page.waitForTimeout(2000);
        await this.Table.WaitUntilVisible();
    }

}
