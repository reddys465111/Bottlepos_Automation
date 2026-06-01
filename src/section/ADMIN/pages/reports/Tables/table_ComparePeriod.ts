import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type titles = '' | '#Transactions' | 'Amount' | '#Transactions' | 'Amount' | 'Transactions' | 'Amount';

export class Table_ComparePeriod extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }
  // Get total number of visible rows in the current table page
async getTableRowCount(): Promise<number> {
    const info = this._locator.page().locator('#summary-report_info');
    const rows = this._locator.page().locator('#summary-report tbody tr');

    await info.waitFor({ state: 'visible' });

    await rows.first().waitFor({ state: 'visible' }).catch(() => {});

    return await rows.count();
}


}