import { Locator } from "playwright";
import { RowQuery } from "../../../../base/baseTable";
import { Legacy_BaseTable } from "../../../../base/legacy/legacy_BaseTable";

export type titles = 'ID' |'Name' |'Price Inclusive' |'Mode' |'Options';
export class TaxRules_Table extends Legacy_BaseTable<titles>{

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

    public async GetTaxByIndex(option:{rowIndex: number}): Promise<{ID: string, Name: string, PriceInclusive: string, Mode: string, Options: string}>{
        const rowLocator: Locator = await this.GetRowByIndex(option);
        return {
            ID: await rowLocator.locator("td:nth-of-type(1)").innerText(),
            Name: await rowLocator.locator("td:nth-of-type(2)").innerText(),
            PriceInclusive: await rowLocator.locator("td:nth-of-type(3)").innerText(),
            Mode: await rowLocator.locator("td:nth-of-type(4)").innerText(),
            Options: await rowLocator.locator("td:nth-of-type(5)").innerText()
        };
    }
}