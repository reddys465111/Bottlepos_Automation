import { Locator } from "@playwright/test";
import { Processing } from "../objects/processing";



export type RowQuery<T> = {
    rowColumn: T | number,
    rowValue: string
}

export type optionProps<T> = {
    byIndex?: number, rowQuery?: RowQuery<T>[]
}

export class BaseTable<T extends string> {
    public _locator: Locator;

    constructor(locator: Locator) {
        this._locator = locator;
    }

    /**
     * Get the column index given its title
     */
    protected async GetColumnIndex(tableRow: { colTitle: T }): Promise<number> {

        const titles = await this._locator.locator('thead tr:last-of-type th').all();
        let counter = 0;


        if (tableRow.colTitle === "label") {
            return 1;
        }

        for await (const title of titles) {
            const textContent = (await title.textContent())?.trim() || "";
            const ariaLabel = (await title.getAttribute("aria-label"))?.trim() || "";
            const dataLabel = (await title.getAttribute("data-priority")) || "";


            if (
                textContent === tableRow.colTitle ||
                ariaLabel.includes(tableRow.colTitle) ||
                textContent.replace(/\s+/g, " ") === tableRow.colTitle
            ) {
                return counter + 1;
            }

            counter++;
        }

        return 0;
    }


    protected async GetRow(...rowQuery: RowQuery<T>[]): Promise<Locator> {

        if (!rowQuery || rowQuery.length === 0) {
            throw new Error("GetRow() received EMPTY rowQuery");
        }

        const conditions: string[] = [];

        for (const query of rowQuery) {

            if (!query.rowValue || query.rowValue.trim() === "") {
                throw new Error(`rowValue is EMPTY: ${JSON.stringify(query)}`);
            }
            let colIndex = -1;

            if (typeof query.rowColumn === "number") {
                colIndex = query.rowColumn;
            } else {
                colIndex = await this.GetColumnIndex({ colTitle: query.rowColumn });

                if (!colIndex || colIndex < 1) {
                    throw new Error(`Invalid column index for: ${JSON.stringify(query)}`);
                }

            }

            const safeValue = query.rowValue.replace(/"/g, "'").trim();
            const cellXPath =
                `./td[${colIndex}][(normalize-space(text())= "${safeValue}") 
                                  or
                 .//*[contains(normalize-space(.), "${safeValue}")]]`;


            conditions.push(cellXPath);
        }
        const finalXPath = `//tbody/tr[${conditions.join(" and ")}]`;
        return this._locator.locator(finalXPath);
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
    public async GetCellValue(
        option: { getValueFrom: T },
        by: { rowQuery?: RowQuery<T>[], rowIndex?: number }
    ): Promise<string> {

        await this._locator.waitFor({ state: 'visible', timeout: 12000 });

        let rowLocator: Locator = this._locator;

        // Determine row
        if (by.rowIndex) {
            rowLocator = this._locator.locator(`tbody tr:nth-of-type(${by.rowIndex})`);
        } else if (by.rowQuery) {
            rowLocator = await this.GetRow(...(by.rowQuery));
        }

        const colIndex: number = await this.GetColumnIndex({ colTitle: option.getValueFrom });
        const cellLocator = rowLocator.locator(`td:nth-of-type(${colIndex})`);

        //await cellLocator.waitFor({ state: 'attached', timeout: 12000 });
        // Wait for cell or inner content to be visible
        // SAFETY: Check if cell has any inner elements before waiting
        const innerElements = cellLocator.locator("*");
        if (await innerElements.count() > 0) {
            // Wait for the first visible child only if it exists
            const firstInner = innerElements.first();
            try {
                await firstInner.waitFor({ state: 'visible', timeout: 8000 });
            } catch {
                // Do not fail — fallback to reading text
            }
        }
        // If no inner elements → continue without waiting



        // CASE 1: If cell contains a visible input → use inputValue()
        const visibleInput = cellLocator.locator('input:not([type="hidden"])');
        if (await visibleInput.count() > 0) {
            await visibleInput.first().waitFor({ state: 'visible', timeout: 5000 });
            return (await visibleInput.first().inputValue()).trim();
        }

        // CASE 2: If cell contains hidden input → use attribute "value"
        const hiddenInput = cellLocator.locator('input[type="hidden"]');
        if (await hiddenInput.count() > 0) {
            const val = await hiddenInput.first().getAttribute('value');
            if (val) return val.trim();
        }

        // CASE 3: If cell contains span-like content → fallback to text
        const textContent = (await cellLocator.innerText()).trim();
        return textContent;
    }

    /**
     * Check if a row exists in the table
     * @param rowQuery query to identify the row
     * @example .RowExists({rowColumn: 'Item', rowValue: 'AUTO ITEM 1'});
     * @returns 
     */
    public async RowExists(...rowQuery: RowQuery<T>[]): Promise<boolean> {
        const row = await this.GetRow(...rowQuery);
        const count = await row.count();
        return count > 0;
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

        // console.log(`Number of 'tfoot' elements found: ${footersPresent}`);
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
     * Get the title of a column given its index
     * @param index the index of the column
     * @returns the title of the column
     */
    protected async GetColumnTitle(index: number): Promise<string> {
        const titleLocator = this._locator.locator(`thead th:nth-of-type(${index})`);
        return await titleLocator.innerText();
    }


    /**
     * Wait until the table is visible
     * @param timeout the timeout in milliseconds
     */
    public async WaitUntilVisible(timeout: number = 12000): Promise<void> {
        await this._locator.waitFor({ state: 'visible', timeout: timeout });
    }

    /**
     * Check if the table is empty
     * @returns true if the table is empty, false otherwise
     */
    public async IsEmpty(): Promise<boolean> {
        return await this._locator.locator('tbody tr').count() === 0;
    }

    /**
     * Check if the table is not empty
     * @returns true if the table is not empty, false otherwise
     */
    public async IsNotEmpty(): Promise<boolean> {
        return await this._locator.locator('tbody tr').count() > 0;
    }



    public async GetCellValueByRowLabel(rowLabel: string, columnIndex: number): Promise<string> {
        await this.WaitUntilVisible();

        const normalizedLabel = rowLabel.trim();

        // Find the row in either tbody or tfoot where first col matches label
        const row = this._locator
            .locator('tbody tr, tfoot tr')
            .filter({ has: this._locator.page().locator('td:nth-child(1), th:nth-child(1)', { hasText: normalizedLabel }) });

        // Now select the target cell (td or th)
        const cell = row.locator(`td:nth-child(${columnIndex}), th:nth-child(${columnIndex})`);

        await cell.first().waitFor({ state: "visible", timeout: 10000 });
        return (await cell.first().innerText()).trim();
    }

    /*
    // Sort the table by a specific column index
  */
    public async SortBytableColumn(options: {
    columnIndex: number;
    sortOrder?: 'ascending' | 'descending';
    strict?: boolean; // ✅ NEW (optional)
}): Promise<boolean | void> {

    const targetOrder: 'ascending' | 'descending' =
        options.sortOrder ?? 'ascending';

    const strict = options.strict === true;

    const tableId = await this._locator.getAttribute('id');
    if (!tableId) {
        return strict ? false : undefined;
    }

    const header = this._locator.page().locator(
        `.dataTables_scrollHead th[aria-controls="${tableId}"]:nth-of-type(${options.columnIndex})`
    );

    try {
        await header.waitFor({ state: 'visible', timeout: 15000 });
    } catch {
        return strict ? false : undefined;
    }

    const getCurrentOrder = async (): Promise<'ascending' | 'descending' | null> => {
        const cls = (await header.getAttribute('class')) ?? '';
        if (cls.includes('sorting_asc')) return 'ascending';
        if (cls.includes('sorting_desc')) return 'descending';
        return null;
    };

    let currentOrder = await getCurrentOrder();

    // ✅ Try max 2 clicks — no waiting
    for (let i = 0; i < 2 && currentOrder !== targetOrder; i++) {
        await header.click();
        await this._locator.page().waitForTimeout(200);
        currentOrder = await getCurrentOrder();
    }

    if (!strict) {
        return;
    }

    // ✅ STRICT MODE RESULT
    return currentOrder === targetOrder;
}



}

