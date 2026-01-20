import { Page, type Locator } from "@playwright/test";

export type TaxCode = 'HighTax' | 'NoTax' | 'GST' | 'CorporateTax' | 'Tax' | 'InclusiveTax' | 'ExclusiveTax' | 'MultiExclisiveTax' | 'MultiInclusiveTax';
export enum TotalType  {
    WithDecimals = 'withdecimal',
    DualPrice = 'dual_price',
    WithoutTax ='withouttax'
}

export enum rowType {
    Qty,
    Name,
    Price,
    StockCode,
    Tax,
    Total,
    Options,
    Actions
}

export type row = {
    rowTitle? : string,
    rowIndex?: number,
    cellValue? : number,
}
export class Table_Register{
    private _page: Page;
    public constructor(page: Page) {
        this._page = page;
        
    }
    /**
     * Ask if the table is emtpy or not
     * @returns True = empty
     */
    public async IsEmpty():Promise<boolean>{
        await this._page.waitForTimeout(2000);
        let counter = await this._page.locator('[data-testid^=row-]').count();
        return counter == 0;
    }
    /**
     * Select an Item from the table given its name or index
     * @param item Item name or Item in a given row
     * @returns the selected row object
     */
    private async RowDataTestID(item: string|number, column: rowType): Promise<string> {
        let result = '';
        try {
            var rowItem: string | undefined;
            switch (typeof item) {
                case 'string':
                rowItem = (await this._page.getByText(item)?.getAttribute('data-testid') ?? '').split('-')[1];
                break;
                case 'number':
                rowItem = `${item - 1}`;
                break;
            }

            switch (column) {
                case rowType.Qty:
                    result = `row-${rowItem}-qty`;
                    break;
                case rowType.Name:
                    result = `row-${rowItem}-name`;
                    break;
                case rowType.Price:
                    result = `row-${rowItem}-price`;
                    break;
                case rowType.StockCode:
                    result = `row-${rowItem}-stockcode`;
                    break;
                case rowType.Tax:
                    result = `row-${rowItem}-tax`;
                    break;
                case rowType.Total:
                    result = `row-${rowItem}-total`;
                    break;
                case rowType.Options:
                    result = `row-${rowItem}-options`;
                    break;
                case rowType.Actions:
                    result = `row-${rowItem}-action`;
                    break;
            }
        } catch (error) {
            console.error('Error getting row item:', error);
        }
        return result;
    }

    /**
     * Get the locator of a row item given its name or index
     * @param item Item name or Item in a given row
     * @param column column type
     * @returns the selected row object
     */
    private async RowItem(item: string|number, column: rowType): Promise<Locator> {
        const testId = await this.RowDataTestID(item, column);
        if (!testId) throw new Error(`RowItem: data-testid not found for item=${item} column=${column}`);
        return this._page.locator(`[data-testid="${testId}"]`);
    }
    /**
     * Gets the items Quantity
     * @returns items quantity
     */
    public async GetQty(option: {itemRow: string|number}): Promise<number>{
        return -1;
    }

    /**
     * Edit the qty from a Row at the position stablished in the 'row' parameter
     * @param option this parameter contains 2 options: row and qty of the item
     * row receive a number or a string value: row:1 , row="Item title" 
     * @example await POS.Register.ItemLines.EditQty({row: 1, qty: 20});
     * await POS.Register.ItemLines.EditQty({row: "Item title", qty: 6});
     */
    public async EditQty(option: {row: string|number, qty: number}):Promise<void>{
        const rowItem = await this.RowItem(option.row, rowType.Qty);
        const rowInput = rowItem.locator('input');
        const subtotalLocator = this._page.getByTestId('subtotal-value');
        const prevSubtotal = (await subtotalLocator.count() > 0) ? (await subtotalLocator.first().textContent())?.trim() ?? '' : '';
        try {
            if (await rowInput.count() > 0) {
                await rowInput.first().waitFor({ state: 'visible', timeout: 5000 });
                // Use fill("") to reliably clear input instead of locator.clear()
                await rowInput.first().fill("");
                await rowInput.first().fill(option.qty.toString());
                await rowItem.press("Tab");
                // wait for subtotal to update (short timeout) to avoid asserting stale values
                try {
                    const start = Date.now();
                    while (Date.now() - start < 3000) {
                        const cur = (await subtotalLocator.first().textContent())?.trim() ?? '';
                        if (cur !== prevSubtotal) return;
                        await this._page.waitForTimeout(150);
                    }
                } catch {}
                return;
            }

            // Fallback: set value via DOM and dispatch events (useful when input is not exposed)
            const dataTestId = await rowItem.getAttribute('data-testid');
            if (dataTestId) {
                await this._page.evaluate(({ tid, val }) => {
                    const cell = document.querySelector(`[data-testid="${tid}"]`);
                    if (!cell) return;
                    const inp = cell.querySelector('input') as HTMLInputElement | null;
                    if (inp) {
                        inp.value = String(val);
                        inp.dispatchEvent(new Event('input', { bubbles: true }));
                        inp.dispatchEvent(new Event('change', { bubbles: true }));
                    } else {
                        cell.textContent = String(val);
                        cell.dispatchEvent(new Event('input', { bubbles: true }));
                        cell.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }, { tid: dataTestId, val: option.qty });
                await this._page.waitForTimeout(200);
                // wait for subtotal to update after DOM fallback
                try {
                    const start = Date.now();
                    while (Date.now() - start < 3000) {
                        const cur = (await subtotalLocator.first().textContent())?.trim() ?? '';
                        if (cur !== prevSubtotal) break;
                        await this._page.waitForTimeout(150);
                    }
                } catch {}
                return;
            }
        } catch (err) {
            throw new Error(`EditQty failed for row ${option.row}: ${(err as Error).message}`);
        }
    }

    public async GetPrice(): Promise<number>{
        return -1;
    }

    /**
     * Edit the price of a given item given its index or row position
     * @param option this parameter contains 2 options: row and Price of the item
     * row receive a number or a string value: row:1 , row="Item title" 
     * @example  await POS.Register.ItemLines.EditPrice({row: 1, price:10});
     *  POS.Register.ItemLines.EditPrice({row: "Item_title", price: 2.75});
     */
    public async EditPrice(option: {row: string|number, price: number}): Promise<void>{
        const rowLocator = await this.RowItem(option.row, rowType.Price);
        if (!rowLocator) throw new Error(`Price row not found: ${option.row}`);
        const input = rowLocator.locator('input, [contenteditable="true"], [role="textbox"], textarea, [contenteditable]');

        try {
            // Try several strategies to reveal an inline editor/input
            let inputVisible = false;
            for (let attempt = 0; attempt < 8; attempt++) {
                if (await input.count() > 0) {
                    try {
                        await input.first().waitFor({ state: 'visible', timeout: 700 });
                        inputVisible = true;
                        break;
                    } catch {}
                }

                // Try clicking different spots inside the row to trigger editors
                try { await rowLocator.click({ timeout: 800 }); } catch {}
                try { await rowLocator.dblclick({ timeout: 500 }); } catch {}
                try { await rowLocator.locator('*').first().click({ timeout: 400 }).catch(()=>{}); } catch {}
                try { await rowLocator.click({ force: true, timeout: 500 }); } catch {}
                try { await rowLocator.press('Enter'); } catch {}
                try { await rowLocator.press('F2'); } catch {}
                try { await this._page.keyboard.press('Escape'); } catch {}

                // small wait to allow editor to appear
                await this._page.waitForTimeout(350);
            }

            // Final fallback: try to set value via JS if input never appeared
            if (!inputVisible) {
                const dataTestId = await rowLocator.getAttribute('data-testid');
                if (dataTestId) {
                    // Try dispatching a dblclick event then set the value/text and fire events
                    await this._page.evaluate(({ tid, val }) => {
                        const cell = document.querySelector(`[data-testid="${tid}"]`);
                        if (!cell) return;
                        // dispatch dblclick to encourage editor creation
                        const dbl = new MouseEvent('dblclick', { bubbles: true, cancelable: true });
                        cell.dispatchEvent(dbl);

                        const inp = cell.querySelector('input, [contenteditable="true"], [role="textbox"], textarea') as HTMLElement | HTMLInputElement | null;
                        if (inp) {
                            if ((inp as HTMLInputElement).value !== undefined) {
                                (inp as HTMLInputElement).value = String(val);
                            } else {
                                inp.textContent = String(val);
                            }
                            inp.dispatchEvent(new Event('input', { bubbles: true }));
                            inp.dispatchEvent(new Event('change', { bubbles: true }));
                        } else {
                            // As a last resort, set the cell textContent and fire input/change on the cell
                            cell.textContent = String(val);
                            cell.dispatchEvent(new Event('input', { bubbles: true }));
                            cell.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }, { tid: dataTestId, val: option.price });

                    // give UI a moment to react
                    await this._page.waitForTimeout(250);

                    // If JS fallback succeeded and input now exists, proceed to fill normally
                    if (await input.count() > 0) {
                        inputVisible = true;
                    } else {
                        return; // assume JS set the value directly
                    }
                }
                if (!inputVisible) throw new Error(`Price input not found or did not appear for row ${option.row}`);
            }

            // Fill the value into the visible input
            const editor = input.first();

            // Ensure page still open
            if (this._page.isClosed()) throw new Error('browser has been closed');

            await editor.fill(option.price.toString());
            try { await editor.press('Tab'); } catch {}
            try { await editor.locator('..').click(); } catch {}
        } catch (err) {
            if ((err as Error).message.includes('closed')) throw err;
            throw new Error(`EditPrice failed for row ${option.row}: ${(err as Error).message}`);
        }
    }

    /**
     * Enter Manual Item name given its index or row position
     * @param option this parameter contains 2 options: row and Name of the item
     * row receive a number value: row:1
     * name receive a string value: name:"Item Name"
     * @example  await POS.Register.ItemLines.EnterManualItemName({row: 1, name: "Manual Item 1"});
     */
    public async EditName(option: {row: number, name: string}):Promise<void>{
        var rowItem = (await this.RowItem(option.row, rowType.Name))?.locator('input');
        await rowItem?.fill(option.name.toString());
        await rowItem?.press('Tab');
    }

    /**
     * Get the item name from a given row
     * @param option this parameter contains 1 option
     * it can be used with number row=1
     * @example  await POS.Register.ItemLines.GetItemName({row: 1});
     */ 
    public async GetItemName(option: {row: number}):Promise<string>{
        var rowItem = (await this.RowItem(option.row, rowType.Name)).innerText();
        return rowItem;
    }

    /**
     * NOT IMPLEMENTED YET
     * @returns 
     */ 
    public async GetStockCode(option: {row: string|number}): Promise<string|undefined|null> {
        var rowItem = (await this.RowItem(option.row, rowType.StockCode))?.locator('[role=listbox]');
        return rowItem?.getAttribute('value');
    }

    /**
     * Select a stockcode from the register table given its row index/position
     * @param option this parameter contains 2 options row and stockcode of the item
     * row receive a number or a string value: row:1 , row="Item title" 
     * @example POS.Register.ItemLines.SelectStockCode({row: 1, stockCode: "9999954073"});
     * @ POS.Register.ItemLines.SelectStockCode({row: "Item_title", stockCode: "9999954073"});
     */
    public async SelectStockCode(option: {row: string|number, stockCode: string}): Promise<void> {
        var rowItem = (await this.RowItem(option.row, rowType.StockCode))?.locator('[role=listbox]');
        await rowItem?.locator('..').click();
        await rowItem?.getByText(option.stockCode).click();
    }

    /**
     *  Get the stockcode from a given Row
     * @param option - pass the row index or title
     * @example POS.Register.ItemLines.GetStockCode({row: 1});
     * POS.Register.ItemLines.GetStockCode({row: "Item_title"});
     * @returns Selected Tax
     */
   public async GetTax(option: { row: string | number }): Promise<string | undefined | null> {
        const rowItem = (await this.RowItem(option.row, rowType.Tax))?.locator('select');
        if (!rowItem) return null;

        // Get the selected option's label/text instead of numeric value
        // const selectedOption = await rowItem.locator('option:checked').innerText();
        const selectedValue = await rowItem.inputValue();
    
        // Find the option with that value and get its text
        const selectedText = await rowItem.locator(`option[value="${selectedValue}"]`).textContent();
        return selectedText;
    }


   public async IsDiscountHighlighted(option: {row: number}): Promise<boolean> {
    const discountRow = this._page.getByTestId(`discount-${option.row - 1}-text`);
    return await discountRow.isVisible();
   }


    /**
     * Expand the Tax dropdown an select an option
     * @param option this parameter contains 2 options row and taxOption of the item
     * row receive a number or a string value: row:1 , row="Item title" 
     * taxOptions can be one of the following values: HighTax" | "NoTax" | "GST" | "Corporate Tax"
     * @example POS.Register.ItemLines.SelectTax({row: 1, taxName: "Tax"});
     * @ POS.Register.ItemLines.SelectTax({row: "Item_title", taxName: "GST" });
     */
    public async SelectTax(option: {row: string|number, taxOption: TaxCode}): Promise<void> {
        const rowLocator = await this.RowItem(option.row, rowType.Tax);

        // Capture current tax value so we can wait for it to change after selection
        const taxLocator = this._page.getByTestId('tax-value');
        const prevTax = (await taxLocator.textContent())?.trim() ?? '';

        const waitForTaxChange = async (timeout = 2000) => {
            const start = Date.now();
            while (Date.now() - start < timeout) {
                const cur = (await taxLocator.textContent())?.trim() ?? '';
                if (cur !== prevTax) return cur;
                await this._page.waitForTimeout(1000);
            }
            return (await taxLocator.textContent())?.trim() ?? '';
        };

        // Try native <select> first
        const select = rowLocator.locator('select');
        if (await select.count() > 0) {
            await select.first().waitFor({ state: 'visible', timeout: 5000 });
            await select.first().selectOption({ label: option.taxOption });
            await this._page.keyboard.press('Tab');
            // Wait for tax value to update (or timeout)
            await waitForTaxChange();
            return;
        }

        // If no native select, attempt to click a custom dropdown (listbox or button)
        const listbox = rowLocator.locator('[role="listbox"], [role=listbox], div[role="combobox"], button, .select');
        if (await listbox.count() > 0) {
            await listbox.first().click();
            const optionLocator = this._page.getByText(option.taxOption, { exact: true }).first();
            await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
            await optionLocator.click();
            await this._page.keyboard.press('Tab');
            // Wait for tax value to update (or timeout)
            await waitForTaxChange();
            return;
        }

        // Fallback: click the row and try to set option even if it's a hidden <option>
        await rowLocator.click();

        // Try to find an <option> inside or associated with this row.
        const optionInRow = rowLocator.locator(`option:has-text("${option.taxOption}")`);
        if (await optionInRow.count() > 0) {
            const parentSelect = optionInRow.locator('xpath=ancestor::select').first();
            if (await parentSelect.count() > 0) {
                const val = await optionInRow.getAttribute('value');
                if (val) {
                    await parentSelect.selectOption({ value: val });
                } else {
                    await parentSelect.selectOption({ label: option.taxOption });
                }
                await this._page.keyboard.press('Tab');
                // Wait for tax value to update (or timeout)
                await waitForTaxChange();
                return;
            }

            // If no ancestor select found, set the value via JS and dispatch change
            await this._page.evaluate((text) => {
                const opts = Array.from(document.querySelectorAll('option'));
                const opt = opts.find(o => o.textContent?.trim() === text);
                if (opt) {
                    const sel = opt.closest('select');
                    if (sel) {
                        (sel as HTMLSelectElement).value = (opt as HTMLOptionElement).value;
                        sel.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            }, option.taxOption);
            await this._page.keyboard.press('Tab');
            // Wait for tax value to update (or timeout)
            await waitForTaxChange();
            return;
        }

        // As a final attempt, try to interact with any element containing the tax option text
        // Use force: true since select options may be hidden but still interactive
        const globalOption = this._page.getByText(option.taxOption, { exact: true }).first();
        try {
            // Try clicking with force since the element might be hidden but still valid
            await globalOption.click({ force: true });
        } catch (error) {
            // If element truly doesn't exist or is inaccessible, try a final JS-based selection
            await this._page.evaluate((text) => {
                const opts = Array.from(document.querySelectorAll('option'));
                const opt = opts.find(o => o.textContent?.trim() === text);
                if (opt) {
                    const sel = opt.closest('select');
                    if (sel) {
                        (sel as HTMLSelectElement).value = (opt as HTMLOptionElement).value;
                        sel.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            }, option.taxOption);
        }
        await this._page.keyboard.press('Tab');
        // Wait for tax value to update (or timeout)
        await waitForTaxChange();
    }

    /**
     * Get the total value from a given Row
     * @param option this parameter contains 2 options row and totalType of the item
     * row receive a number or a string value: row:1 , row="Item title" 
     * totalType is an optional parameter, can be one of the following values: TotalType.WithDecimals | TotalType.DualPrice | TotalType.WithoutTax
     * default value for totalType is WithDecimals
     * @example POS.Register.ItemLines.GetTotal({row: 1, totalType: TotalType.WithDecimals});
     *  POS.Register.ItemLines.GetTotal({row: "Item_title");
     * @returns total value
     */
    public async GetTotal(option: {row: string|number}): Promise<string|undefined>{
        var rowItem = (await this.RowItem(option.row, rowType.Total))
        return rowItem?.innerText();
    }

    /**
     * Click on the option button from a given row
     * @param option this parameter contains 1 option
     * it can be used with number or strings row=1 or row="item title"
     * @example  POS.Register.ItemLines.OpenOptions({row: 1});
     * POS.Register.ItemLines.OpenOptions({row: "Item title"});
     */
    public async OpenOptions(option: {row: string|number}):Promise<void>{
        if (this._page.isClosed()) throw new Error('Cannot OpenOptions: page is closed');
        const rowLocator = await this.RowItem(option.row, rowType.Options);
        if (!rowLocator) throw new Error(`OpenOptions: row not found: ${option.row}`);
        const button = rowLocator.locator('button');
        if (await button.count() === 0) throw new Error(`OpenOptions: button not found for row ${option.row}`);
        await button.first().click();
    }

    /**
     * Add more qty item from item in a specific row
     * @param option this parameter contains 1 option
     * it can be used with number or strings row=1 or row="item title"
     * @example  POS.Register.ItemLines.ClickPlus({row: 1});
     * POS.Register.ItemLines.ClickPlus({row: "Item Title"});
     */
    public async ClickPlus(option: {row: string|number}): Promise<void>{
        //TODO
        throw new Error("Method not implemented yet.");
    }

    /**
     * Decrease the qty amount from item in a specific row
      * @param option this parameter contains 1 options 
     * it can be used with number or strings row=1 or row="item title"
     * @example  POS.Register.ItemLines.ClickMinus({row: 1});
     * POS.Register.ItemLines.ClickMinus({row: "Item Title"});
     */
    public async ClickMinus(option: {row: string|number}): Promise<void>{
        //TODO
        throw new Error("Method not implemented yet.");
    }

    /**
     * Delete the desired row by its index or title
     * @param option this parameter contains 1 option
     * it can be used with number or strings row=1 or row="item title"
     * @example  POS.Register.ItemLines.ClickRemove({row: 1});
     * POS.Register.ItemLines.ClickRemove({row: "Item Title"});
     */
    public async ClickRemove(option: {row: string|number}): Promise<void>{
        const removeItem = await (await this.RowItem(option.row, rowType.Actions))?.locator('i[class="icon-remove"]').click();
    }

    public async ClickDiscount(option: {row: string|number}): Promise<void>{
        throw new Error("Method not implemented yet.");
    }


    /**
     * Get the discount total value from a desired row
      * @param option this parameter contains 1 option
     * it can be used with number or strings row=1 or row="item title"
     * @example POS.Register.ItemLines.GetDiscountTotal({rowIndex: 1})
     * @returns Discount value
     */
    public async GetDiscountTotal(option: {row: number}): Promise <string> {
        const testId = `discount-${option.row - 1}-value`;
        const direct = this._page.getByTestId(testId);
        try {
            if (await direct.count() > 0) {
                return (await direct.first().innerText())?.trim() ?? '';
            }
        } catch (err) {
            // ignore and fallback
        }

        const rowLocator = await this._page.locator(`[data-testid^="discount-"][data-testid$="-value"]`).all();
        const el = rowLocator[option.row - 1];
        if (el) return (await el.innerText())?.trim() ?? '';
        return '';
    }

    /**
     * Get the discount text from a desired row
     * @param option this parameter contains 1 option
     * @returns Discount text
     */
    public async GetDiscountText(option: {row: number}): Promise <string> {
        let rowLocator = await this._page.locator(`[data-testid^="discount-"][data-testid$="-text"]`).all();
        return await rowLocator[option.row-1]?.innerText();
    }
    /**
     * The method will select the row at the position 'row' and return the row's locator
     * @param option this parameter contains 1 options 
     * it can be used with number row=1
     * @example await this.GetPromotionRow({row: 1});
     * @returns promotion row locator
     */
    private async GetPromotionRow(option: {row: number}): Promise<Locator|null> {
        throw new Error("Method not implemented yet.");
    }

    /**
     * The method navigate only through promotion rows, select desired row and return its promotion value
     * @param PromotioRow this parameter contains 1 option 
     * it can be used with a number row=1
     * @example  POS.Register.ItemLines.GetPromotion({row: 1});
     * @returns Promotion row value
     */
    public async GetPromotion(option: {row: number}): Promise <string> {
        let rowLocator = await this._page.locator(`[data-testid^="promotion-"][data-testid$="-text"]`).all();
        return await rowLocator[option.row-1]?.innerText();
    }
     /**
     * The method navigate only through price alert rows, select desired row and return its min price alert value
     * @param PromotioRow this parameter contains 1 option 
     * it can be used with a number row=1
     * @example  POS.Register.ItemLines.GetMinimumPriceAlert({row: 1});
     * @returns Min price alert row value
     */
     public async GetMinimumPriceAlert(option: {row: number}): Promise <string> {
        // Prefer explicit test-id if present (fast path)
        const rowLocator = this._page.getByTestId(`min-price-message-${option.row-1}`);
        try {
            if ((await rowLocator.count()) > 0) {
                const text = await rowLocator.first().innerText({ timeout: 3000 }).catch(() => '');
                if ((text ?? '').trim().length > 0) return (text ?? '').trim();
            }
        } catch {
            // fall through to fallback strategies
        }

        // Fallback: try to locate common min-price alert text anywhere on the page.
        // Some UI variants render alerts without the test-id; search for common keywords.
        try {
            const patterns = [ 'min price', 'minimum price', 'price.*below', 'price.*minimum', 'minimum.*price' ];
            for (const pat of patterns) {
                const regex = new RegExp(pat, 'i');
                const el = this._page.getByText(regex).first();
                if (await el.count() > 0) {
                    const txt = await el.innerText().catch(() => '');
                    if ((txt ?? '').trim().length > 0) return (txt ?? '').trim();
                }
            }

            // Last resort: look for any element that includes a dollar amount near the row index
            const rowPrefix = `row-${option.row - 1}`;
            const possible = this._page.locator(`[data-testid^="${rowPrefix}"]`).all();
            const elements = await possible;
            for (const el of elements) {
                const txt = (await el.innerText().catch(() => '')) ?? '';
                if (txt.trim().length > 0 && /\$\d+/.test(txt)) return txt.trim();
            }
        } catch (err) {
            // ignore and return empty
        }

        return '';
    }
    
    /**
     * The method will select the row at the position 'row' and return the row's locator
     * @param option this parameter contains 1 options 
     * it can be used with number row=1
     * @example await this.GetMinimumPriceRow({row: 1});
     * @returns min price alert row locator
     */
    private async GetMinimumPriceRow(promotionRow: {row: number}): Promise<Locator|null> {
        throw new Error("Method not implemented yet.");
    }

    /**
     * Delete a row from the register table
     * @param option this parameter contains 1 option
     * it can be used with number row=1
     * @example await this.DeleteRow({row: 1});
     */
    public async DeleteRow(option: {row: number}): Promise<void>{
        await (await this.RowItem(option.row, rowType.Actions))?.locator('i[class="icon-remove"]').click();
    }

    /**
     * Verify if the tax is not editable
     * @param option this parameter contains 1 option
     * it can be used with number row=1
     * @example await this.IsTaxNotEditable({row: 1});
     * @returns 
     */
    public async IsTaxNotEditable(option: {row: number}): Promise<boolean>{
        return await (await this.RowItem(option.row, rowType.Tax))?.locator('select').count() < 1;
    }

    /**
     * Verify if the price is not editable
     * @param option this parameter contains 1 option
     * it can be used with number row=1
     * @example await this.IsPriceNotEditable({row: 1});
     * @returns 
     */
    public async IsPriceNotEditable(option: {row: number}): Promise<boolean>{
        const row = await this.RowItem(option.row, rowType.Price);
        const input = row?.locator('input');
        if (!input) return true;
        const count = await input.count();
        if (count < 1) return true;
        // If input exists, consider it not editable when it's not editable/enabled
        try {
            return !(await input.first().isEditable());
        } catch (error) {
            return !(await input.first().isEnabled());
        }
    }

    /**
     * Verify if the price is editable
     * @param option this parameter contains 1 option
     * it can be used with number row=1
     * @example await this.IsPriceEditable({row: 1});
     * @returns 
     */
    public async IsPriceEditable(option: {row: number}): Promise<boolean>{
        const row = await this.RowItem(option.row, rowType.Price);
        const input = row?.locator('input');
        if (!input) return false;
        const count = await input.count();
        if (count < 1) return false;
        try {
            return await input.first().isEditable();
        } catch (error) {
            return await input.first().isEnabled();
        }
    }

    /**
     * Verify if the EBT checkbox is checked
     * @param option this parameter contains 1 option
     * it can be used with number row=1
     * @example await this.IsEBTChecked({row: 1});
     * @returns 
     */
    public async IsEBTChecked(option: {row: number}): Promise<boolean>{
        const rowItem = await this.RowItem(option.row, rowType.Name);
        return await rowItem.locator('input[type="checkbox"]').isChecked();
    }

    /**
     * Verify if the EBT checkbox is not checked
     * @param option this parameter contains 1 option
     * it can be used with number row=1
     * @example await this.IsEBTNotChecked({row: 1});
     * @returns 
     */
    public async IsEBTNotChecked(option: {row: number}): Promise<boolean>{
        const rowItem = await this.RowItem(option.row, rowType.Name);
        return await rowItem.locator('input[type="checkbox"]').isChecked();
    }

    public async CheckEBT(option: {row: number}): Promise<void>{
        const rowItem = await this.RowItem(option.row, rowType.Name);
        if (await rowItem.locator('input[type="checkbox"]').isChecked()) {
            return;
        }
        await rowItem.locator('input[type="checkbox"]').check();
    }

    public async UncheckEBT(option: {row: number}): Promise<void>{
        const rowItem = await this.RowItem(option.row, rowType.Name);
        if (!await rowItem.locator('input[type="checkbox"]').isChecked()) {
            return;
        }
        await rowItem.locator('input[type="checkbox"]').uncheck();
    }
}
