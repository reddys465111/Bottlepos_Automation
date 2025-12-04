import { Locator, Page } from "@playwright/test";

export class Loader {
    private _locator: Locator;

    constructor(page: Page) {
        this._locator = page.locator('#loader');
    }

    public async isVisible(): Promise<boolean> {
        return await this._locator.isVisible();
    }

    public async waitForHidden(): Promise<void> {
        await this._locator.waitFor({state: 'hidden', timeout: 5000});
    }

    public async waitForVisible(): Promise<void> {
        await this._locator.waitFor({state: 'visible', timeout: 5000});
    }
}