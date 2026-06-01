import { Locator, Page } from "@playwright/test";
import { Dialog_AdvanceSearch } from "./dialogs/dialog_AdvanceSearch";
import { Table_SalesReport } from "./Tables/table_SalesReport";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";

export class SalesReport {

    public Filter: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_SalesReport;
    public _locator: Locator;
    public _page: Page;
    public AdvanceSearch: Button;
    public ClearSearch: Button;
    public Dialog_AdvanceSearch: Dialog_AdvanceSearch;
    public ColumnVisibility: Button;

    constructor(page: Page, locator: Locator) {
        this._page = page;
        this._locator = locator;
        this.Range = new Dropdown(page.locator('#custom_daterangepicker'));
        this.Filter = new Dropdown(page.locator('#salesgroupselect'));
        this.Search = new TextField(this._locator.locator("input.form-control.input-sm[aria-controls='item-sales-report']"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='item-sales-report_length'][aria-controls='item-sales-report'].form-control.input-sm"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#item-sales-report_paginate'));
        this.Table = new Table_SalesReport(this._locator.locator('#item-sales-report'));
        this.AdvanceSearch = new Button(this._page.locator('#sale_advance_search'));
        this.ClearSearch = new Button(this._page.locator('#sale_advance_search_cross'));
        this.Dialog_AdvanceSearch = new Dialog_AdvanceSearch(this._page);
        this.ColumnVisibility = new Button(this._locator.locator("div.dt-buttons > button.dt-button.buttons-collection[aria-controls='item-sales-report']"));
    }
    public async VerifyColumnVisibilityOptions(optionName?: string): Promise<boolean> {

        const expectedOptions = [
            'CustomerName',
            'ItemName',
            'Stockcode',
            'Sold',
            'Category',
            'Supplier',
            'StockLevel',
            'Price',
            'Cost',
            'Profit',
            'Margin',
            'Markup',
            'Discounts',
            'salesTax',
            'BottleDeposit',
            'totalSales',
            'refundedTax',
            'totalRefunded',
            'balanceTax'
        ];

        for (const option of expectedOptions) {

            const locator = this._page.locator(
                '.dt-button-collection button span',
                { hasText: option }
            );

            if (await locator.count() === 0) {
                throw new Error(`Option "${option}" not found in Column Visibility dropdown.`);
            }
        }

        // Click dynamic button if passed
        if (optionName) {
            const button = this._page.locator(
                '.dt-button-collection button span',
                { hasText: optionName }
            );

            await button.click();
        }

        return true;
    }
}