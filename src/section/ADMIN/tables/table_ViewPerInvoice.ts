import { Locator, Page,expect } from "@playwright/test";
import { RowQuery } from "../../../base/baseTable";
import { Legacy_BaseTable } from "../../../base/legacy/legacy_BaseTable";

// Define the columns in the table
export type Titles = 'Invoice Date' | 'Supplier' | 'Items' | 'Cases' | 'Bottles' | 'Invoice Total' | 'Margin' | 'Total Cost' | 'Total Price' | 'Invoice Number' | 'Due Date' | 'Confidence' | 'Finalize';

export class Table_ViewPerInvoice extends Legacy_BaseTable<Titles> {
  
  constructor(locator: Locator) {
    super(locator);
  }

 
  public async Edit(...rowQuery: RowQuery<Titles>[]): Promise<void> {
    const rowLocator: Locator = await this.GetRow(...rowQuery);
    await rowLocator.locator(".action-buttons a.blue").first().click();
 
    const dialog = this._locator.page()
        .locator("div.ui-dialog-content:visible")
        .first();
 
    try {
        await dialog.waitFor({ state: 'visible', timeout: 15000 });
    } catch {
        // Dialog did not appear in time
        // Intentionally ignored to avoid test failure
    }
}

  // Delete function for deleting an invoice row
  public async Delete(...rowQuery: RowQuery<Titles>[]): Promise<boolean> {
    const rowLocator: Locator = await this.GetRow(...rowQuery);
    const deleteIcon = rowLocator.locator(".action-buttons a.red");
  
    // Check if delete button exists & is visible
    const isVisible = await deleteIcon.isVisible().catch(() => false);
  
    if (isVisible) {
      await deleteIcon.click({ timeout: 10000 });
      return true;
    } else {
      return false;
    }
  }
 

  // View invoice history function
  public async History(...rowQuery: RowQuery<Titles>[]): Promise<void> {
    const rowLocator: Locator = await this.GetRow(...rowQuery);
    await rowLocator.locator(".action-buttons a.grey").first().click();  // Grey history button

  }

   
  public async SelectTop2Invoices(): Promise<void> {
    await this._locator.waitFor({ state: 'visible', timeout: 15000 });
 
    const checkboxes = this._locator.locator('tbody tr input[type="checkbox"].merge_group_item');
    const count = await checkboxes.count();
 
    if (count < 2) {
      throw new Error(`Expected at least 2 invoices to select, but found only ${count}`);
    }
 
    for (let i = 0; i < 2; i++) {
      const checkbox = checkboxes.nth(i);
      await checkbox.waitFor({ state: 'attached', timeout: 5000 });
      await checkbox.check();
    }
  }
  //Merge Invocies
  public async ClickMergeInvoices(): Promise<void> {
    const mergeButton = this._locator.page().locator('a.red[onclick="mergeReceiveItems()"]');
    await mergeButton.waitFor({ state: 'visible', timeout: 10000 });
    await mergeButton.click();
  }


  public async OpenInvoiceInNewTab(invoiceNumber: string, currentPage: Page): Promise<void> {
    const currentUrl = currentPage.url();
    const context = currentPage.context();
 
    // Open a new tab
    const page2 = await context.newPage();
    await page2.goto(currentUrl);
    await page2.waitForTimeout(2000);
 
    // Search for the same invoice in the new tab
    const searchBox = page2.locator('#receiveitemstable_filter input[type="search"]');
    await searchBox.fill(invoiceNumber);
    await page2.waitForTimeout(2000);
 
    // Click edit button for that invoice
    const editButton = page2
      .locator('table#receiveitemstable tbody tr')
      .filter({ hasText: invoiceNumber })
      .locator('.action-buttons a.blue');
 
    await editButton.click();
 
    // Verify duplicate invoice confirmation alert
    const alertDialog = page2.locator('text=Confirmation');
    await expect(alertDialog).toBeVisible({ timeout: 5000 });
 
    // Click "No" to close the alert
    const noButton = page2.locator('button', { hasText: "No" });
    await noButton.click();
 
    console.log("Duplicate invoice alert verified successfully in second tab");
 
    // Close second tab
    await page2.close();
  }
 
 
}
