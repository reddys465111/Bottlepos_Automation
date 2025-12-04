import { Locator, Page } from "@playwright/test";

export class Processing {
    private _locator: Locator;

    constructor(locator: Locator) {
        this._locator = locator.locator('[id*=_processing]');
    }

    public async isVisible(): Promise<boolean> {
        return await this._locator.isVisible({timeout: 12000});
    }

    public async waitForHidden(): Promise<void> {
        await this._locator.waitFor({state: 'hidden', timeout: 12000});
    }

    public async waitForVisible(): Promise<void> {
        await this._locator.waitFor({state: 'visible', timeout: 12000});
    }
}