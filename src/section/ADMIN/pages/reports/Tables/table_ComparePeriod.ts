import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type titles = 'Name' | '#Transactions' | 'Amount' | '#Transactions' | 'Amount' | 'Transactions' | 'Amount';

export class Table_ComparePeriod extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}