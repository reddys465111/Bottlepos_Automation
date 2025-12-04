import { Page, Locator } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { Panel_CreditCard } from "./panel_CreditCard";

export class GeneralSettings {

    private _page: Page;
    private _locator: Locator;
    public CreditCard: Panel_CreditCard;
    public Save: Button;
    public tenderSidecard: Panel_CreditCard;

    constructor(page: Page) {
        this._page = page;
        this._locator = this._page.locator('#maincontent');

        // Use the panel-scoped credit card section
        this.CreditCard = new Panel_CreditCard(
            this._page.locator('.custom-box:has-text("Credit Card")')
        );

        const tenderSettingsSection = page.locator('div.widget-box.custom-box:has(h4.heading-lg:has-text("Tender Settings"))');
        this.tenderSidecard = new Panel_CreditCard(tenderSettingsSection);
        this.Save = new Button(this._locator.locator('button:has-text("Save")'));
    }
}