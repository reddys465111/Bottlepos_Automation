import { Locator } from "@playwright/test";
import { BaseTable, RowQuery } from "../../../base/baseTable";

// Define the columns in the table
export type Titles = 
  | '#' | 'Stock Code' | 'Supplier Name' | 'Name' | 'ItemRank' | 'Qty on Hand' | 'Transfer Case' | 'Unit Per Case' | 'Transfer Bottles' | 'Total Cost' | 'Cost Per Bottle' | 'Price' | 'Margin' | 'Margin Change' | 'Vendor Item No.';

export class Table_TransferStock extends BaseTable<Titles> {

  constructor(locator: Locator) {
    super(locator);
  }
// Method to edit an existing item
public async EditItem(...rowQuery: RowQuery<Titles>[]): Promise<void> {
  const rowLocator: Locator = await this.GetRow(...rowQuery);
  await rowLocator.locator(".action-btns a .icon-pencil").click();  // Edit item button
}

// Method to view the stock history of an item
public async ViewItemHistory(...rowQuery: RowQuery<Titles>[]): Promise<void> {
  const rowLocator: Locator = await this.GetRow(...rowQuery);
  await rowLocator.locator(".action-btns a.grey .icon-time").click();  // Item history button
}

// Method to switch an item in the table
public async SwitchItem(...rowQuery: RowQuery<Titles>[]): Promise<void> {
  const rowLocator: Locator = await this.GetRow(...rowQuery);
  await rowLocator.locator(".action-btns a.grey .icon-exchange").click();  // Switch item button
}

// Method to remove an item from the invoice
public async RemoveItem(...rowQuery: RowQuery<Titles>[]): Promise<void> {
  const rowLocator: Locator = await this.GetRow(...rowQuery);
  await rowLocator.locator(".action-btns a.red .icon-remove").click();  // Remove item button
}

// Method to print the label for the item
public async PrintLabel(...rowQuery: RowQuery<Titles>[]): Promise<void> {
  const rowLocator: Locator = await this.GetRow(...rowQuery);
  await rowLocator.locator(".action-btns a.grey .icon-tag").click();  // Print label button
  }
}
