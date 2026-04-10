import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Method' |'# Sales' |'Takings' | '# Refunds' |'Refunds' |'#Payout' | 'Payout' |'Balance';

export class Table_TenderReport extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }


}