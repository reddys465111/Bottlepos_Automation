import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Message'	| 'Total Send To#' | 'Faild To#'	| 'Sent On' ;

export class Table_MessageSentHistory extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}
