import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Method' |'# Sales' |'Takings' | '# Refunds' |'Refunds' |'#Payout' | 'Payout' |'Balance';

export class Table_TenderReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }

    // Get total number of rows in the table
    async getTableRowCount(): Promise<number> {
        const info = this._locator.page().locator('#takings-report_info');
        const rows = this._locator.page().locator('#takings-report tbody tr');

        await info.waitFor({ state: 'visible' });
        return await rows.count();
    }

}