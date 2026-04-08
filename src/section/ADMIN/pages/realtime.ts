import { Locator, Page } from "@playwright/test";
import { InfoBox } from "../../../objects/infobox";
import { Dropdown } from "../../../objects/dropdown";
import { Button } from "../../../objects/button";

export class Realtime {
    private _locator: Locator;
    private _body: Locator;

    public Todays_Takings: {
        Sales: InfoBox;
        Refunds: InfoBox;
        Voids: InfoBox;
        Revenue: InfoBox;
        Cost: InfoBox;
        Profit: InfoBox;
    };
   
    public LatestTransactions: {
        Table: Locator;
        Rows: Locator;
        EditIcon: (index: number) => Button;
    }



    constructor(page: Page) {
        this._locator = page.locator("#maincontent");
        this._body = page.locator("body");

        this.Todays_Takings = {
            Sales: new InfoBox(this._locator.locator(".infobox-sales")),
            Refunds: new InfoBox(this._locator.locator(".infobox-refunds")),
            Voids: new InfoBox(this._locator.locator(".infobox-voids")),
            Revenue: new InfoBox(this._locator.locator(".infobox-takings")),
            Cost: new InfoBox(this._locator.locator(".infobox-cost")),
            Profit: new InfoBox(this._locator.locator(".infobox-profit")),
        };
        
        this.LatestTransactions = {
            Table: this._locator.locator('#recentsalestable'),
            Rows: this._locator.locator('#recentsalestable tr'),
            EditIcon: (index: number) => new Button(this._locator.locator('#recentsalestable tr').nth(index).locator('a:has(i[title="Edit Sale"])'))
        };

    };


}
