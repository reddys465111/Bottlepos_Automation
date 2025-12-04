import { Locator } from "@playwright/test";
import { Processing } from "../../objects/processing";

export type RowQuery<T> = {
    rowColumn: T | number,
    rowValue: string,
}

export class Legacy_BaseTable<T extends string> {
    public _locator: Locator;
    private bodyLocator: Locator;
    private headerLocator: Locator;
    private textCase?: 'upper' | 'lower';

    constructor(locator: Locator, bodyLocator?: Locator, headerLocator?: Locator) {
        this._locator = locator;
        this.bodyLocator = bodyLocator ?? locator.locator('tbody');
        this.headerLocator = headerLocator ?? locator.locator('thead');
    }
 
    public setTextCase(textCase: 'upper' | 'lower'): void {
        this.textCase = textCase;
    }
    /**
     * Get all data for a specific section in the table
     * @param sectionTitle the title of the section to retrieve data from
     * @returns an array of objects representing the rows and their respective values in the section
     */
    public async getSectionData(sectionTitle: string): Promise<Array<{ [key in T]?: string }>> {
        // console.log(`Looking for section title: "${sectionTitle}"`);

        // Wait for 3 seconds before checking
        await this._locator.page().waitForTimeout(3000);

        // Increase timeout to 30 seconds
        try {
            await this._locator.locator('table').waitFor({ state: 'visible', timeout: 30000 });
        } catch (e) {
            // console.log("Table element not found or not visible within the timeout.");
            await this._locator.page().screenshot({ path: 'error_screenshot.png' });
            throw new Error("Table element not found or not visible within the timeout.");
        }

        await this._locator.page().waitForTimeout(5000);  // Extra delay

        // Wait for the footer or body elements to be visible
        try {
            await this._locator.locator('tfoot, tbody').waitFor({ state: 'visible', timeout: 15000 });
        } catch (e) {
            // console.log("Timeout waiting for 'tfoot' or 'tbody' elements.");
            await this._locator.page().screenshot({ path: 'tfoot_tbody_error.png' });
            throw e;
        }

        const footersPresent = await this._locator.locator('tfoot').count();
        const bodiesPresent = await this._locator.locator('tbody').count();

        if (footersPresent === 0 && bodiesPresent === 0) {
            // console.log("No 'tfoot' or 'tbody' elements found in the DOM.");
            await this._locator.page().screenshot({ path: 'no_tfoot_tbody.png' });
            throw new Error("No 'tfoot' or 'tbody' elements found in the DOM.");
        }

        //  (`Number of 'tfoot' elements found: ${footersPresent}`);
        // console.log(`Number of 'tbody' elements found: ${bodiesPresent}`);

        const sectionRows = this._locator.locator(`tfoot th:has-text("${sectionTitle}") ~ tr, tbody th:has-text("${sectionTitle}") ~ tr`);
        const rows = await sectionRows.all();

        // console.log(`Number of rows found for section "${sectionTitle}": ${rows.length}`);

        const data: Array<{ [key in T]?: string }> = [];

        for (const row of rows) {
            const cells = await row.locator('td').all();
            const rowData: { [key in T]?: string } = {};

            for (let i = 0; i < cells.length; i++) {
                const cellValue = await cells[i].innerText();
                const columnTitle = await this.GetColumnTitle(i + 1); // assuming columns start from 1
                rowData[columnTitle as T] = cellValue;
            }
            data.push(rowData);
        }
        if (data.length === 0) {
            // console.log(`No data found for section "${sectionTitle}".`);
        }
        return data;
    }

    /**
     * Get the column index given its title
     */
    protected async GetColumnIndex(tableRow: { colTitle: T }): Promise<number> {
        let titles = await this.headerLocator.locator('tr:last-of-type th').all();
        let counter = 0;

        if (tableRow.colTitle === "label") {
            return 1; // always the first column
         }

        for await (const title of titles) {
            const textcontent=(await title.textContent())?.trim();
            if (textcontent === tableRow.colTitle) {                return counter + 1;
            }
            counter++;
        }
        return -1;
    }

    /**
     * Get the locator of a column given its title
     * @param columnTitle the title of the column
     * @returns the locator of the column
     */
    protected async GetColumnLocator(columnTitle: T): Promise<Locator> {
        const columnIndex = await this.GetColumnIndex({ colTitle: columnTitle });
        return this.headerLocator.locator(`th:nth-of-type(${columnIndex})`);
    }

    /**
     * Get the locator of a desired row given its query
     * @param rowQuery query to select a specific row {rowColumn: 'Qty', rowValue: '2' }
     * @returns the row locator
     */
    protected async GetRow(...rowQuery: RowQuery<T>[]): Promise<Locator> {
        let xpathSelector = "";
        
        for await (const query of rowQuery) {
            let index = -1;

       
            if (typeof query.rowColumn == 'number') {
                index = query.rowColumn;
            } else if (typeof query.rowColumn == 'string') {
                index = await this.GetColumnIndex({ colTitle: query.rowColumn });
            }

            xpathSelector += `./td[${index}][text()="${query.rowValue }"] and `;
        }

        if (xpathSelector.length > 0) {
            xpathSelector = xpathSelector.substring(0, xpathSelector.length - 4);
            xpathSelector = `//tr[${xpathSelector}]`;
        }
        return this.bodyLocator.locator(xpathSelector);
    }

    /**
     * Get the value of a cell given a row query
     * @param targedCell cell from where the value will be returned
     * @param rowQuery query to identify the row
     * @example .GetCellValue({getValueFrom: 'Total'}, {rowColumn: 'Item', rowValue: 'AUTO ITEM 1'});
     * @description the previous example can be described as
     * Return the value of the Cell in the column 'Total', where the row contains the value 'AUTO ITEM 1'
     * in the column 'Item'
     * @returns cell value
     */
    public async GetCellValue(option: { getValueFrom: T }, by: {rowQuery?: RowQuery<T>[], rowIndex?: number} ): Promise<string> {
        let rowLocator: Locator = this._locator;
    
        if (by.rowIndex) {
            rowLocator = this.bodyLocator.locator(`tr:nth-of-type(${by.rowIndex})`);
        } else if (by.rowQuery) {
            rowLocator = await this.GetRow(...(by.rowQuery));
        }
      
        const rowIndex: number = await this.GetColumnIndex({ colTitle: option.getValueFrom });
        return await rowLocator.locator(`td:nth-of-type(${rowIndex})`).innerText();
    }

    public async GetRowByQuery(...rowQuery: RowQuery<T>[]): Promise<{ [key in T]?: string }> {
        const rowLocator = await this.GetRow(...rowQuery);
        const cells = await rowLocator.locator('td').all();
        const rowData: { [key in T]?: string } = {};
        for (let i = 0; i < cells.length; i++) {
            const cellValue = await cells[i].innerText();
            const columnTitle = await this.GetColumnTitle(i + 1); // assuming columns start from 1
            rowData[columnTitle as T] = cellValue;
        }
        return rowData;
    }
    /**
     * Check if a row exists in the table
     * @param rowQuery query to identify the row
     * @example .RowExists({rowColumn: 'Item', rowValue: 'AUTO ITEM 1'});
     * @returns 
     */
    public async RowExists(...rowQuery: RowQuery<T>[]): Promise<boolean> {
        let xpathSelector = "";
        for await (const query of rowQuery) {
            const rowValueCased = this.textCase === 'upper' ? query.rowValue.toUpperCase() : 
            this.textCase === 'lower' ? query.rowValue.toLowerCase() : 
            query.rowValue;
            let index = -1;
            if (typeof query.rowColumn == 'number') {
                index = query.rowColumn;
            } else if (typeof query.rowColumn == 'string') {
                index = await this.GetColumnIndex({ colTitle: query.rowColumn });
            }
            xpathSelector += `./td[${index}][text()="${rowValueCased}"] and `;
        }
        if (xpathSelector.length > 0) {
            xpathSelector = xpathSelector.substring(0, xpathSelector.length - 4);
            xpathSelector = `//tr[${xpathSelector}]`;
        }
        const rowLocator = this.bodyLocator.locator(xpathSelector);
        try {
                await rowLocator.first().waitFor({ state: "visible", timeout: 5000 });
                return true;
        } catch {
                return false;
        }
    }

    /**
     * Get the title of a column given its index
     * @param index the index of the column
     * @returns the title of the column
     */
    protected async GetColumnTitle(index: number): Promise<string> {
        const titleLocator = this.headerLocator.locator(`th:nth-of-type(${index})`);
        return await titleLocator.innerText();
    }

    /**
     * Sort the table by a column
     * @param options options to sort the table
     * @example .SortByColumn({columnTitle: 'ID', sortOrder: 'ascending'});
     * @description the previous example can be described as
     * Sort the table by the column 'ID' in ascending order
     * @returns void
     */
    public async SortByColumn(options: {columnTitle: T, sortOrder?: 'ascending' | 'descending'}): Promise<void> {
        const sortElement = await this.GetColumnLocator(options.columnTitle);
        let currentSortOrder = await sortElement.getAttribute('class');
        const processing = new Processing(this._locator);
        
        if (currentSortOrder !== options.sortOrder) {
            await sortElement.click();
            try{
                await processing.waitForVisible();
            } catch (e) { }
            await processing.waitForHidden();
        }
        const elementClass = await sortElement.getAttribute('class');
        currentSortOrder = elementClass?.includes('sorting_asc') ? 'ascending' : elementClass?.includes('sorting_desc') ? 'descending' : null;
        if (currentSortOrder !== options.sortOrder) {
            await sortElement.click();
            try{
                await processing.waitForVisible();
            } catch (e) { }
            await processing.waitForHidden();
        } 
    }


   public async SortByColumnwithdiv(
  arg: { columnTitle: T; sortOrder?: 'ascending' | 'descending' } | string
): Promise<boolean> {
  const page = this._locator.page();
  const isObject = typeof arg === 'object';
  const columnTitle = isObject ? arg.columnTitle : (arg as string);
  const desiredSort = isObject ? arg.sortOrder : undefined;
 
  // Locate best candidate table (main table or visible table in dialog)
  let table = page.locator('table#receiveitemstable');
  if (!(await table.count())) {
    table = page.locator('div[role="dialog"]:visible table:visible, table:visible').first();
  }
  await table.waitFor({ state: 'attached', timeout: 15000 });
 
  // Handle DataTables scroll clone header if present
  const wrapper = table.locator('xpath=ancestor::div[contains(@class, "dataTables_scroll")]');
  const headerTable = wrapper.locator('div.dataTables_scrollHead table');
  const targetHeaderTable = (await headerTable.count()) > 0 ? headerTable.first() : table;
  await targetHeaderTable.waitFor({ state: 'visible', timeout: 10000 });
 
  // Find headers and target index
  const headers = targetHeaderTable.locator('thead th');
  const headerTexts = await headers.allInnerTexts();
  const targetIndex = headerTexts.findIndex(h => h.replace(/\s+/g, ' ').trim().toLowerCase() === columnTitle.toString().trim().toLowerCase());
 
  if (targetIndex === -1) {
    // Column not found
    return false;
  }
 
  const sortElement = headers.nth(targetIndex);
  await sortElement.scrollIntoViewIfNeeded();
  await sortElement.waitFor({ state: 'visible', timeout: 5000 });
 
  // Helper to read current order (try aria-sort first, then class)
  const readOrder = async (): Promise<'ascending' | 'descending' | null> => {
    const aria = (await sortElement.getAttribute('aria-sort'))?.toLowerCase();
    if (aria === 'ascending' || aria === 'descending') return aria as 'ascending' | 'descending';
    const cls = (await sortElement.getAttribute('class')) ?? '';
    if (cls.includes('sorting_asc')) return 'ascending';
    if (cls.includes('sorting_desc')) return 'descending';
    return null;
  };
 
  // If no desiredSort specified, just click once and return true if click succeeds
  if (!desiredSort) {
    try {
      await sortElement.click();
      return true;
    } catch {
      return false;
    }
  }
 
  const processing = new Processing(this._locator);
 
  // If already in desired order, done
  let current = await readOrder();
  if (current === desiredSort) return true;
 
  // Try clicking up to 3 times to reach desired order
  const maxAttempts = 3;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await sortElement.click();
      // wait short then for processing (if any) to hide
      await page.waitForTimeout(300);
      try {
        await processing.waitForVisible();
      } catch {}
      try {
        await processing.waitForHidden();
      } catch {}
    } catch {
      // continue attempts
    }
    current = await readOrder();
    if (current === desiredSort) return true;
  }
 
  // Final attempt: check aria-sort or class one last time
  current = await readOrder();
  return current === desiredSort;
}


    public async ClickCell(option: { clickOn: T }, by: { rowQuery?: RowQuery<T>[], rowIndex?: number }): Promise<void> {
        await this._locator.waitFor({state: 'visible', timeout: 12000}); 
        let rowLocator: Locator = this._locator;

        if (by.rowIndex) {
            rowLocator = this.bodyLocator.locator(`tr:nth-of-type(${by.rowIndex})`);
        } else if (by.rowQuery) {
            rowLocator = await this.GetRow(...(by.rowQuery));
        }

        const colIndex: number = await this.GetColumnIndex({ colTitle: option.clickOn });
        const cell = rowLocator.locator(`td:nth-of-type(${colIndex})`);

        // If the cell contains a link or button, click it
        const linkOrCell = cell.locator('a, button, span, div').first();
        if (await linkOrCell.count() > 0) {
            await linkOrCell.click();
        } else {
            await cell.click();
        }
    }

    /**
    * Get the locator of a desired row given its index
    * @param option row index
    * @returns the row locator
    */
    protected async GetRowByIndex(option:{rowIndex: number}): Promise<Locator> {
        return this._locator.locator('tr').nth(option.rowIndex);
    }



 

    
}
