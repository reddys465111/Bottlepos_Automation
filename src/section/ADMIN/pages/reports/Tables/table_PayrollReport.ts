import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Staff Name' |'Clock In' | 'Clock Out' |'Total' ;

export class Table_PayrollReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
    }

}