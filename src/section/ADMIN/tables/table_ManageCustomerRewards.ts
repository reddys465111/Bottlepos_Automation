import { type Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
 
export type ColumnTitles = "ID" | "Name" | "Amount" | "Offer Type" | "Points";
export class Table_ManageCustomerRewards extends BaseTable<ColumnTitles> {
 
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
   
 public async editReward(): Promise<void> {
    const editIcons = this._locator.locator('i[title="Edit"]');
 
    // Wait for the real actionable element
    await editIcons.first().waitFor({ state: "attached" });
 
    const count = await editIcons.count();
    if (count === 0) {
        throw new Error("No rewards available to edit.");
    }
 
    // Click last reward edit icon
    await editIcons.nth(count - 1).click();
}
 
 
 
 
    /**
     * Click the Delete button for a specific row.
     * @param option Row index to delete.
     * @example await this.deleteGroup({rowIndex: 1});
     */
 
    public async deleteReward(): Promise<void> {
    const rows = this._locator.locator("tr");
 
    // wait until table has at least one visible row
    await rows.first().waitFor({ state: "visible", timeout: 5000 });
 
    const rowCount = await rows.count();
    if (rowCount === 0) {
        throw new Error("No rows found in rewards table.");
    }
 
    const lastRow = rows.nth(rowCount - 1);
    await lastRow.locator("i[title='Delete']").click();
}
 
 
}
 