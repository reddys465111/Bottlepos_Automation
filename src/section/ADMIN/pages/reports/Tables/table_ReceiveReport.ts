import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Supplier' |'Items' | 'Cases' |'Bottles' |'Invoice Total' | 'Total Cost' | 'Total Price' | 'Margin' | 'Markup' ;

export class Table_ReceiveReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }

     // Get total number of rows in the table
    async getTableRowCount(): Promise<number> {
        const info = this._locator.page().locator('#receive-report_info');
        const rows = this._locator.page().locator('#receive-report tbody tr');

        await info.waitFor({ state: 'visible' });
        return await rows.count();
    }
}