import { Locator } from "playwright";
import { Legacy_BaseTable, RowQuery } from "../../../../base/legacy/legacy_BaseTable";

export class AdditionalFees_Table extends Legacy_BaseTable<"Id" | "Name" | "Type" | "Value" | "Taxable" | "Options"> {

    constructor(locator: Locator) {
        super(locator);
    }

    public async Edit(...rowQuery: RowQuery<"Id" | "Name" | "Type" | "Value" | "Taxable" | "Options">[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(1)").click();
    }

    public async Delete(...rowQuery: RowQuery<"Id" | "Name" | "Type" | "Value" | "Taxable" | "Options">[]): Promise<void> {
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(2)").click();
    }

}