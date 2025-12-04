import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type titles = 'Category' | 'Date' | 'Payments' | 'Amount';

export class Table_Expenses extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}