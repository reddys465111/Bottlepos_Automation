import { Page, Locator } from "@playwright/test";
import { Tab_General } from "./tab_settings/tab_General";
import { Tab_Printing } from "./tab_settings/tab_Printing";
import { IsMobile } from "../../../../utils/initializer";

export class Settings {
    private _page: Page
    public General: Tab_General;

    public Printing: Tab_Printing;
    public StoreName: Locator;

    constructor(page: Page){
        this._page = page;
        this.General = new Tab_General(page.locator('#react-root'));
        this.Printing = new Tab_Printing(page.locator('#react-root'));
        this.StoreName = page.locator('.biz_name');
    }

    public async Click(): Promise<void> {
        if (IsMobile()) {
            const toggle = this._page.locator('[aria-label="Toggle menu"]');
            try {
                if ((await toggle.count()) > 0) {
                    if (await toggle.isVisible()) {
                        await toggle.click({ timeout: 10000 });
                    }
                }
            } catch (err) {
                
            }
        }
        await this._page.getByRole('link', {name: 'Settings'}).click();
      
    }
    // business name in standard style
    public async getStoreName(): Promise<string> {
        return (await this.StoreName.innerText()).trim();
    }
    
}



