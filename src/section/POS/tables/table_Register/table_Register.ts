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
        return this._page.locator(`[data-testid=${await this.RowDataTestID(item, column)}]`);
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
        var rowItem = await this.RowItem(option.row, rowType.Qty);
        var rowInput = rowItem.locator('input');
        await rowInput?.clear();
        await rowInput?.fill(option.qty.toString());
        await rowItem.press("Tab");
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
        var rowItem = (await this.RowItem(option.row, rowType.Price))?.locator('input');
        await rowItem?.clear();
        await rowItem?.fill(option.price.toString());
        await rowItem?.locator('..').click();
        await rowItem?.press("Tab");
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
        const stringId = await this.RowDataTestID(option.row, rowType.Tax);
        const locatorByRole = this._page.getByTestId(stringId);

        //expand dropdown
        await locatorByRole.hover();
        await locatorByRole.click();
        await this._page.waitForTimeout(1000);
        await locatorByRole.locator('select').selectOption({ label: option.taxOption });
        await this._page.keyboard.press('Tab'); // press Tab to close the dropdown
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
        await (await this.RowItem(option.row, rowType.Options))?.locator('button').click();
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
        let rowLocator = await this._page.locator(`[data-testid^="discount-"][data-testid$="-value"]`).all();
        return await rowLocator[option.row-1]?.innerText();
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
        let rowLocator = this._page.getByTestId(`min-price-message-${option.row-1}`);
        return await rowLocator?.innerText();
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
        return await (await this.RowItem(option.row, rowType.Price))?.locator('input').count() < 1;
    }

    /**
     * Verify if the price is editable
     * @param option this parameter contains 1 option
     * it can be used with number row=1
     * @example await this.IsPriceEditable({row: 1});
     * @returns 
     */
    public async IsPriceEditable(option: {row: number}): Promise<boolean>{
        return await (await this.RowItem(option.row, rowType.Price))?.locator('input').count() > 0;
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
