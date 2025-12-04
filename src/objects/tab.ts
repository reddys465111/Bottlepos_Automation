import { type Page, type Locator } from "@playwright/test";


export class Tab {

    _page: Page;
    _locator: Locator;

    constructor(page: Page, tabTitle: string){
        this._page = page;
        this._locator = page.locator(`[data-testid=${tabTitle}-tab]`);
    }

    public async Click(): Promise<void> {
        await this._locator.click();
    }

}