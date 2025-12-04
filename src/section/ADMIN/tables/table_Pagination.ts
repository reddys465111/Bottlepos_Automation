import { Locator } from "@playwright/test";

export class Table_Pagination {
    public _locator: Locator;

    constructor(locator: Locator){
        this._locator = locator;
    }

    public async Next(): Promise<void>{
        await this._locator.locator('#itemstable_next').click();
    }

    public async Previous(): Promise<void>{
        await this._locator.locator('#itemstable_previous').click();
    }
    
    public async GoToPage(page: number): Promise<void>{
        await this._locator.locator(`[data-dt-idx="${page}"]`).click();
    }
    public async More(): Promise<void>{
        await this._locator.locator('#itemstable_ellipsis').click();
    }

    public async Last(): Promise<void>{
        //get the last element with the data-dt-idx attribute
        const lastPage = await this._locator.locator(` li:not([id=itemstable_next]):not([id=itemstable_previous]):not([id=itemstable_ellipsis]) [data-dt-idx] `).last();
        await lastPage.click();
    }
}