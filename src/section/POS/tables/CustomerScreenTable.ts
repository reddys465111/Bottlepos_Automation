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

    async IsColumnVisible(rowIndex: number, colTitle: CustomerColumns): Promise<boolean> {
        const colClassMap: Record<CustomerColumns, string> = {
            Qty: "col-1",
            Item: "col-2",
            Price: "col-3",
            Total: "col-4",
        };
    
        const columnClass = colClassMap[colTitle];
    
        return await this.Row(rowIndex)
            .locator(`td.${columnClass} span`)
            .isVisible();
    }
}
