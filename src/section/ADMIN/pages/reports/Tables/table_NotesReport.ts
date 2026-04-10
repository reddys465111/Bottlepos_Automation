import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type titles = 'Sale Ref Id' |'User' | 'Note' |'Date' ;

export class Table_NotesReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}