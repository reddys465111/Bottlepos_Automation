import { Locator, Page } from "@playwright/test";

export class Loader {
    private _locator: Locator;

    constructor(page: Page) {
        this._locator = page.locator('#loader');
    }

    public async isVisible(): Promise<boolean> {
        return await this._locator.isVisible();
    }

    public async waitForHidden(timeout: number = 30000): Promise<void> {
        try {
            await this._locator.waitFor({ state: 'hidden', timeout });
        } catch (err) {
            // If waitFor throws, double-check if the locator actually remains visible.
            // If it's not visible (e.g., detached or not present), treat as success.
            const stillVisible = await this._locator.isVisible().catch(() => false);
            if (stillVisible) {
                throw err;
            }
        }
    }

    public async waitForVisible(timeout: number = 30000): Promise<void> {
        try {
            await this._locator.waitFor({ state: 'visible', timeout });
        } catch (err) {
            // If waitFor fails, surface the error so callers can decide how to proceed.
            throw err;
        }
    }
}