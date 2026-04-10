import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Name' |'Supplier' |'Location' | 'Stock Qty' |'Price' |'Cost' | 'Stock Value' |'Stock Cost' | 'Margin' | 'Reorder Point' ;

export class Table_OverStock extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
    }

}