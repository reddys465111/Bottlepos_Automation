import { type Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type ColumnTitles = "Name" | "Email" | "Mobile" | "Actions";

export class Table_SearchAndSelectCustomers extends BaseTable<ColumnTitles> {
    [x: string]: any;

    constructor(locator: Locator) {
        super(locator);
    }

    /**
     * Select a customer by row index.
     * @param option The row index of the customer to select (starts at 1).
     * @example await this.selectCustomer({ rowIndex: 1 });
     */
    public async selectCustomer(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.getRowBy({ rowIndex: option.rowIndex });
        await rowLocator.locator('input[type="checkbox"]').click();
    }

    /**
     * Add a customer to the group using the "Add" icon.
     * @param option The row index of the customer to add (starts at 1).
     * @example await this.addCustomer({ rowIndex: 1 });
     */
    public async addCustomer(option: { rowIndex: number }): Promise<void> {
        const rowLocator = this.getRowBy({ rowIndex: option.rowIndex });
        await rowLocator.locator('a[title="Add Item"]').click();
    }
}
