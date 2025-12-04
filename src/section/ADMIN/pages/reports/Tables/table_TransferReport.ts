import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Item Name' |'Category' | 'Transfer From' |'Transfer To' |'Created' | 'Invoice Total' | 'Invoice Number' | 'Quantity' | 'Price' | 'Cost' | 'Total Cost' ;

export class Table_TransferReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}