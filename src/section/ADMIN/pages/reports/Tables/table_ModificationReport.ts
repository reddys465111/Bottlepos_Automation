import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Item' | 'Username'	| 'Type' | 'Amount'	| 'Cost' | 'Price' | 'Qty on Hand' | 'DT' ;

export class Table_ModificationReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}