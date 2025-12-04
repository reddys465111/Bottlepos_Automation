import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";
export type titles = 'Name' |'# Sales' |'Total';

export class Table_Summary extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
    }
}