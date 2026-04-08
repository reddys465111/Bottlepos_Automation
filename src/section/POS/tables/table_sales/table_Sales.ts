import { type Locator } from "@playwright/test";
import { BaseTable, optionProps } from "../../../../base/baseTable";
import { RowQuery } from "../../../../base/legacy/legacy_BaseTable";

export type ColumnTitles = "GID"| "Ref" | "Device / Location" | "Customer Name" | "Mobile" | "#Items" | "Total" | "Sale Time" | "Status";
export class Table_Sales extends BaseTable<ColumnTitles>{
    constructor(locator:Locator){
        super(locator);
    }

    /**
    * Select and return the desired Sale's row
    * @param option this parameter contains 1 option 
    * it can be used with a numbers row=1 
    * @example await this.GetRowByIndex({row: 1});
    */
    private async GetRowBy(option: optionProps<ColumnTitles>) : Promise<Locator>{
        let rowLocator: Locator;
        if (option.byIndex) {
            rowLocator = this._locator.locator('tr:nth-of-type('+option.byIndex+')');
        } else { 
            rowLocator = await this.GetRow(...option.rowQuery!);
        }
        return rowLocator!;
    }

    /**
     * The method will click the transactionDetail button and open the dialog 
     * this method is selecting a row from the table given its position with the parameter "rowIndex"
     * @param option this parameter contains 1 option
     * it can be used with a numbers rowIndex=1 
     * @example await POS.Sales.transactions.Table.OpenTransactionDetail({rowIndex: 1})
     */
    public async ViewTransactionDetail(option: optionProps<ColumnTitles>): Promise<void>{
        let rowLocator = await this.GetRowBy(option);
        const columnIndex = await this.GetColumnIndex({colTitle: "Status"});
        let viewLocator = rowLocator!.locator('td:nth-of-type('+columnIndex+') ~ td');
        await viewLocator.click();
    }
    
    public async DeleteTransectionDetail(option: optionProps<ColumnTitles>): Promise<void>{
        let rowLocator = await this.GetRowBy(option);
        rowLocator.locator('[title="Delete Sale"]').click();
    }

    /**
     * Get the status badge text of a row
     * @param option this parameter contains 1 option
     * it can be used with a numbers rowIndex=1 
     * @example await POS.Sales.transactions.Table.GetStatusBadge({rowIndex: 1})
     */
    public async GetStatusBadge(option: optionProps<ColumnTitles>): Promise<string> {
        const rowLocator = await this.GetRowBy(option);
        const columnIndex = await this.GetColumnIndex({colTitle: "Status"});
        let viewLocator = rowLocator.locator('td:nth-of-type('+columnIndex+')>span:nth-of-type(1)');
        return await viewLocator.innerText();
    }

    /**
     * Get the GID badge text of a row
     * @param option this parameter contains 1 option
     * it can be used with a numbers rowIndex=1 
     * @example await POS.Sales.transactions.Table.GetGIDBadge({rowIndex: 1})
     */
    public async GetGIDBadge(option: optionProps<ColumnTitles>): Promise<string> {
        const rowLocator = await this.GetRowBy(option);
        const columnIndex = await this.GetColumnIndex({colTitle: "GID"});
        let viewLocator = rowLocator.locator('td:nth-of-type('+columnIndex+')>div:nth-of-type(1)');
        return await viewLocator.innerText();
    }

    /**
     * Get the GID number of a row
     * @param option this parameter contains 1 option
     * it can be used with a numbers rowIndex=1 
     * @example await POS.Sales.transactions.Table.GetGIDNumber({rowIndex: 1})
     */

    public async GetGIDNumber(option: optionProps<ColumnTitles>): Promise<string> {
        const rowLocator = await this.GetRowBy(option);
        const columnIndex = await this.GetColumnIndex({colTitle: "GID"});
        let viewLocator = rowLocator.locator('td:nth-of-type('+columnIndex+')>div:nth-of-type(2)');
        return await viewLocator.innerText();
    }
    public async GetRefNumber(rowIndex: number): Promise<string> {
        const ref = this._locator
            .locator(`tbody tr:nth-child(${rowIndex}) td:nth-child(2)`);  // 2 = Ref column

        return (await ref.innerText()).trim();
    }
}
