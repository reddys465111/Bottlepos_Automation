import { type Locator, type Page } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class DatePicker extends BaseObject {
    private _page: Page;
    
    constructor(locator: Locator, page: Page) {
        super(locator);
        this._page = page;
    }

    /**
     * Opens the date picker by clicking on the date field
     */
    public async open(): Promise<void> {
        await this._locator.click();
    }


    public async selectDay(day: number): Promise<void> {
        await this._page.locator(`.day:not(.old):not(.new):has-text("${day}")`).first().click();
    }

    public async selectMonth(month: number): Promise<void> {
        await this._page.locator(`td:has-text("${month}")`).first().click();
    }

    public async selectYear(year: number): Promise<void> {
        await this._page.locator(`td:has-text("${year}")`).first().click();
    }

    /**
     * Sets the date field directly with a formatted date string
     * @param dateString - Date in mm-dd-yyyy format
     */
    public async setDate(option: {day?: string, month?: string, year?: string}): Promise<void> {
        await this.open();
        option.day && await this.selectDay(Number(option.day));
        option.month && await this.selectMonth(Number(option.month));
        option.year && await this.selectYear(Number(option.year));
    }
}
