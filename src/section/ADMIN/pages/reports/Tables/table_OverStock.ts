import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Name' |'Supplier' |'Location' | 'Stock Qty' |'Price' |'Cost' | 'Stock Value' |'Stock Cost' | 'Margin' | 'Reorder Point' ;

export class Table_OverStock extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
    }

      // Get total number of rows in the table
  async getTableRowCount(): Promise<number> {
  const info = this._locator.page().locator('#over-stock-report_info');
  const rows = this._locator.page().locator('#over-stock-report tbody tr');
  return await rows.count();
}

}