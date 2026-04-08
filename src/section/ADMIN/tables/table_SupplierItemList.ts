import { Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
import { RowQuery } from "../../../base/baseTable";

export type Titles = | 'ID'|'Name';
  

export class table_SupplierItemList extends BaseTable<Titles> {

  constructor(locator: Locator) {
    super(locator);
  }

}
