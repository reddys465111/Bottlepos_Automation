import { type Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";
import { Legacy_BaseTable } from "../../../../../base/legacy/legacy_BaseTable";

export type ColumnTitles = "ID" | "Name" | "Email" | "Mobile" | "DOB" | "Zipcode" | "Points" | "# of Sales" | "SMS Promotions";
export class Table_Customers extends Legacy_BaseTable<ColumnTitles> {
    constructor(locator: Locator) {
        super(locator, locator.locator('.dataTables_scrollBody'), locator.locator('.dataTables_scrollHead'));
    }

    /**
     * Select and return the desired customer's row by index.
     * @param option This parameter contains the row index (starting from 1).
     * @example await this.GetRowByIndex({rowIndex: 1});
     */
    private GetRowBy(option: { rowIndex: number }): Locator {
        return this._locator.locator(`tr:nth-of-type(${option.rowIndex})`);
    }

    /**
     * Click the "Edit" button for a given row.
     * @param option This parameter contains the row index (starting from 1).
     * @example await this.EditCustomer({rowIndex: 1});
     */
    public async EditCustomer(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.GetRowBy({ rowIndex: option.rowIndex });
        await rowLocator.locator('a.blue [title="Edit"]').click();
    }

    /**
     * Click the "Delete" button for a given row.
     * @param option This parameter contains the row index (starting from 1).
     * @example await this.DeleteCustomer({rowIndex: 1});
     */
    public async DeleteCustomer(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.GetRowBy({ rowIndex: option.rowIndex });
        await rowLocator.locator('a.red [title="Delete"]').click();
    }

    /**
     * Click the "Customer History" button for a given row.
     * @param option This parameter contains the row index (starting from 1).
     * @example await this.CustomerHistory({rowIndex: 1});
     */
    public async CustomerHistory(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.GetRowBy({ rowIndex: option.rowIndex });
        await rowLocator.locator('a.grey [title="Customer History"]').click();
    }
}
