import { type Locator, type Page } from "@playwright/test";
import { BaseObject } from "../base/baseObject";
 
export class TimePicker extends BaseObject {
    private _page: Page;
    private _timePickerLocator: Locator;
    constructor(locator: Locator, page: Page) {
        super(locator);
        this._page = page;
        this._timePickerLocator = this._page.locator('.clockpicker-popover');
    }
 
    /**
     * Opens the time picker by clicking on the time field
     */
    public async open(): Promise<void> {
        await this._locator.click();
    }
 
 
    /**
     * Selects a specific hour
     * @param hour - The hour to select (1-12)
     */
   
    private async selectHour(hour: string): Promise<void> {
        const hourTick = this._timePickerLocator
            .locator('.clockpicker-hours .clockpicker-tick')
            .filter({
                hasText: new RegExp(`^${hour}$`)  // exact match (2 ≠ 12)
            });
 
        // Wait until at least one visible element is available
        await hourTick.first().waitFor({ state: 'visible', timeout: 8000 });
 
        // Click the first visible one
        await hourTick.first().click({ force: true });
    }
 
 
 
    /**
     * Selects a specific minute
     * @param minute - The minute to select (0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55)
     */
   
    private async selectMinute(minute: string): Promise<void> {
        const minuteTick = this._timePickerLocator
            .locator('.clockpicker-minutes .clockpicker-tick', { hasText: minute });
 
        await minuteTick.waitFor({ state: 'visible', timeout: 5000 });
 
        await minuteTick.click({ force: true });
    }
 
 
    /**
     * Selects AM or PM
     * @param period - 'AM' or 'PM'
     */
  
    private async selectPeriod(period: 'AM' | 'PM'): Promise<void> {
        const periodBtn = this._timePickerLocator
            .locator(`.clockpicker-am-pm-block .${period.toLowerCase()}-button`);
 
        await periodBtn.waitFor({ state: 'visible', timeout: 3000 });
 
        await periodBtn.click({ force: true });
    }
 
 
    /**
     * Sets the time with hour, minute, and period
     * @param hour - The hour (1-12)
     * @param minute - The minute (0-59, will be rounded to nearest 5)
     * @param period - 'AM' or 'PM'
     */
    public async setTime(hour: string, minute?: string, period?: 'AM' | 'PM'): Promise<void> {
        const parsedHour = parseInt(hour, 10);
        if (Number.isNaN(parsedHour)) throw new Error(`Invalid hour value: ${hour}`);

        // Resolve period if not provided (treat 12-23 as PM)
        let resolvedPeriod: 'AM' | 'PM' | undefined = period;
        if (!resolvedPeriod) resolvedPeriod = parsedHour >= 12 ? 'PM' : 'AM';

        // Normalize to 12-hour clock (1-12)
        let hour12 = parsedHour % 12;
        if (hour12 === 0) hour12 = 12;

        await this.open();
        await this.selectHour(hour12.toString());
        minute && await this.selectMinute(minute);
        resolvedPeriod && await this.selectPeriod(resolvedPeriod);
        await this.done();
    }
 
 
 
    /**
     * Sets the time to a specific time from a Date object
     * @param date - The date object containing the time
     */
    public async setTimeFromDate(date: Date): Promise<void> {
        const hour = date.getHours();
        const hour12 = hour % 12 || 12;
        const minute = Math.floor(date.getMinutes() / 5) * 5; // Round to nearest 5
        const period = hour >= 12 ? 'PM' : 'AM';
        await this.setTime(hour.toString(), minute.toString(), period);
    }
 
    /**
     * Clicks the Done button to close the time picker
     */
    public async done(): Promise<void> {
        await this._timePickerLocator.getByText('Done').click();
    }
 
    /**
     * Sets the time field directly with a formatted time string
     * @param timeString - Time in HH:MM AM/PM format
     */
    public async setTimeString(timeString: string): Promise<void> {
        await this._locator.fill(timeString);
    }
}
 
 