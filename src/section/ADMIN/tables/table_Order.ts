import { Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
import { RowQuery } from "../../../base/baseTable";

export type Titles = 'ID' | 'Order Number' | 'Order Total' | 'Supplier' | 'Order Date';

export class Table_Order extends BaseTable<Titles> {

    constructor(locator: Locator) {
        super(locator);
    }

    public async Edit(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        let rowLocator: Locator;
 
        // If no filter passed, select the first row
        if (rowQuery.length === 0) {
            rowLocator = this._locator.locator("tbody tr:nth-of-type(1)");
        } else {
            rowLocator = await this.GetRow(...rowQuery);
        }
 
        await rowLocator.waitFor({ state: 'visible', timeout: 5000 });
        await rowLocator.locator(".action-buttons a i[title='Edit Order']").click();
    }
 
    public async Delete(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        let rowLocator: Locator;
        // If no filter passed, select the first row
        if (rowQuery.length === 0) {
            rowLocator = this._locator.locator("tbody tr:nth-of-type(1)");
        } else {
            rowLocator = await this.GetRow(...rowQuery);
 
        }
        await rowLocator.waitFor({ state: 'visible', timeout: 5000 });
        await rowLocator.locator(".action-buttons a i[title='Remove Order']").click();  // Delete button
    }
 
    // View order history function
    public async History(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a[title='Order History']").click();  // History button
    }

    // Export to receive order function
    public async Export(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a[title='Export to Receive']").click();  // Export button
    }
}