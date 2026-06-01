import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Customer Name' | 'Item Name' | 'Stock Code' | '# Sold Category' | 'Supplier' | 'Stock Level' | 'Price Cost' | 'Profit Margin' | 'Markup Discounts' | 'Tax' | 'Bottle Deposit' | 'Total' | '# Refunded' | 'Total' | 'Balance' ;

export class Table_SalesReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }
     async getTableRowCount(): Promise<number> {
        const info = this._locator.page().locator('#item-sales-report_info');
        const rows = this._locator.page().locator('#item-sales-report tbody tr');

        // Wait for any DataTables processing to complete
        const processingElements = await this.Processing.all();
        await Promise.all(processingElements.map(el => el.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {})));

        await info.waitFor({ state: 'visible', timeout: 15000 });
        return await rows.count();
    }


}