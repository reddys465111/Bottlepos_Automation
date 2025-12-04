import { Locator } from "@playwright/test";
import { BaseTable, RowQuery } from "../../../base/baseTable";

// Define the columns in the table
export type Titles = 'Date' | 'Transfer from' | 'Transfer to' | 'Items' | 'Cases' | 'Bottles' | 'Invoice Total' | 'Margin' | 'Total Cost' | 'Total Price' | 'Invoice Number' | 'Confidence' | 'Finalize' | 'Paid';

export class Table_Transfer extends BaseTable<Titles> {

    constructor(locator: Locator) {
        super(locator);
    }

    // Edit function for editing a transfer row
    public async Edit(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a.blue").click(); // Blue edit button
    }

    // View transfer history function
    public async History(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a.grey").click(); // Grey history button
    }

}

