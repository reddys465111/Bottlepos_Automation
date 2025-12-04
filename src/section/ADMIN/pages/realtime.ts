import { Locator, Page } from "@playwright/test"

export class Realtime {
    private _locator: Locator;
    
    constructor(page: Page){
        this._locator=page.locator('#maincontent')
        
    }

    public async getHeader(): Promise<string>{
        return await this._locator.locator('.page-header').textContent() ?? '';
    }
}