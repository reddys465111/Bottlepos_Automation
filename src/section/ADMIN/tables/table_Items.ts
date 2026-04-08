import { Locator, Page } from "@playwright/test";
import { RowQuery } from "../../../base/baseTable";
import { Legacy_BaseTable } from "../../../base/legacy/legacy_BaseTable";
import { Table_Pagination } from "./table_Pagination";

export type titles = 'ID' |'Name' |'Rank' |'Qty On Hand' |'# Of Days Supply' |'Cost' |'Price' |'Stockcode'|'Reorder Point' |'Reorder Value' |'Options';

export class Table_Item extends Legacy_BaseTable<titles>{
    public Pagination: Table_Pagination;
    constructor(locator: Locator){
        super(locator)
        this.Pagination = new Table_Pagination(locator);
    }

    public async CheckItem(...rowQuery: RowQuery<titles>[]): Promise<void>{
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".ace.dt-select-cb").waitFor();
        await rowLocator.locator(".ace.dt-select-cb").hover();
        await rowLocator.locator(".ace.dt-select-cb").click();
    }

    public async DeleteSelected(page:Page): Promise<void>{
        // Wait for the delete button to be visible and clickable
        const deleteButton = this._locator.locator(".dataTables_info .action-buttons .icon-trash");
        page.on('dialog', async dialog => {
                if (dialog.type() === 'confirm') {
                    await dialog.accept(); 
                } 
        });

        await deleteButton.click();
    }

    public async Edit(...rowQuery: RowQuery<titles>[]): Promise<void>{
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(1)").click();
    }
    public async Delete(...rowQuery: RowQuery<titles>[]): Promise<void>{
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(2)").click();
    }
    public async ItemHistory(...rowQuery: RowQuery<titles>[]): Promise<void>{
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(3)").click();
    }
    public async PrintLabel(...rowQuery: RowQuery<titles>[]): Promise<void>{
        const rowLocator: Locator = await this.GetRow(...rowQuery);
        await rowLocator.locator(".action-buttons a:nth-of-type(4)").click();
    }   
}