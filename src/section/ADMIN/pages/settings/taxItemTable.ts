import { Locator } from "playwright";
import { Legacy_BaseTable, RowQuery } from "../../../../base/legacy/legacy_BaseTable";
import { Button } from "../../../../objects/button";

export type titles = 'ID' | 'Name' | 'Type' | 'Value' | 'Options';

export class TaxItems_Table extends Legacy_BaseTable<titles>{

    constructor(locator: Locator){
        super(locator);
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