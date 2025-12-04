import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";
import { RowQuery } from "../../../../../base/baseTable";


export type titles = 'ID' |'Name' |'Options';

export class Table_ManageGroupCategory extends BaseTable<titles>{

    constructor(locator: Locator){
        super(locator)
  
    }

    public async Edit(...rowQuery: RowQuery<titles>[]): Promise<void>{
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(1)").click();
    }
    public async Delete(...rowQuery: RowQuery<titles>[]): Promise<void>{
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(2)").click();
    }

}