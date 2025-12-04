import { type Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type ColumnTitles = "ID" | "Name" | "# Of Customers" | "Actions";
export class Table_ManageCustomerGroups extends BaseTable<ColumnTitles> {

    constructor(locator: Locator) {
        super(locator);
    }

    /**
     * Select a row by index.
     * @param option Row index (starting from 1).
     * @example await this.getRowByIndex({rowIndex: 1});
     */
    private getRowByIndex(option: { rowIndex: number }): Locator {
        return this._locator.locator(`tr:nth-of-type(${option.rowIndex})`);
    }

    /**
     * Click the Edit button for a specific row.
     * @param option Row index to edit.
     * @example await this.editGroup({rowIndex: 1});
     */
    public async editGroup(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.getRowByIndex({ rowIndex: option.rowIndex });
        await rowLocator.locator('a[title="Edit"]').click();
    }

    /**
     * Click the Delete button for a specific row.
     * @param option Row index to delete.
     * @example await this.deleteGroup({rowIndex: 1});
     */
    public async deleteGroup(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.getRowByIndex({ rowIndex: option.rowIndex });
        await rowLocator.locator('a[title="Remove"]').click();
    }
}
