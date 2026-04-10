import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Code' |'Date' ;

export class Table_ItemNotFound extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}