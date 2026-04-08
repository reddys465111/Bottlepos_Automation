import { Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
import { RowQuery } from "../../../base/baseTable";


export type titles = 'ID' | 'Name' | '# Items' | 'Options';

export class Table_Suppliers extends BaseTable<titles> {

    constructor(locator: Locator) {
        super(locator);
    }

    // Method to Edit Supplier
    public async Edit(...rowQuery: RowQuery<titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(1)").click(); // Edit button
    }

    // Method to Delete Supplier
    public async Delete(...rowQuery: RowQuery<titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(2)").click(); // Delete button
    }

    // Method to View Items in Supplier
    public async ViewItems(...rowQuery: RowQuery<titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator("td:nth-of-type(3) a").click(); // Click on the number of items
    }
}
