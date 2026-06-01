import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type titles = 'Category' | 'Date' | 'Payments' | 'Amount';

export class Table_Expenses extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }
   public async GetTotals() {
  const footer = this._locator.locator('tfoot tr');
  await footer.waitFor({ state: 'visible', timeout: 15000 });
  const headers = footer.locator('th');
  // Payments 
  const paymentsText = await headers.nth(1).innerText();
  // Amount
  const amountText = await headers.nth(2).innerText();
  const [totalPayments, grandPayments] = paymentsText.split('\n');
  const [totalAmount, grandAmount] = amountText.split('\n');
  return {
    totalPayments: totalPayments.trim(),
    grandPayments: grandPayments.trim(),
    totalAmount: totalAmount.trim(),
    grandAmount: grandAmount.trim()
    
  };
}
 // Get total number of rows in the table
    async getTableRowCount(): Promise<number> {
        const info = this._locator.page().locator('#expense-report_info');
        const rows = this._locator.page().locator('#expense-report tbody tr');
        return await rows.count();
    }


}