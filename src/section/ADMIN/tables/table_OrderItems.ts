import { Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
import { RowQuery } from "../../../base/baseTable";

export type Titles =
    | 'Name' | 'Supplier Name' | 'Stock Code' | 'Qty OnHand' | 'Item Rank' | 'Last Sold' | 'Sale Stats' | 'Reorder Case' | 'Unit PerCase' | 'Reorder Bottles' | 'Cost' | 'Price' | 'Margin' | 'Total' | 'VendorItemNo' | '# of DaysSupply';

export class Table_OrderItems extends BaseTable<Titles> {

    constructor(locator: Locator) {
        super(locator);
    }

    // Remove item function for deleting an item row
    public async RemoveItem(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a[title='Remove Item']").click();  // Remove button
    }

    public async RemoveExpandedRowItem(itemName: string): Promise<void> {
        const parentRow = await this.GetRow({ rowColumn: 'Name', rowValue: itemName });

        // Step 1: Expand the row by clicking the first column (td.col0)
        const expandCell = parentRow.locator('td.col0');
        await expandCell.scrollIntoViewIfNeeded();
        await expandCell.click();

        // Step 2: Get the sibling child row that appears after parent
        const childRow = parentRow.locator('xpath=following-sibling::tr[contains(@class, "child")]');
        await childRow.waitFor({ state: 'visible', timeout: 5000 });

        // Step 3: Now locate the actual remove button inside nested structure
        const removeBtn = childRow.locator('a#removeadditem0');

        // Step 4: Wait for it to attach and be interactable
        await removeBtn.waitFor({ state: 'attached', timeout: 5000 });
        await removeBtn.waitFor({ state: 'visible', timeout: 5000 });

        // Step 5: Click the button
        await removeBtn.click({ force: true });
    }

    // Discontinue item function for discontinuing an item row
    public async DiscontinueItem(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons button[title='Item Discontinue']").click();  // Discontinue button
    }

    // View item history function
    public async ItemHistory(...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a[title='Item History']").click();  // History button
    }

    public async ExpandedItemHistory(itemName: string): Promise<void> {

        // Step 1: Locate parent row FROM _locator root
        const parentRow = this._locator.locator(
            `xpath=//tbody/tr[./td[2]//*[contains(normalize-space(.), "${itemName}")]]`
        );
        await parentRow.waitFor();

        // Step 2: Expand row
        await parentRow.locator("td.col0").click();

        // Step 3: Get row ID (row0, row1, etc.)
        const rowId = await parentRow.getAttribute("id");

        // Step 4: Locate child row (expanded detail row)
        const childRow = this._locator.locator(
            `xpath=//*[@id="${rowId}"]/following-sibling::tr[contains(@class,"child")][1]`
        );
        await childRow.waitFor();

        // Step 5: Click item history icon
        await childRow.locator(`xpath=.//i[@title="Item History"]`).click();
    }

    // Get and Set functions for Reorder Case
    public async GetReorderCase(...rowQuery: RowQuery<Titles>[]): Promise<string> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        return await rowLocator.locator("input[name='newordercase']").inputValue();  // Get Reorder Case value
    }

    // public async SetReorderCase(value: string, ...rowQuery: RowQuery<Titles>[]): Promise<void> {
    //     const rowLocator: Locator = await this.GetRow(...rowQuery);
    //     await rowLocator.locator("input[name='newordercase']").fill(value);  // Set Reorder Case value
    // }
   public async SetReorderCase(value: string, ...rowQuery: RowQuery<Titles>[]): Promise<void> {
    if (!rowQuery || rowQuery.length === 0) {
        throw new Error("RETURN");
    }
    const row = await this.GetRow(...rowQuery);
    const input = row.locator("input[name='newordercase']");
    await input.waitFor({ state: "visible" });
    await input.fill(value);
    await input.press("Enter");
    await input.page().waitForTimeout(3000);
}



    // Get and Set functions for Unit Per Case
    public async GetUnitPerCase(...rowQuery: RowQuery<Titles>[]): Promise<string> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        return await rowLocator.locator("input[name='neworderunitper']").inputValue();  // Get Unit Per Case value
    }

    public async SetUnitPerCase(value: string, ...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator("input[name='neworderunitper']").fill(value);  // Set Unit Per Case value
    }

    // Get and Set functions for Reorder Bottles
    public async GetReorderBottles(...rowQuery: RowQuery<Titles>[]): Promise<string> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        return await rowLocator.locator("input[name='newreorderqty']").inputValue();  // Get Reorder Bottles value
    }

    public async SetReorderBottles(value: string, ...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator("input[name='newreorderqty']").fill(value);  // Set Reorder Bottles value
    }

    // Get and Set functions for Cost
    public async GetCost(...rowQuery: RowQuery<Titles>[]): Promise<string> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        return await rowLocator.locator("input[name='neworderitemcost']").inputValue();  // Get Cost value
    }

    public async SetCost(value: string, ...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator("input[name='neworderitemcost']").fill(value);  // Set Cost value
    }

    // Get and Set functions for Price
    public async GetPrice(...rowQuery: RowQuery<Titles>[]): Promise<string> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        return await rowLocator.locator("input[name='neworderitemprice']").inputValue();  // Get Price value
    }

    public async SetPrice(value: string, ...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator("input[name='neworderitemprice']").fill(value);  // Set Price value
    }

    // Get and Set functions for Margin
    public async GetMargin(...rowQuery: RowQuery<Titles>[]): Promise<string> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        return await rowLocator.locator("input[name='neworderitemmargin']").inputValue();  // Get Margin value
    }

    public async SetMargin(value: string, ...rowQuery: RowQuery<Titles>[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator("input[name='neworderitemmargin']").fill(value);  // Set Margin value
    }
    public async GetDaysSupply(itemName: string): Promise<string> {

    // 1. Get parent row
    const parentRow = this._locator.locator(
        `xpath=//tbody/tr[./td[2]//*[contains(normalize-space(.), "${itemName}")]]`
    );
    await parentRow.waitFor();

    // 2. Expand the row
    const expandCell = parentRow.locator('td.col0');
    await expandCell.scrollIntoViewIfNeeded();
    await expandCell.click();

    // 3. Get row id (like: row0)
    const rowId = await parentRow.getAttribute("id");

    // 4. Get child/expanded row
    const childRow = this._locator.locator(
        `xpath=//*[@id="${rowId}"]/following-sibling::tr[contains(@class,"child")][1]`
    );
    await childRow.waitFor({ state: "visible" });

    // 5. Get # of Days Supply value
    const daysSupply = childRow.locator(".sale_average");
    await daysSupply.waitFor({ state: "visible" });

    return (await daysSupply.innerText()).trim();
}

}
