import { Locator } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";

export type CustomerColumns = "Qty" | "Item" | "Price" | "Total";

export class CustomerScreenTable extends BaseTable<CustomerColumns> {

    constructor(locator: Locator) {
        super(locator);
    }

    Rows(): Locator {
        return this._locator.locator("tbody tr");
    }

    Row(index: number): Locator {
        return this.Rows().nth(index);
    }

    /**
     *
     */
    async GetValue(rowIndex: number, colTitle: CustomerColumns): Promise<string> {
        return await this.GetCellValue(
            { getValueFrom: colTitle },
            { rowIndex }
        );
    }

    /**
     * 
     */
    async GetRowData(rowIndex: number) {
        return {
            qty: await this.GetValue(rowIndex, "Qty"),
            item: await this.GetValue(rowIndex, "Item"),
            price: await this.GetValue(rowIndex, "Price"),
            total: await this.GetValue(rowIndex, "Total"),
        };
    }

    async WaitForLoaded(): Promise<void> {
        await this.Rows().first().waitFor({ state: "visible" });
    }
}
