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
    // public async editGroup(option: { rowIndex: number }): Promise<void> {
    //     const rowLocator = this.getRowByIndex({ rowIndex: option.rowIndex });
    //     await rowLocator.locator('a[title="Edit"]').click();
    // }
   public async editGroup(): Promise<void> {
    const rows = this._locator.locator("#manage_custgroupbody tr");
    const rowCount = await rows.count();

    let highestId = -1;
    let latestRowIndex = -1;

    for (let i = 1; i <= rowCount; i++) {
        const row = rows.nth(i - 1);
        const idText = await row.locator("td").first().textContent();

        const id = Number(idText?.trim());
        if (!isNaN(id) && id > highestId) {
            highestId = id;
            latestRowIndex = i;
        }
    }

    if (latestRowIndex === -1) {
        throw new Error("No rows found in Customer Groups table.");
    }

    const rowLocator = this.getRowByIndex({ rowIndex: latestRowIndex });

    // Force click to make sure it actually clicks
    await rowLocator.locator('i[title="Edit"]').click({ force: true });
}



    /**
     * Click the Delete button for a specific row.
     * @param option Row index to delete.
     * @example await this.deleteGroup({rowIndex: 1});
     */
    public async deleteGroup(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.getRowByIndex({ rowIndex: option.rowIndex });
        await rowLocator.locator('i[title="Remove"]').click();
    }
//     public async deleteGroup(): Promise<void> {
//     const rows = this._locator.locator("#manage_custgroupbody tr");
//     const rowCount = await rows.count();

//     let highestId = -1;
//     let latestRowIndex = -1;

//     for (let i = 0; i < rowCount; i++) {
//         const row = rows.nth(i);
//         const idText = await row.locator("td").first().textContent();
//         const id = Number(idText?.trim());

//         if (!isNaN(id) && id > highestId) {
//             highestId = id;
//             latestRowIndex = i + 1; // because getRowByIndex is 1-based
//         }
//     }

//     if (latestRowIndex === -1) {
//         throw new Error("No rows found in Customer Groups table.");
//     }

//     const rowLocator = this.getRowByIndex({ rowIndex: latestRowIndex });

//     // Force click to ensure delete icon is clicked
//     await rowLocator.locator('i[title="Remove"]').click({ force: true });
// }

}
