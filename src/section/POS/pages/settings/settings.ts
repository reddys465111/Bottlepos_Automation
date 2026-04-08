import { Page } from "@playwright/test";
import { Tab_General } from "./tab_settings/tab_General";
import { Tab_Printing } from "./tab_settings/tab_Printing";
import { IsMobile } from "../../../../utils/initializer";

export class Settings {
    private _page: Page
    public General: Tab_General;

    public Printing: Tab_Printing

    constructor(page: Page){
        this._page = page;
        this.General = new Tab_General(page.locator('#react-root'));
        this.Printing = new Tab_Printing(page.locator('#react-root'));
    }

    public async Click(): Promise<void> {
        if (IsMobile()) {
            const toggle = this._page.locator('[aria-label="Toggle menu"]');
     
            try {
                await toggle.waitFor({ state: 'visible', timeout: 5000 });
                await toggle.click();
            } catch {
               
            }
        }
     
        await this._page.getByRole('link', { name: 'Settings' }).click();
    }
    
}



