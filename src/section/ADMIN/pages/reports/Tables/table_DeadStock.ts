import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type titles = 'Name' |'Supplier' |'Location' | 'Stock Qty' |'Price' |'Cost' | 'Stock Value' |'Stock Cost' | 'Margin';

export class Table_DeadStock extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }
     // Get total number of rows in the table
  async getTableRowCount(): Promise<number> {
  const info = this._locator.page().locator('#dead-stock-report_info');
  const rows = this._locator.page().locator('#dead-stock-report tbody tr');
  return await rows.count();
}


}