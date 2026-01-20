import { Locator, Page } from "@playwright/test";
import { InfoBox } from "../../../objects/infobox";
import { Dropdown } from "../../../objects/dropdown";
import { Button } from "../../../objects/button";

export class Dashboard {
  private _locator: Locator;
  private _body: Locator;
  public Todays_Takings: {
    Sales: InfoBox;
    Refunds: InfoBox;
    Voids: InfoBox;
    NetSales: InfoBox;
    Cost: InfoBox;
    Profit: InfoBox;
  };
  public Stats: {
    InventoryGrade: InfoBox;
    MonthlyProjectedSales: InfoBox;
    AverageMargin: InfoBox;
    AverageTicketAmount: InfoBox;
    AverageCustomers: InfoBox;
    AverageRatings: InfoBox;
  };
  public DateFilter: {
    Open: Locator;
    Display: Locator;
    Picker: Locator;
    Option: (label: string) => Locator;
  };

  public TopRankItems:{
    RankButton: Button
    RankDropdown: Dropdown
  }
  public SalesGraph : {
    RangeButton: Button
    RangeDropdown: Dropdown
  }
  public SalesStats : {
    PieRange: Button
    PieRank: Button
    PieRankDropdown: Dropdown
    PieRangeDropdown: Dropdown
  }
  public InventroryStats:{
    PieInRank: Button
    PieInRankDropdown: Dropdown
  }
  public RankDropdown: {
    Open: Locator;
    Option: (rank: string) => Locator;
  };

  public PopularItems: {
    TableBody: Locator;
    Rows: Locator;
    Headers: Locator;
    HasData: () => Promise<boolean>;
    GetHeaders: () => Promise<string[]>;
    GetRows: () => Promise<
      Array<{ name: string; quantity: string; value: string }>
    >;
    GetTitles: () => Promise<string[]>;
  };

  constructor(page: Page) {
    this._locator = page.locator("#maincontent");
    this._body = page.locator("body");
    this.Todays_Takings = {
      Sales: new InfoBox(this._locator.locator(".infobox-sales")),
      Refunds: new InfoBox(this._locator.locator(".infobox-refunds")),
      Voids: new InfoBox(this._locator.locator(".infobox-voids")),
      NetSales: new InfoBox(this._locator.locator(".infobox-takings")),
      Cost: new InfoBox(this._locator.locator("#cost")),
      Profit: new InfoBox(this._locator.locator("#profit")),
    };
    this.TopRankItems = {
        RankButton: new Button(this._locator.locator('#rank')),
        RankDropdown: new Dropdown(this._locator.locator('#rankvalues'))
    };
   this.SalesGraph = {
    RangeButton: new Button(this._locator.locator('button:has(span#grange)')),
    RangeDropdown: new Dropdown(this._locator.locator('button:has(span#grange)'))
    
};

this.SalesStats = {
    // PieRange: new Button(this._locator.locator('button:has(span#pierange)')),
    PieRange: new Button(this._locator.locator('button:has(#pierange)')),

    PieRank: new Button(this._locator.locator('button:has(span#pietype)')),

    // FIXED ↓ DROP-DOWNS
    PieRangeDropdown: new Dropdown(this._locator.locator('#pierangevalues')),
    PieRankDropdown: new Dropdown(this._locator.locator('#pietypevalues')),
};

this.InventroryStats = {
    PieInRank: new Button(this._locator.locator('button:has(span#pietypeIn)')),
    PieInRankDropdown: new Dropdown(this._locator.locator('#pietypevaluesIn'))
};


    this.Stats = {
      InventoryGrade: new InfoBox(this._locator.locator("#inventoryscore")),
      MonthlyProjectedSales: new InfoBox(
        this._locator.locator("#monthlyprojection")
      ),
      AverageMargin: new InfoBox(this._locator.locator("#averagemargin")),
      AverageTicketAmount: new InfoBox(
        this._locator.locator("#averageticketamount")
      ),
      AverageCustomers: new InfoBox(this._locator.locator("#averagecustomers")),
      AverageRatings: new InfoBox(
        this._locator.locator("#averageawesomerating")
      ),
    };

    // DateFilter is for the Sales Stats section date range picker
    this.DateFilter = {
      Open: this._locator.locator("button:has(span#pierange)"),
      Display: this._body.locator("#pierange"),
      Picker: this._body.locator(".daterangepicker:visible"),
      Option: (label: string) => {
        // Try multiple selectors to find the option:
        // 1. By data-range-key attribute (case-insensitive)
        // 2. By text content with :has-text
        return this._body.locator(
          `.daterangepicker:visible li[data-range-key="${label}"], .daterangepicker:visible li:has-text("${label}")`
        );
      }
    };
    this.RankDropdown = {
      Open: this._locator.locator("button:has(span#rank)"),
      Option: (rank: string) =>
        this._locator.locator(`#rankvalues li[value="${rank}"]`),
    };

    this.PopularItems = {
      TableBody: this._locator.locator("tbody#popularitems"),
      Rows: this._locator.locator("tbody#popularitems tr"),
      Headers: this._locator.locator("table thead th"),

      HasData: async () => {
        try {
          await this.PopularItems.TableBody.waitFor({
            state: "visible",
            timeout: 5000,
          });
          await this.PopularItems.Rows.first().waitFor({ timeout: 5000 });
          return (await this.PopularItems.Rows.count()) > 0;
        } catch {
          return false;
        }
      },

      GetHeaders: async () => {
        const headers = await this.PopularItems.Headers.allInnerTexts();
        return headers.map((h) => h.trim());
      },

      GetRows: async () => {
        const count = await this.PopularItems.Rows.count();
        const data = [];

        for (let i = 0; i < count; i++) {
          const cols = this.PopularItems.Rows.nth(i).locator("td b");
          data.push({
            name: await cols.nth(0).innerText(),
            quantity: await cols.nth(1).innerText(),
            value: await cols.nth(2).innerText(),
          });
        }

        return data;
      },

      GetTitles: async () => {
        return await this._locator
          .locator("#popularitems tr td:first-child b")
          .allInnerTexts();
      },
    };
  }

  public async getHeader(): Promise<string> {
    return (await this._locator.locator(".page-header").textContent()) ?? "";
  }

  public async SelectRank(rank: string): Promise<void> {
    // Capture the current first popular item title so we can wait for it to change
    const titleLocator = this._locator.locator("#popularitems tr td:first-child b").first();
    let previousTitle = "";
    try {
      previousTitle = (await titleLocator.innerText()) || "";
    } catch {}

    await this.RankDropdown.Open.click();
    await this.RankDropdown.Option(rank).click();

    // Poll until the first title changes (or timeout) to ensure the table was refreshed
    const page = this._body.page();
    const timeout = 3000;
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        const current = (await titleLocator.innerText()) || "";
        if (current !== previousTitle) {
          return;
        }
      } catch {}
      await page.waitForTimeout(200);
    }

    // Fallback: ensure at least the rows are visible
    await this.PopularItems.Rows.first().waitFor({ state: "visible", timeout: 2000 });
  }

  public async SelectDateRange(label: string): Promise<void> {
    // Find and click the button that opens the date range picker
    // Try multiple possible selectors for the date range button
    let openButton = null;
    
    try {
      // First try the SalesStats PieRange button
      openButton = this._locator.locator("button:has(span#pierange)");
      await openButton.first().waitFor({ state: "visible", timeout: 3000 });
    } catch {
      try {
        // Fallback: look for any button with date-related text or ID
        openButton = this._body.locator("button:has-text('Date'), button[id*='date'], button[class*='date']").first();
        await openButton.waitFor({ state: "visible", timeout: 3000 });
      } catch {
        throw new Error("Could not find date range filter button");
      }
    }
    
    // Click the button to open the picker
    await openButton.click();
    
    // Wait for the date picker to appear
    await this.DateFilter.Picker.waitFor({ state: "visible", timeout: 5000 });
    
    // Wait a moment for the picker to fully render
    await this._body.page().waitForTimeout(500);
    
    // Get the option locator
    const option = this.DateFilter.Option(label);
    
    // Ensure the specific option is visible before clicking
    await option.first().waitFor({ state: "visible", timeout: 3000 });
    
    // Scroll the option into view if needed
    await option.first().scrollIntoViewIfNeeded();
    
    // Click the option
    await option.first().click();
    
    // Wait for the picker to close and any loading to complete
    try {
      await this.DateFilter.Picker.waitFor({ state: "hidden", timeout: 3000 });
    } catch {
      // Picker might close quickly, that's fine
    }
    
    await this._body.page().waitForTimeout(500);
  }
  
 

 
}
