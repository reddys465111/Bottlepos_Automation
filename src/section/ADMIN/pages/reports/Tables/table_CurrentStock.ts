import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type titles = 'Name' |'Supplier' |'Rank' | 'Stock Qty' |'Price' |'Cost' | 'Stock Value' |'Stock Cost' | 'Margin';

export class Table_CurrentStock extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}