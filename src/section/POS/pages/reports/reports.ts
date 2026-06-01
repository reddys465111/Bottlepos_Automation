import { execSync } from "child_process";
import { Button } from "../../../../objects/button";
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
    public CloseRegister: Button;

    constructor(page: Page){
        this._page = page;
        this.TakingsCount = new TakingsCount(page);
        this.WhatsSelling = new WhatsSelling(page);
        this.SellerReport = new SellerReport(page);
        this.RegisterReport = new RegisterReport(page);
        this.DayReport = new DayReport(page);
        this.CloseRegister = new Button(this._page.getByRole('button', { name: 'Close Register' }));  
    }
    public async Click(): Promise<void> {
        // await this._page.waitForTimeout(1000);
        await this._page.getByRole('link', {name: 'Reports'}).click();
    }
    public static parseCurrency(val: string): number {
        return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
    }
 //This Function used to close the report view and print dialog popup window

async CloseReportPreview(action?: () => Promise<void>): Promise<void> {
  try {
    // Trigger print preview if action provided
    if (action) {
      await action();
    }
    await this._page.waitForTimeout(2500);
    // Send  Alt+F4 in Pwoershell to close the print preview dialog
    execSync(
      `powershell -command "(New-Object -ComObject WScript.Shell).SendKeys('%{F4}')"`
    );
    await this._page.waitForTimeout(1000);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`CloseReportPreview failed: ${message}`);
  }
}
}