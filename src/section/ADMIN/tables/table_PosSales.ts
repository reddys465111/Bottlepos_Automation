import { type Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";

export type ColumnTitles = "ID"| "Ref" | "User" | "Device / Location" | "# Items" | "ProccessDt"  | "Total" | "Status";
export class Table_PosSales extends BaseTable<ColumnTitles>{
    constructor(locator:Locator){
        super(locator);
    }

    /**
    * Select and return the desired Sale's row
    * @param option this parameter contains 1 option 
    * it can be used with a numbers row=1 
    * @example await this.GetRowByIndex({row: 1});
    */
    private GetRowBy(option: {byIndex: number}) : Locator{
        return this._locator.locator('tr:nth-of-type('+option.byIndex+')');
    }

    /**
     * The method will click the transactionDetail button and open the dialog 
     * this method is selecting a row from the table given its position with the parameter "rowIndex"
     * @param option this parameter contains 1 option
     * it can be used with a numbers rowIndex=1 
     * @example await POS.Sales.transactions.Table.OpenTransactionDetail({rowIndex: 1})
     */
    public async EditTransectionDetail(option: {rowIndex: number}): Promise<void>{
        let rowLocator = this.GetRowBy({byIndex: option.rowIndex});
        rowLocator.locator('[title="Edit Sale"]').click();

    }
    public async DeleteTransectionDetail(option: {rowIndex: number}): Promise<void>{
        let rowLocator = this.GetRowBy({byIndex: option.rowIndex});
        rowLocator.locator('[title="Delete Sale"]').click();

    }
}
