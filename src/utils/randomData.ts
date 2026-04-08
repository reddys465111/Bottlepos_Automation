
import { Page } from "@playwright/test";
import { faker, simpleFaker } from "@faker-js/faker";

export class FakeData {
    private _page: Page;
    constructor(private page: Page) {
        this._page = page;
    }

    /**
     * Return a random number
     * @param length - The length of the number to be generated
     * @returns - A random number
     * @example - getMobile() // returns a 10 digit random number
     * @example - getMobile(1000000) // returns a random number with a length of 7 digits
     */
    async getMobile(length?: number) {
        await this._page.waitForTimeout(1500);

        if (length) {
        return simpleFaker.number.int(length);
        }

        // Default: 10-digit number
        return simpleFaker.number.int({ min: 1000000000, max: 9999999999 });
    }

    /**
     * Return a fake full name 
     * @returns - A random full name
     * @example - getCustomer() // returns a random full name
     */
    async getName() {
        await this._page.waitForTimeout(1500);
        return faker.person.fullName();
    }

    /**
     * Return a fake email
     * @returns - A random email
     * @example - getEmail() // returns a random email
     */
    async getEmail() {
        await this.page.waitForTimeout(1500);
        return faker.internet.email().toLowerCase();
    }

    /**
     * Return a fake address
     * @returns - A random address
     * @example - getAddress() // returns a random address
     */
    async getAddress() {
        await this._page.waitForTimeout(1500);
        return faker.location.streetAddress();
    }

    /**
     * Return a fake company name
     * @returns - A random company name
     * @example - getCompany() // returns a random company name
     */
    async getCompany() {
        await this._page.waitForTimeout(1500);
        return faker.company.name();
    }

    /**
     * Return a random number
     * @param length - The length of the number to be generated
     * @returns - A random number
     * @example - getItemBarcode() // returns a random number
     * @example - getItemBarcode(1000000) // returns a random number with a length of 7 digits
     */
    async getItemBarcode(length?: number) {
        await this._page.waitForTimeout(1500);

        if (length) {
        return simpleFaker.number.int(length);
        }

        // Default: 10-digit number
        return simpleFaker.number.int({ min: 1000000000, max: 9999999999 });
    }

    /**
     * Return a fake item name
     * @returns - A random item name
     * @example - getItemName() // returns a random item name
     */
    async getItemName() {
        await this._page.waitForTimeout(1500);
        return {
            name: String(faker.commerce.productName()).toUpperCase(),
            shortName: String(faker.commerce.productName().slice(0, 4)).toUpperCase(),
            barcode: this.getItemBarcode().toString(),
        }
    }

    /**
     * Return a fake item price
     * @returns - A random item price
     * @example - getItemPrice() // returns a random item price
     */
    async getItemPrice() {
        await this._page.waitForTimeout(1500);
        return faker.commerce.price();
    }

    /**
     * Return a fake date of birth
     * @returns - A random date of birth
     * @example - getDOB() // returns a random date of birth
     */
    async getDOB(option?: {format: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MMDDYYYY' | 'DDMMYYYY' | 'YYYYMMDD'}) {
        await this._page.waitForTimeout(1500);
        const date = faker.date.birthdate();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        
        const format = option?.format || 'MM/DD/YYYY';
        
        switch (format) {
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'MMDDYYYY':
                return `${month}${day}${year}`;
            case 'DDMMYYYY':
                return `${day}${month}${year}`;
            case 'YYYYMMDD':
                return `${year}${month}${day}`;
            default:
                return `${month}/${day}/${year}`;
        }
    }

    /**
     * Return a fake zipcode
     * @returns - A random zipcode
     * @example - getZipcode() // returns a random zipcode
     */
    async getZipcode() {
        await this._page.waitForTimeout(1500);
        return faker.location.zipCode();
    }
}
