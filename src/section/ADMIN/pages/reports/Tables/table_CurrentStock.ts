import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type titles = 'Name' |'Supplier' |'Rank' | 'Stock Qty' |'Price' |'Cost' | 'Stock Value' |'Stock Cost' | 'Margin';

export class Table_CurrentStock extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }

      // Get total number of visible rows in the current table page
async getTableRowCount(): Promise<number> {
    const info = this._locator.page().locator('#current-stock-report_info');
    const rows = this._locator.page().locator('#current-stock-report tbody tr');

    // Wait for any DataTables processing to complete
    const processingElements = await this.Processing.all();
    await Promise.all(processingElements.map(el => el.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {})));

    await info.waitFor({ state: 'visible', timeout: 15000 });

    await rows.first().waitFor({ state: 'visible' }).catch(() => {});

    return await rows.count();
}


}