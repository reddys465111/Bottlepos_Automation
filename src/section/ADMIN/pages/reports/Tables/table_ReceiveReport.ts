import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Supplier' |'Items' | 'Cases' |'Bottles' |'Invoice Total' | 'Total Cost' | 'Total Price' | 'Margin' | 'Markup' ;

export class Table_ReceiveReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }
}