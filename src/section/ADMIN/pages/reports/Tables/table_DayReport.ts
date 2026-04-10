import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";


export type Titles = 
    'Category' | 'Hits' | 'Net Amount' | 'Column %' | 
    'Cost Amount' | 'Margin %' | 'Markup %' | 'Discount Amount' | 
    'Miscellaneous' | 'TOTAL TAXABLE' | 'TOTAL NONTAXABLE' | 'Total Discount' |
    'Sales Tax' | 'TOTAL SALES' | 'Lotto Sales' | 'Online Lottery Sales' | 
    'Coupon Sale ($)' | 'Coupon Sale (%)' | 'House Account Pay' | 'Fee Sales' | 
    'Sale Rounding' | 'Bottle Deposit' | 'Deposit Return' | 'TOTAL REGISTER' |
    'cash' | 'Lotto Payout' | 'Cash Payout' | 'Online Payout' | 'TOTAL TENDERED' |
    'HighTax' | 'NoTax' | 'TOTAL TAX' | 'Rank' | 'Total Hourly Sales' | 
    'Device' | 'Device ID' | 'Date Created' | 'Taking' | 'TotalCount' | 'Balance';

    export class Table_DayReport extends BaseTable<Titles>{

        constructor(locator: Locator){
            super(locator)
        }
    
        public async getCategoryData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("Category");
        }
    
        public async getRankData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("Rank");
        }
    
        public async getMiscellaneousData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("Miscellaneous");
        }
    
        public async getTotalTaxableData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("TOTAL TAXABLE");
        }
    
        public async getNontaxableData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("TOTAL NONTAXABLE");
        }
    
        public async getTotalSalesData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("TOTAL SALES");
        }
    
        public async getTotalRegisterData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("TOTAL REGISTER");
        }
    
        // Method to inspect section titles for debugging purposes
        public async inspectSectionTitles(): Promise<void> {
            const footersPresent = await this._locator.locator('tfoot').count();
            const bodiesPresent = await this._locator.locator('tbody').count();
    
            // console.log(`Number of 'tfoot' elements found: ${footersPresent}`);
            // console.log(`Number of 'tbody' elements found: ${bodiesPresent}`);
    
            if (footersPresent === 0 && bodiesPresent === 0) {
                throw new Error("No 'tfoot' or 'tbody' elements found in the DOM.");
            }
    
            // Log all section titles found
            const footers = await this._locator.locator('tfoot th, tbody th').allTextContents();
            // console.log("All section titles found in tfoot/tbody:", footers);
        }

    
        public async getTotalTenderedData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("TOTAL TENDERED");
        }
    
        public async getTotalTaxData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("TOTAL TAX");
        }
    
        public async getTotalRankSaleData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("TOTAL RANK SALE");
        }
    
        public async getTotalHourlySalesData(): Promise<Array<{ [key in Titles]?: string }>> {
            return this.getSectionData("Total Hourly Sales");
        }
    
        // Example method to fetch data based on hour
        public async getTotalHourlySales(hour: string): Promise<string> {
            return this.GetCellValue({ getValueFrom: 'Net Amount' },  { rowQuery: [{ rowColumn: 'Category', rowValue: hour }]});
        }
    }