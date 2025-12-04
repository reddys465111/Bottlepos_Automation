import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";
export type titles = 'Name'	| 'Sale Qty' | 'Price'	| 'Promotion Discount'	| 'Outlet Multi Qty' | 'Outlet Multi Discount'	| 'Manufacture Multi Qty' | 'Manufacture Multi Discount' ;

export class Table_ScanDataReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}


