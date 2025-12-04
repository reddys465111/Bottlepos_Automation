import { Locator } from "@playwright/test";
import { BaseTable, RowQuery } from "../../../base/baseTable";

export type titles = 'ID' |'Name' |'Group' |'# items' |'Options';

export class Table_Categories extends BaseTable<titles>{

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