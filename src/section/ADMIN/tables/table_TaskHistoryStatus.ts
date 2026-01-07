import { Locator } from "@playwright/test";
import { BaseTable, RowQuery } from "../../../base/baseTable";

export type historyTitles =
  | 'ID'
  | 'Name'
  | 'Type'
  | 'Total Task'
  | 'Pending Task'
  | 'Update By'
  | 'Due On'
  | 'Update On'
  | 'Notes'
  | 'Status';

export class Table_TaskHistoryStatus extends BaseTable<historyTitles> {

  constructor(locator: Locator) {
    super(locator);
  }
  
 // Get STATUS of Task List from table
  public async getStatus(): Promise<string> {

    const emptyRow = this._locator.locator('tbody tr td.dataTables_empty');

    // If table is empty
    if (await emptyRow.isVisible()) {
        return 'No data available in table';
    }
    const row = this._locator.locator('tbody tr').first();
    await row.waitFor({ state: 'attached', timeout: 10000 });

    return (await row.locator('td:nth-child(11)').innerText()).trim();
}


 
}
