import { type Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type ColumnTitles = "Name" | "Mobile" | "Email" | "Actions";

export class Table_CustomersInGroup extends BaseTable<ColumnTitles> {
    [x: string]: any;

    constructor(locator: Locator) {
        super(locator);
    }

    /**
     * Remove a customer from the group by row index.
     * @param option The row index of the customer to remove (starts at 1).
     * @example await this.removeCustomer({ rowIndex: 1 });
     */
    public async removeCustomer(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.getRowBy({ rowIndex: option.rowIndex });
        await rowLocator.locator('a[title="Remove Item"]').click();
    }
}
