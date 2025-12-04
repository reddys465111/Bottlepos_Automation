import { Locator, Page } from "@playwright/test";
import { Table_DayReport, Titles } from "./Tables/table_DayReport";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";
import { Table_Pagination } from "../../tables/table_Pagination";


export class DayReport {
    public Filter: Dropdown;
    public Range: Dropdown;
    public Search: TextField;
    public ShowEntries: Dropdown;
    public ShowingEntries: Table_Pagination;
    public Table: Table_DayReport;
    private _locator: Locator;

    constructor(locator: Locator) {
        this._locator = locator;
        this.Filter = new Dropdown(this._locator.locator('tbody', {has: this._locator.locator('following-sibling::tfoot[.//th[text()="BEER"]]')}));
        this.Filter = new Dropdown(this._locator.locator('#filterDropdown')); // Adjust locator as needed
        this.Range = new Dropdown(this._locator.locator("input#custom_daterangepicker"));
        this.Search = new TextField(this._locator.locator("#day-report_filter input[type=search]"));
        this.ShowEntries = new Dropdown(this._locator.locator("select[name='day-report_length']"));
        this.ShowingEntries = new Table_Pagination(this._locator.locator('#day-report_paginate'));
        this.Table = new Table_DayReport(this._locator.locator('.cash-sale-tale table'));
    }

    // Example method to fetch category data
    public async getCategoryData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getCategoryData();
    }

    // Method to fetch hourly sales data
    public async getTotalHourlySales(hour: string): Promise<string> {
        return this.Table.getTotalHourlySales(hour);
    }

    // Method to fetch rank data
    public async getRankData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getRankData();
    }

    // Method to fetch miscellaneous data
    public async getMiscellaneousData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getMiscellaneousData();
    }

    // Method to fetch total taxable data
    public async getTotalTaxableData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getTotalTaxableData();
    }

    // Method to fetch nontaxable data
    public async getNontaxableData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getNontaxableData();
    }

    // Method to fetch total sales data
    public async getTotalSalesData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getTotalSalesData();
    }

    // Method to fetch total register data
    public async getTotalRegisterData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getTotalRegisterData();
    }

    // Method to fetch total tendered data
    public async getTotalTenderedData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getTotalTenderedData();
    }

    // Method to fetch total tax data
    public async getTotalTaxData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getTotalTaxData();
    }

    // Method to fetch total rank sale data
    public async getTotalRankSaleData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getTotalRankSaleData();
    }

    // Method to fetch total hourly sales data
    public async getTotalHourlySalesData(): Promise<Array<{ [key in Titles]?: string }>> {
        return this.Table.getTotalHourlySalesData();
    }
}