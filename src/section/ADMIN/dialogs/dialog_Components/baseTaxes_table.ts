import { Locator } from "playwright";

export class BaseTaxes_Table {

    private _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
    }

    private async getRow(rowIndex: number): Promise<Locator>{
        return this._locator.locator(`tr`).nth(rowIndex-1);
    }

    public async selectTax(option: {rowIndex: number, tax: string}): Promise<void>{
        const row = await this.getRow(option.rowIndex);
        await row.locator('.taxbase-id').selectOption(option.tax);
    }

    public async deleteTax(option: {rowIndex: number}): Promise<void>{
        const row = await this.getRow(option.rowIndex);
        await row.locator(`.action-buttons a:nth-of-type(1)`).click();
    }

    public async rowCount(): Promise<number>{
        return await this._locator.locator(`tr`).count();
    }

    public async rowExists(option: {taxTitle: string}): Promise<boolean>{
        return await this._locator.locator(`tr`).locator(`td:nth-of-type(1)`).filter({ hasText: option.taxTitle }).count() > 0;
    }

}