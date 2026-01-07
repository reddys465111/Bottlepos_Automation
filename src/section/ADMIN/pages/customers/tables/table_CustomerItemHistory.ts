import { type Locator } from "@playwright/test";
import { Legacy_BaseTable } from "../../../../../base/legacy/legacy_BaseTable";

export type ColumnTitles = "Select" | "Item Name" | "Description" | "Qty";

export class table_CustomerItemHistory extends Legacy_BaseTable<ColumnTitles> {

    constructor(locator: Locator) {
        super(locator, locator.locator("tbody"), locator.locator("thead"));
    }

    /**
     * Get row by index
     */
    private getRowBy(option: { rowIndex: number }): Locator {
        return this._locator.locator("tbody tr").nth(option.rowIndex - 1);
    }

    /**
     * Select checkbox for a given row
     */
    public async selectRow(option: { rowIndex: number }): Promise<void> {
        const row = this.getRowBy({ rowIndex: option.rowIndex });
        await row.locator('input.dt-select-cb').check();
    }

    /**
     * Verify column header is visible
     */
    public async isColumnVisible(option: { column: ColumnTitles }): Promise<boolean> {
        return await this._locator
            .locator("thead th")
            .filter({ hasText: option.column })
            .first()
            .isVisible();
    }

    /**
     */
    /**
 * 
 */
    public async ItemExist(): Promise<{ isValid: boolean; message?: string }> {
        const exists = (await this._locator.locator("tbody tr").count()) > 0;

        if (!exists) {
            return {
                isValid: false,
                message: "No Sales under customer",
            };
        }

        return { isValid: true };
    }


    /**
     *
     */
    public async getItemQty(option: { itemName: string }): Promise<string | null> {
        const rows = this._locator.locator("tbody tr");

        const row = rows.filter({
            has: this._locator
                .locator("td")
                .nth(1)
                .filter({ hasText: option.itemName }),
        }).first();

        if (await row.count() === 0) {
            return null;
        }

        return await row.locator("td").nth(3).innerText();
    }
}
