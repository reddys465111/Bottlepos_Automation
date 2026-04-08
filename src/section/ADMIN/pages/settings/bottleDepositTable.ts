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
    await rowLocator.first() .locator(".action-buttons a i[title='Edit Item Deposit']").click();
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
    await processing.waitFor({ state: "visible", timeout: 2000 }).catch(() => { });
    await processing.waitFor({ state: "hidden" });
  }
 
  public Pagination = {IsVisible: async (timeout = 3000): Promise<boolean> => {
      try {
        await this._wrapper
          .locator("#item-deposit-table_paginate")
          .waitFor({ state: "visible", timeout });
        return true;
      } catch {
        return false;
      }
    },
 
    ClickPage: async (pageNumber: number,options?: { strict?: boolean }): Promise<void> => {
      const strict = options?.strict !== false;
      const pageLink = this._wrapper
        .locator("#item-deposit-table_paginate li a")
        .filter({ hasText: new RegExp(`^${pageNumber}$`) });
 
      if (strict) {
        await pageLink.first().click();
        await this.WaitForTableRedraw();
        return;
      }
 
      if (await pageLink.count()) {
        await pageLink.first().click();
        await this.WaitForTableRedraw();
      }
    },
 
    ClickNext: async (options?: { strict?: boolean }): Promise<void> => {
      const strict = options?.strict !== false;
 
      const next = this._wrapper.locator("#item-deposit-table_next a");
 
      if (strict) {
        await next.click();
        await this.WaitForTableRedraw();
        return;
      }
 
      if (await next.isVisible()) {
        await next.click();
        await this.WaitForTableRedraw();
      }
    },
 
    ClickPrevious: async (options?: { strict?: boolean }): Promise<void> => {
      const strict = options?.strict !== false;
 
      const prev = this._wrapper.locator("#item-deposit-table_previous a");
 
      if (strict) {
        await prev.click();
        await this.WaitForTableRedraw();
        return;
      }
 
      if (await prev.isVisible()) {
        await prev.click();
        await this.WaitForTableRedraw();
      }
    },
 
    GetCurrentPage: async (options?: { strict?: boolean }): Promise<number> => {
      const strict = options?.strict !== false;
 
      const active = this._wrapper.locator(
        "#item-deposit-table_paginate li.active a"
      );
 
      if (strict) {
        const text = await active.innerText();
        return parseInt(text.trim(), 10);
      }
 
     
      if (await active.count()) {
        return parseInt((await active.innerText()).trim(), 10);
      }
 
      return 1;
    }
  };
 
}
 