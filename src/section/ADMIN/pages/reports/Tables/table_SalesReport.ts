import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Customer Name' | 'Item Name' | 'Stock Code' | '# Sold Category' | 'Supplier' | 'Stock Level' | 'Price Cost' | 'Profit Margin' | 'Markup Discounts' | 'Tax' | 'Bottle Deposit' | 'Total' | '# Refunded' | 'Total' | 'Balance' ;

export class Table_SalesReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}