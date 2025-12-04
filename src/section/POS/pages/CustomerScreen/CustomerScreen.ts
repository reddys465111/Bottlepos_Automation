import { Page, Locator } from "@playwright/test";
import { LabelField } from "../../../../objects/labelField";
import { CustomerScreenTable } from "../../tables/CustomerScreenTable";

export class CustomerScreen {

    private _page: Page;
    private _locator: Locator;

    WelcomeMessage: LabelField;
    Table: CustomerScreenTable;
    TotalItems: LabelField;
    Deposit: LabelField;
    Tax: LabelField;
    GrandTotalLabel: LabelField;
    GrandTotalValue: LabelField;
    PromotionSms: Locator;
    OfferList: Locator;

    constructor(page: Page) {
        this._page = page;

        //landing of main customer screen
        this._locator = page.locator('.cus-service-wrapper');

        // Welcome Message
        this.WelcomeMessage = new LabelField(this._locator.locator('.welcome-msg h1'));

        // Customer Screen Table
        this.Table = new CustomerScreenTable(this._locator.locator('.cus-service-table table'));

        // Footer Fields
        const footer = this._locator.locator('.footer-detail .footer-tax');

        this.TotalItems = new LabelField(footer.locator('span.discount').filter({ hasText: /^Items:/ }));

        this.Deposit = new LabelField( footer.locator("span.discount", { hasText: "Deposit:" }));

        this.Tax = new LabelField( footer.locator("span.discount", { hasText: "Tax:" }));

        this.GrandTotalLabel = new LabelField( footer.locator(".grand-total"));

        this.GrandTotalValue = new LabelField( footer.locator(".grand-total-text"));
        this.PromotionSms = this._locator.locator('#promotionsmsoptinout');
        this.OfferList = this._locator.locator('#offerlist');
    }

    async WaitForWelcome(): Promise<void> 
    {await this.WelcomeMessage.IsVisible();

     }

    async WaitForFirstItem(): Promise<void> {
        await this.Table.WaitForLoaded();
    }

    async GetGrandTotal(): Promise<string> {
        const text = await this.GrandTotalValue.getText();
        return text.trim();    
    }
}
