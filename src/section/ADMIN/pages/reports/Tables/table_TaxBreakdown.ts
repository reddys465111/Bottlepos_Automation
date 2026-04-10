import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type titles = 'Name' | '# Items' | 'Sale Subtotal' | 'Tax';

export class Table_TaxBreakdown extends BaseTable<titles> {

    private table: Locator;

    constructor(locator: Locator) {
        super(locator);
        this.table = locator;   

    }

    //  Get row by ANY Name in first column
    private getRowByName(name: string): Locator {
        return this.table.locator('tbody tr', {
            has: this.table.locator('td:first-child a', { hasText: name })
        });
    }

    //  # Items column
    getItemsByName(name: string): Locator {
        return this.getRowByName(name).locator('td:nth-child(2)');
    }

    //  Sale Subtotal column
    getSaleSubtotalByName(name: string): Locator {
        return this.getRowByName(name).locator('td:nth-child(3)');
    }

    // Tax column
    getTaxByName(name: string): Locator {
        return this.getRowByName(name).locator('td:nth-child(4)');
    }
    
    async getTotalTax(): Promise<number> {
        await this.table.waitFor({ state: 'visible', timeout: 15000 })

        const rows = this.table.locator("tbody tr")
        const count = await rows.count()

        let total = 0

        for (let i = 0; i < count; i++) {
            const taxText = (await rows
                .nth(i)
                .locator("td:nth-child(4)")
                .innerText()).trim()

            const taxValue = Number(taxText.replace(/[^0-9.-]+/g, ''))
            total += taxValue
        }

        return total
    }

    async getAllRowsData() {
        const rows = this.table.locator("tbody tr");
        const count = await rows.count();

        const data: {
            name: string,
            items: number,
            subtotal: number,
            tax: number
        }[] = [];

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);

            const name = (await row.locator('td:nth-child(1)').innerText()).trim();
            const items = Number(await row.locator('td:nth-child(2)').innerText());
            const subtotal = Number((await row.locator('td:nth-child(3)').innerText()).replace(/[^0-9.-]+/g, ''));
            const tax = Number((await row.locator('td:nth-child(4)').innerText()).replace(/[^0-9.-]+/g, ''));

            data.push({ name, items, subtotal, tax });
        }

        return data;
    }

}