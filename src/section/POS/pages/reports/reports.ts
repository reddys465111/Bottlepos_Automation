import { DayReport } from "./day_Report";
import { RegisterReport } from "./register_Report";
import { SellerReport } from "./seller_Rerport";
import { TakingsCount } from "./takingsCount_Report";
import { WhatsSelling } from "./whatsSelling_Report";
import { Page } from "@playwright/test";

export type Columns_DayReport = "# Sales" | "Total";
export type Columns_TakingsCount = "Method" | "# Payments" | "Takings" | "# Refunds" | "Refunds" | "# Payout" | "Payout" | "Balance";
export type Columns_SellerReport = "User" | "Sales" | "Voids" | "Refunds" | "Balance";
export type Columns_RegisterReport = "# Sales" | "Total" ;
export type Columns_WhatsSelling =  "Item" | "# Sold" | "Total";


export class Reports {

    private _page: Page;
    public TakingsCount : TakingsCount;
    public WhatsSelling : WhatsSelling;
    public SellerReport: SellerReport;
    public RegisterReport: RegisterReport;
    public DayReport: DayReport;

    constructor(page: Page){
        this._page = page;
        this.TakingsCount = new TakingsCount(page);
        this.WhatsSelling = new WhatsSelling(page);
        this.SellerReport = new SellerReport(page);
        this.RegisterReport = new RegisterReport(page);
        this.DayReport = new DayReport(page);

        
    }

    public static parseCurrency(val: string): number {
         return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
     }

    public async Click(): Promise<void> {
        // await this._page.waitForTimeout(1000);
        await this._page.getByRole('link', {name: 'Reports'}).click();
    }

     

}