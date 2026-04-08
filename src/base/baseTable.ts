import { Locator } from "@playwright/test";


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
     * Find the tables and wait until it's visible
     */
 
     public async WaitUntilVisible(timeout: number = 12000): Promise<void> {
        await this._locator.waitFor({ state: 'visible', timeout });
    }
 
    protected get page() {
        return this._locator.page();
    }

    /**
     * Get the column index given its title
     */
    protected async GetColumnIndex(tableRow: { colTitle: T }): Promise<number> {

        const titles = await this._locator.locator('thead tr:last-of-type th').all();
        let counter = 0;

        if (tableRow.colTitle === "label") return 1;

        for (const title of titles) {
            const text = (await title.innerText()).trim();
            const aria = (await title.getAttribute("aria-label"))?.trim() ?? "";
 
            if (
                text === tableRow.colTitle ||
                aria.includes(tableRow.colTitle) ||
                text.replace(/\s+/g, " ") === tableRow.colTitle
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

        const innerElements = cellLocator.locator("*");
        if (await innerElements.count() > 0) {
            // Wait for the first visible child only if it exists
            const firstInner = innerElements.first();
            try {
                await firstInner.waitFor({ state: 'visible', timeout: 8000 });
            } catch {

            }
        }

        // CASE 1: If html contains a visible input → use inputValue()
        const visibleInput = cellLocator.locator('input:not([type="hidden"])');
        if (await visibleInput.count() > 0) {
            await visibleInput.first().waitFor({ state: 'visible', timeout: 5000 });
            return (await visibleInput.first().inputValue()).trim();
        }

        // CASE 2: If html contains hidden input → use attribute "value"
        const hiddenInput = cellLocator.locator('input[type="hidden"]');
        if (await hiddenInput.count() > 0) {
            const val = await hiddenInput.first().getAttribute('value');
            if (val) return val.trim();
        }

        // CASE 3: If html contains span-like content → fallback to text
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

        try {
            // wait until at row is present
            await row.first().waitFor({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
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


        const sectionRows = this._locator.locator(`tfoot th:has-text("${sectionTitle}") ~ tr, tbody th:has-text("${sectionTitle}") ~ tr`);
        const rows = await sectionRows.all();

        const data: Array<{ [key in T]?: string }> = [];

        for (const row of rows) {
            const cells = await row.locator('td').all();
            const rowData: { [key in T]?: string } = {};

            for (let i = 0; i < cells.length; i++) {
                const cellValue = await cells[i].innerText();
                const columnTitle = await this.GetColumnTitle(i + 1);
                rowData[columnTitle as T] = cellValue;
            }
            data.push(rowData);
        }
        if (data.length === 0) {

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

    public async GetCellValueByRowLabel(rowLabel: string, columnIndex: number): Promise<string> {
        await this.WaitUntilVisible();
     
        const normalizedLabel = rowLabel.trim();
        const rows = this._locator.locator('tbody tr, tfoot tr');
     
        // 1 Try exact match first
        let row = rows.filter({
            has: this._locator.page().locator(
                'td:first-child, th:first-child',
                { hasText: new RegExp(`^\\s*${normalizedLabel}\\s*$`) }
            )
        });
     
        // 2 Fallback to legacy partial match if exact fails
        if (await row.count() === 0) {
            row = rows.filter({
                has: this._locator.page().locator(
                    'td:first-child, th:first-child',
                    { hasText: normalizedLabel }
                )
            });
        }
     
        // 3 Final guard (same behavior, clearer error)
        if (await row.count() === 0) {
            throw new Error(`No table row found with label "${rowLabel}"`);
        }
     
        const cell = row.first().locator(
            `td:nth-child(${columnIndex}), th:nth-child(${columnIndex})`
        );
     
        await cell.waitFor({ state: 'visible', timeout: 10000 });
     
        return (await cell.innerText()).trim();
    }

   /**
     * Sort the table by a specific column index
     */
   public async SortBytableColumn(options: {
        columnIndex: number;
        sortOrder?: 'ascending' | 'descending';
        strict?: boolean;
    }): Promise<boolean | void> {

        if (this.page.isClosed()) {
            return options.strict ? false : undefined;
        }

        const target = options.sortOrder ?? 'ascending';
        const strict = options.strict === true;

        const tableId = await this._locator.getAttribute('id');
        if (!tableId) return strict ? false : undefined;

        const header = this.page.locator(
            `th[aria-controls="${tableId}"]:nth-child(${options.columnIndex})`
        );

        const getOrder = async (): Promise<'ascending' | 'descending' | null> => {
            if (!(await header.count())) return null;
            const cls = (await header.first().getAttribute('class')) ?? '';
            if (cls.includes('sorting_asc')) return 'ascending';
            if (cls.includes('sorting_desc')) return 'descending';
            return null;
        };

        for (let i = 0; i < 2; i++) {
            if ((await getOrder()) === target) break;

            if (!(await header.count())) {
                return strict ? false : undefined;
            }

            await header.first().scrollIntoViewIfNeeded();
            await header.first().click({ force: true });

            try {
                await this.page.waitForLoadState('domcontentloaded', { timeout: 3000 });
            } catch {}
        }

        return strict ? (await getOrder()) === target : undefined;
    }

   /**
     * Validatation checks
     */
 
    public async IsEmpty(): Promise<boolean> {
        return (await this._locator.locator('tbody tr').count()) === 0;
    }
 
    public async IsNotEmpty(): Promise<boolean> {
        return (await this._locator.locator('tbody tr').count()) > 0;
    }
 
    public async isNoDataFound(): Promise<boolean> {
        return (await this._locator.locator('td.dataTables_empty').count()) > 0;
    }
 
   
    /**
     * Currency/Number parsing
     */
 
    protected parseNumber(value: string): number {
        if (!value) return 0;
        const n = Number(value.replace(/[^\d.-]/g, ""));
        return isNaN(n) ? 0 : n;
    }
}
 
 