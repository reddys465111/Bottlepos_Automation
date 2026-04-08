import { type Locator } from "@playwright/test";
import { Legacy_BaseTable } from "../../../../../base/legacy/legacy_BaseTable";

export type ColumnTitles =
  | "Select"
  | "Ref"
  | "Time"
  | "User Name"
  | "Sub Total"
  | "Tax"
  | "Discount"
  | "Total"
  | "Details";

export class table_CustomerTransaction extends Legacy_BaseTable<ColumnTitles> {

    constructor(locator: Locator) {
        super(locator, locator.locator("tbody"), locator.locator("thead"));
    }

    /**
     * Get row by index (1-based)
     */
    private getRowBy(option: { rowIndex: number }): Locator {
        return this._locator.locator("tbody tr").nth(option.rowIndex - 1);
    }

    /**
     * Click Details button for a given row
     */
    public async openDetails(option: { rowIndex: number }): Promise<void> {
        const row = this.getRowBy({ rowIndex: option.rowIndex });
        await row.locator('button[title="Details"]').click();
    }

    /**
     * Select checkbox for a given row
     */
    public async selectRow(option: { rowIndex: number }): Promise<void> {
        const row = this.getRowBy({ rowIndex: option.rowIndex });
        await row.locator('input.dt-select-cb').check();
    }

    /**
     * Verify transaction row exists by text
     */
   public async isColumnVisible(option: { column: ColumnTitles }): Promise<boolean> {
    return await this._locator
        .locator("thead th")
        .filter({ hasText: option.column })
        .first()
        .isVisible();
}

}
