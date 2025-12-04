import { Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";

// Define the columns in the table
export type Titles = 'Date' | 'Supplier' | 'Invoice Number' | 'Item Name' | 'Received Qty' | 'Received Case' | 'Invoice Total' | 'Cost' | 'Price' | 'Margin';

export class Table_ViewBySupplier extends BaseTable<Titles> {
  
  constructor(locator: Locator) {
    super(locator);
  }

  // Supplier group extraction method
  public async GetSupplierGroups(): Promise<string[]> {
  
    await this._locator.page().waitForSelector('tr.group-row.group-start', { timeout: 5000 });
    const groupRows = this._locator.locator('tbody tr.group-row.group-start');
    const count = await groupRows.count();
  
    const supplierGroups: string[] = [];
  
    for (let i = 0; i < count; i++) {
      const fullText = (await groupRows.nth(i).innerText()).trim();
      const supplierName = fullText.split(" - ")[0]?.trim() || "Unknown";
  
      supplierGroups.push(supplierName);
    }
    return supplierGroups;
  }
}
