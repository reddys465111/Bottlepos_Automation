import { Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
import { RowQuery } from "../../../base/baseTable";

export type titles =
  | 'ID'
  | 'Name'
  | 'Type'
  | 'Schedule Date'
  | 'Time'
  | 'Task Notify'
  | 'Total Tasks #'
  | 'Incompleted Tasklists #'
  | 'Status'
  | 'Options';

export class Table_TasksList extends BaseTable<titles> {

  constructor(locator: Locator) {
    super(locator);
  }
    // Wait for a specific task name to appear in the table
  public async waitForTaskName(taskName: string): Promise<void> {
    await this._locator
      .locator('tbody tr td:nth-child(3)') // Name column
      .filter({ hasText: taskName })
      .first()
      .waitFor({ state: 'visible' });
  }
   
  public async EditTask(): Promise<void> {
    const row = this._locator.locator('tbody tr').first();
    await row.waitFor({ state: 'attached', timeout: 10000 });

    await row.locator('a.blue').click({ force: true });
}


  // View Task List History
  public async TaskHistory(): Promise<void> {
    const row = this._locator.locator('tbody tr').first();
    await row.waitFor({ state: 'attached', timeout: 10000 });
    await row.locator('a.grey').click();
  }

 
  // Delete Task List
  public async DeleteTask(): Promise<void> {
    const row = this._locator.locator('tbody tr').first();
    await row.waitFor({ state: 'attached', timeout: 10000 });
    await row.locator('a.red').click();
  }
}
