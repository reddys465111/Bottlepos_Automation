import { Locator, Page } from "@playwright/test";
import { Table_Sales } from "../../tables/table_sales/table_Sales";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { LabelField } from "../../../../objects/labelField";
import { TextField } from "../../../../objects/textField";
import { IsMobile } from "../../../../utils/initializer";
import { Table_Pagination } from "../../dialogs/components/table_Pagination";

export type Status = 'Order' | 'Complete' | 'Refunded' | 'Void' | 'Declined' | 'Canceled' | 'No Sale';

export class Sales  {
    _locator: Locator;
    public transactions : {
        Search: TextField,
        Table: Table_Sales,
        ShowEntries : Dropdown,
        InfoEntries : LabelField,
        Pagination: Table_Pagination,
    };

    public Reference: {
        ReferenceInput: TextField;
        Go: Button;
    }

    public Status: {
        OrderStatus: Dropdown;
        ViewOrder: Button;
        ViewAll: Button;
    }

    constructor(page: Page, device: string){
      
        this._locator = page.locator('#react-root');
        this.Reference = {
            ReferenceInput: new TextField(this._locator.locator('#SalesPageReferenceField')),
            Go: new Button(this._locator.getByRole('button', {name: 'Go'}))
        }

        this.Status = {
            OrderStatus: new Dropdown(this._locator.locator('#SalesPageStatusField')),
            ViewOrder: new Button(this._locator.getByRole('button', {name: 'View Order'})),
            ViewAll: new Button(this._locator.getByRole('button', {name: 'View All'}))
        }

        // const transactionsLocator = this._locator.locator('#transactiontable_wrapper');
        const tableLocator = this._locator.getByTestId('transaction-records-table');
        this.transactions= {
            Search: new TextField(this._locator.getByTestId('search-input')),
            ShowEntries: new Dropdown(this._locator.locator('#TableHOCPaginationAmount-transaction-records-table')),
            Table: new Table_Sales(tableLocator),
            Pagination: new Table_Pagination(this._locator.locator('ul.pagination')),
            InfoEntries: new LabelField(this._locator.locator('table'))
        }
    }

    /**
     * Clicks on the Sales link in the navigation menu.
     * @returns {Promise<void>}
     */
    public async Click(): Promise <void>{
        if(IsMobile()){
            // Only try to click the toggle menu if it exists and is visible
            const toggleMenu = this._locator.locator('[aria-label="Toggle menu"]');
            try {
                // Check if the element exists before attempting to click
                if (await toggleMenu.count() > 0) {
                    // Use a short timeout to avoid hanging if the element isn't visible
                    await toggleMenu.click({ timeout: 3000 });
                }
            } catch (error) {
                // If toggle menu fails, continue - it might not be needed on this viewport
                
            }
        }
        await this._locator.getByRole('link', {name: 'Sales'}).click();
        await this.transactions.Table.WaitUntilVisible();
        //await this._locator.page().waitForTimeout(2000);
    }

    /**
     * Filter transactions based on the provided transaction status.
     * @param option - An object containing the transaction option to select.
     * @example  await POS.Sales.FilterTransactionsByStatus({transactionType: 'Complete'});
     */
    public async FilterTransactionsByStatus(option: {statusOption: Status}): Promise<void> {
        await this.Status.OrderStatus.SelectOption({byText: option.statusOption});
    }
}