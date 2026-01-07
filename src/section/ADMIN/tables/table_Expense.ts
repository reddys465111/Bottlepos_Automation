import { Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
import { RowQuery } from "../../../base/baseTable";

export type Titles =
  | 'ID'
  | 'Expense Date'
  | 'Category'
  | 'Payment Mode'
  | 'Check Number'
  | 'Amount'
  | 'Vendor'
  | 'Invoice #'
  | 'Type'
  | 'Device'
  | 'User'
  | 'Memo';

export class Table_Expense extends BaseTable<Titles> {

  constructor(locator: Locator) {
    super(locator);
  }

  public async Edit(...rowQuery: RowQuery<Titles>[]): Promise<void> {
    let rowLocator: Locator;

    // If no filter passed, select first row
    if (rowQuery.length === 0) {
      rowLocator = this._locator.locator('tbody tr:nth-of-type(1)');
    } else {
      rowLocator = await this.GetRow(...rowQuery);
    }

    await rowLocator.waitFor({ state: 'visible', timeout: 5000 });
    await rowLocator
      .locator('.action-buttons a i[title="Edit Expense"]')
      .click();
  }

  public async Delete(...rowQuery: RowQuery<Titles>[]): Promise<void> {
    let rowLocator: Locator;

    // If no filter passed, select first row
    if (rowQuery.length === 0) {
      rowLocator = this._locator.locator('tbody tr:nth-of-type(1)');
    } else {
      rowLocator = await this.GetRow(...rowQuery);
    }

    await rowLocator.waitFor({ state: 'visible', timeout: 5000 });
    await rowLocator
      .locator('.action-buttons a i[title="Delete Expense"]')
      .click();
  }
}
