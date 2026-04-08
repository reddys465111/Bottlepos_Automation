import { Locator, Page } from "@playwright/test";
 
export class Loader {
    private _locator: Locator;
 
    constructor(page: Page) {
        this._locator = page.locator('#loader');
    }
 
    public async isVisible(): Promise<boolean> {
        try {
            return await this._locator.isVisible();
        } catch {
            return false;
        }
    }
 
    public async waitForHidden(timeout = 20000): Promise<void> {
        const page = this._locator.page();
 
        // If loader does not exist or page navigated
        if (page.isClosed()) return;
 
        try {
            // If loader is not visible at all, move on
            if (!(await this._locator.isVisible())) {
                return;
            }
 
            // Wait until loader is hidden or detached
            await page.waitForFunction(
                () => {
                    const el = document.querySelector('#loader');
                    if (!el) return true;
 
                    const style = window.getComputedStyle(el);
                    return (
                        style.display === 'none' ||
                        style.visibility === 'hidden' ||
                        style.opacity === '0'
                    );
                },
                {},
                { timeout: 30000 }
            );
        } catch {
            // If loader is stuck → real failure
            throw new Error('Loader did not disappear within expected time');
        }
    }
 
    public async waitForVisible(timeout = 20000): Promise<void> {
        await this._locator.waitFor({ state: 'visible', timeout});
    }
}
 
 