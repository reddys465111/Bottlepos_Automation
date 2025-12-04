import { Locator } from "@playwright/test";
import { BaseTable, RowQuery } from "../../../base/baseTable";


export type Titles = 'ID' | 'Invoice Number' | 'Invoice Total' | 'Name' | 'Stockcode' | 'Total Cost' | 'Total Price' | 'Margin' | 'Total' | 'Category' | 'Supplier' | 'Date';

export class Table_ViewByItems extends BaseTable<Titles> {

    constructor(locator: Locator) {
        super(locator);
    }

    public async Edit(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(1)").click();
    }

    public async Delete(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(2)").click();
    }
}
