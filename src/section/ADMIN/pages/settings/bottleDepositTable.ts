import { Locator } from "@playwright/test";
import { Legacy_BaseTable, RowQuery } from "../../../../base/legacy/legacy_BaseTable";
 
export type titles = "Id" | "Name" | "Amount" | "Options";
 
export class BottleDeposit_Table extends Legacy_BaseTable<titles> {
  private _table: Locator;
  private _wrapper: Locator;
 
  constructor(locator: Locator) {
    super(locator.locator("#item-deposit-table"));
    this._table = locator.locator("#item-deposit-table");
    this._wrapper = locator.locator("#item-deposit-table_wrapper");
  }
 
  public async Edit(...rowQuery: RowQuery<titles>[]): Promise<void> {
    const rowLocator: Locator = await this.GetRow(...rowQuery);
    await rowLocator.locator(".action-buttons a i[title='Edit Item Deposit']").click();
  }
 
  public async Delete(...rowQuery: RowQuery<titles>[]): Promise<void> {
    const rowLocator: Locator = await this.GetRow(...rowQuery);
    await rowLocator.locator(".action-buttons a i[title='Delete Item Deposit']").click();
    await this.WaitForTableRedraw();
  }
 
  public async IsEditAvailable(...rowQuery: RowQuery<titles>[]): Promise<boolean> {
    const rowLocator: Locator = await this.GetRow(...rowQuery);
    return rowLocator.locator(".action-buttons a i[title='Edit Item Deposit']").isVisible();
  }
 
  public async IsDeleteAvailable(...rowQuery: RowQuery<titles>[]): Promise<boolean> {
    const rowLocator: Locator = await this.GetRow(...rowQuery);
    return rowLocator.locator(".action-buttons a i[title='Delete Item Deposit']").isVisible();
  }
 
  public async IsNotEmpty(): Promise<boolean> {
    const rows = this._table.locator("tbody tr");
    return (await rows.count()) > 0;
  }
 
  public async WaitForTableRedraw(): Promise<void> {
    const processing = this._wrapper.locator("#item-deposit-table_processing");
    await processing.waitFor({ state: "visible", timeout: 2000 }).catch(() => {});
    await processing.waitFor({ state: "hidden" });
  }
 
  public Pagination = {
    IsVisible: async (): Promise<boolean> => {
      return this._wrapper.locator("#item-deposit-table_paginate").isVisible();
    },
    ClickPage: async (pageNumber: number): Promise<void> => {
      await this._wrapper
        .locator(`#item-deposit-table_paginate li a`, { hasText: pageNumber.toString() })
        .click();
      await this.WaitForTableRedraw();
    },
    ClickNext: async (): Promise<void> => {
      await this._wrapper.locator("#item-deposit-table_next a").click();
      await this.WaitForTableRedraw();
    },
    ClickPrevious: async (): Promise<void> => {
      await this._wrapper.locator("#item-deposit-table_previous a").click();
      await this.WaitForTableRedraw();
    },
    GetCurrentPage: async (): Promise<number> => {
      const active = this._wrapper.locator("#item-deposit-table_paginate li.active a");
      const text = await active.innerText();
      return parseInt(text.trim(), 10);
    }
  };
}