import {type Page } from '@playwright/test';
import { Legacy_Login } from './POS/legacy_Login';
import { NavigationBar } from './POS/navigationBar';
import { Dialog } from './POS/dialogs/dialog';
import { Register } from './POS/pages/register/register';
import { Sales } from './POS/pages/sales/sales';
import { Reports } from './POS/pages/reports/reports';
import { Settings } from './POS/pages/settings/settings';
import { WebOrders } from './POS/pages/webOrders/webOrders';
import { Button } from '../objects/button';
import { ADMIN } from './ADMIN';
import { Initializer, Session, setAdminPage } from '../utils';
import { Login } from './POS/login';
import { FakeData } from '../utils/randomData';
import { expect } from '@playwright/test';
import { CustomerScreen } from './POS/pages/CustomerScreen/CustomerScreen';
export class BottlePOS {
    public _page!: Page;
    public _device!: string;
    public Dialog!: Dialog;
    public Login!: Legacy_Login;
    public NavigationBar!: NavigationBar;
    public Register!: Register;
    public Sales!: Sales;
    public Reports!: Reports;
    public Settings!: Settings;
    public WebOrders!: WebOrders;
    public CustomerScreenButton!: Button;
    public Admin!: Button;
    public Logout!: Button;
    public FakeData!: FakeData;
    public CustomerScreen!: CustomerScreen;
    
    public constructor() {
    }

    public async waitForTimeout(timeout: number): Promise<void> {
        await this._page.waitForTimeout(timeout);
    }

    public async Initialize(page: Page, device: string):Promise<void> {
        this.setPage(page);
        this._device = device;
        this.Dialog = new Dialog(this._page);
        
        // Enable legacy login with not react UI
        this.Login = new Legacy_Login(this._page); //this.Login = new Login(); //--enable it when the new UI is ready
        this.NavigationBar = new NavigationBar(this._page);
        this.Admin = new Button(this._page.getByRole('button', { name: 'Admin' }));
        this.CustomerScreenButton = new Button(this._page.getByRole('button', { name: 'Customer Screen' }));

        let page1Promise: Promise<Page>;

        this.Admin.SetBeforeEvent(async ()=> {
            page1Promise = this._page.waitForEvent('popup');
        })
        this.Admin.SetAfterEvent(async ()=>{ 
            await this.ChangeToAdmin(page1Promise, device);

            //TODO: Restore when the admin page is correctly loaded
            // setAdminPage(await page1Promise);
            // ADMIN.Initialize(this._page, device);
        });

        this.Register = new Register(this._page, device);
        this.Sales = new Sales(this._page, device);
        this.Reports = new Reports(this._page);
        this.Settings = new Settings(this._page);
        this.WebOrders = new WebOrders(this._page);
        this.Logout = new Button(this._page.getByRole('button', { name: 'Logout' }));
        this.FakeData = new FakeData(this._page);
        this.CustomerScreen = new CustomerScreen(page);

    }

    public setPage(page: Page){
        this._page = page;
    }

    public getPage(): Page{
        return this._page;
    }
    
    public async ChangeToAdmin(page1Promise: Promise<Page>, device: string): Promise<void>{
        
        const adminPage = await page1Promise;
        // await adminPage.goto(Session.URL + '/admin');
        //await adminPage.waitForLoadState('networkidle');
        //Optionally, you can bring focus to the new tab if needed
        await adminPage.bringToFront();
        //Confirm dashboard element is visible in the new tab
        await expect(adminPage).toHaveURL(/admin\/#!dashboard/);
        await adminPage.waitForLoadState('networkidle');
        setAdminPage(adminPage);
        await ADMIN.Initialize(adminPage, device);
    }
    /** 
    * Returns the current page title
    * @returns {Promise<string>} The title of the current page
    **/
     public async getPageTitle(): Promise<string> {
        return await this._page.title();
    }
}

export const POS = new BottlePOS();
export let ADMIN_PAGE: Page|Promise<Page>;