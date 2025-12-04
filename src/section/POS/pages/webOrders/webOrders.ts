import { Page } from "@playwright/test";

export class WebOrders {
    private _page: Page
    constructor(page: Page){
        this._page = page;
    }

    public async Click(): Promise<void> {
        await this._page.getByRole('link', {name: 'WebOrders'}).click();
    }
}