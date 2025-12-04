import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Name' | 'Opening'	| 'Credit'	| 'Collection'	| 'Closing' ;

export class Table_HouseAccountReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}
