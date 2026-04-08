import { Locator } from "playwright";

export class BaseTaxes_Location {

    private _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
    }

    private async getRow(rowIndex: number): Promise<Locator>{
        return this._locator.locator(`tr`).nth(rowIndex-1);
    }
    
    public async selectLocation(option: {rowIndex: number, location: string}): Promise<void>{
        const row = await this.getRow(option.rowIndex);
        await row.locator(`.taxlocals-locid`).selectOption(option.location);
    }

    public async selectTax(option: {rowIndex: number, tax: string}): Promise<void>{
        const row = await this.getRow(option.rowIndex);
        await row.locator(`.taxlocals-taxid`).selectOption(option.tax);
    }

    public async deleteTax(option: {rowIndex: number}): Promise<void>{
        const row = await this.getRow(option.rowIndex);
        await row.locator(`.action-buttons a:nth-of-type(1)`).click();
    }

    public async rowCount(): Promise<number>{
        return await this._locator.locator(`tr`).count();
    }

    public async rowExists(option: {taxLocation?: string, taxTitle?: string}): Promise<boolean>{
        const taxTitleState = await this._locator.locator(`tr`).locator(`td:nth-of-type(2)`).filter({ hasText: option.taxTitle }).count() > 0;
        const taxLocationState = await this._locator.locator(`tr`).locator(`td:nth-of-type(1)`).filter({ hasText: option.taxLocation }).count() > 0;
        return taxTitleState && taxLocationState;
    }

}