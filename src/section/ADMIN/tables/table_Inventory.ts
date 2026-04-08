import { Locator, Page } from "@playwright/test";
import { BaseTable, RowQuery } from "../../../base/baseTable";

import { Table_Pagination } from "./table_Pagination";

export type titles =
    | 'Select'
    | 'Name'
    | 'Stock Number'
    | 'Supplier'
    | 'Location'
    | 'Qty'
    | 'Options';

export class Table_Inventory extends BaseTable<titles> {
    public Pagination: Table_Pagination;


    constructor(locator: Locator) {
        super(locator);
        this.Pagination = new Table_Pagination(locator);
    }

    // Select checkbox
    public async CheckItem(...rowQuery: RowQuery<titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        const page = rowLocator.page();
        
        if (page && page.isClosed()) {
            throw new Error();
        }
        
        await rowLocator.locator(".ace.dt-select-cb").waitFor();
        
        try {
            await rowLocator.locator(".ace.dt-select-cb").hover();
        } catch (err) {
            if (page && page.isClosed()) {
                throw new Error();
            }
            throw err;
        }
        
        try {
            await rowLocator.locator(".ace.dt-select-cb").click();
        } catch (err) {
            if (page && page.isClosed()) {
                throw new Error();
            }
            throw err;
        }
    }

    //  Edit Stock
    public async Edit(...rowQuery: RowQuery<titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator('.action-buttons a.blue').click();
    }

    // Transfer Stock
    public async Transfer(...rowQuery: RowQuery<titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator('.action-buttons a.green').click();
    }

    //  Stock History
    public async ItemHistory(...rowQuery: RowQuery<titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator('.action-buttons a.grey').click();
    }

    // Get total number of rows in the table
  async getTableRowCount(): Promise<number> {
  const info = this._locator.page().locator('#stocktable_info');
  const rows = this._locator.page().locator('#stocktable tbody tr');

  await info.waitFor({ state: 'visible' });
  return await rows.count();
}




}
