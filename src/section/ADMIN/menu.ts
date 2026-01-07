import { Locator, Page } from "@playwright/test";
import { BaseObject } from "../../base/baseObject";
import { Loader } from "../../objects/loader";
 
export class Menu{
    private _locator: Locator;
    public Dashboard: MenuItem;
    public Realtime: MenuItem;
    public Reports: MenuItem;
    public Graph: MenuItem;
    public Assistant: MenuItem;
    public POSSales: MenuItem;
    public Customers: MenuItem;
    public Tasks: MenuItem;
 
    // ACCOUNTING
    // public Accounting: MenuItem;
        public Closing: MenuItem;
        public Expense: MenuItem;
        public ClockInOut: MenuItem;
   
   
    // ITEMS
    // private Parent_Items: MenuItem;
        public Items: MenuItem;
        public Inventory: MenuItem;
        public Categories: MenuItem;
        public Suppliers: MenuItem;
        public Receive: MenuItem;
        public Transfer: MenuItem;
        public Order: MenuItem;
   
    // SETTINGS
    // private Parent_Settings: MenuItem;
        public Staff_Admins: MenuItem;
        public Stores: MenuItem;
        public Devices_Locatios: MenuItem;
        public General_Settings: MenuItem;
        public POS_Settings: MenuItem;
        public Webstore_Settings: MenuItem;
        public Invoice_Settings: MenuItem;
        public Accounting_Settings: MenuItem;
        public Scan_Data_Program: MenuItem;
        public Utilities: MenuItem;
 
    // private Parent_Help: MenuItem;
        public Help_Articles: MenuItem;
        public Suggest_Feature: MenuItem;
 
    constructor(page: Page, locator: Locator){
        this._locator = locator;
        // MenuLocator = locator;
        this.Dashboard = new MenuItem(page, this._locator.locator('#menudashboard'));
        this.Realtime =  new MenuItem(page, this._locator.locator('#menurealtime'));
        this.Reports =  new MenuItem(page, this._locator.locator('#menureports'));
        this.Graph =  new MenuItem(page, this._locator.locator('#menugraph'));
        this.Assistant =  new MenuItem(page, this._locator.locator('#menuassistant'));
        this.POSSales =  new MenuItem(page, this._locator.locator('#menusales'));
        this.Customers =  new MenuItem(page, this._locator.locator('#menucustomers'));
        this.Tasks =  new MenuItem(page, this._locator.locator('#menutasks'));
       
        const accountingParent = new MenuItem(page, this._locator.locator('#menuaccounting'));
        this.Closing= new MenuItem(page, this._locator.locator('#menuclosing'), accountingParent);
        this.Expense= new MenuItem(page, this._locator.locator('#menuexpense'), accountingParent);
        this.ClockInOut= new MenuItem(page, this._locator.locator('#menuclockinout'), accountingParent)
 
        const itemsParent = new MenuItem(page, this._locator.locator('#menuparentitems'));
        this.Items = new MenuItem(page, this._locator.locator('#menuitems'), itemsParent);
        this.Inventory= new MenuItem(page, this._locator.locator('#menustock'), itemsParent);
        this.Categories= new MenuItem(page, this._locator.locator('#menucategories'), itemsParent);
        this.Suppliers= new MenuItem(page, this._locator.locator('#menusuppliers'), itemsParent);
        this.Receive= new MenuItem(page, this._locator.locator('#menureceive'), itemsParent);
        this.Transfer= new MenuItem(page, this._locator.locator('#menutransfer'), itemsParent);
        this.Order= new MenuItem(page, this._locator.locator('#menuorder'), itemsParent);
 
        const settingParentLocator = this._locator.locator('#menusettings');
        const settingsParent = new MenuItem(page, settingParentLocator);
        this.Staff_Admins= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href*="staffadmins"]')}), settingsParent); // '), settingsParent);
        this.Stores= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href*="storesdb"]')}), settingsParent);
        this.Devices_Locatios= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href*="devlocations"]')}), settingsParent);
        this.General_Settings= new MenuItem(page, settingParentLocator.locator('[href*=generalsettings]'), settingsParent);
        this.POS_Settings= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href*="possettings"]')}), settingsParent);
        this.Webstore_Settings= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href*="webstoresettings"]')}), settingsParent);
        this.Invoice_Settings= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href*="invoicesettings"]')}), settingsParent);
        this.Accounting_Settings= new MenuItem(page, settingParentLocator.locator('[href*=accountsettings]'), settingsParent);
        this.Scan_Data_Program= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href*="scandata"]')}), settingsParent);
        this.Utilities= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href*="utilities"]')}), settingsParent);
 
        const helpParent = new MenuItem(page, this._locator.locator('#menuhelp'));
        this.Help_Articles= new MenuItem(page, this._locator.locator('li',{has: this._locator.locator('[href="https://help.posnation.com/bottlepos/s/"]')}), helpParent);
        this.Suggest_Feature= new MenuItem(page, this._locator.locator('li', {has: this._locator.locator('[href="#!suggestafeature"]')}), helpParent);
    }
}
 
export class MenuItem extends BaseObject{
    private _parent: MenuItem|null;
    private _page: Page;
    constructor(page: Page, locator: Locator, parent: MenuItem|null = null){
        super(locator);
        this._page = page;
        this._parent = parent;
    }
 
    private async MenuIsCollapsed(): Promise<boolean>{
        try {
            if (this._page.isClosed()) {
                console.warn('Page is closed, skipping MenuIsCollapsed check');
                return false;
            }
            const attr = await this._page.locator('#sidebar').getAttribute('class');
            return attr?.includes('menu-min') ?? false;
        } catch (error) {
            if (error instanceof Error && error.message.includes('closed')) {
                console.warn('Page was closed during MenuIsCollapsed check');
                return false;
            }
            throw error;
        }
    }
 
     /**
     * POS: Go to the selected menu
     */
    public async GoTo(): Promise<void>{
        if (this._page.isClosed()) {
            throw new Error('Target page, context or browser has been closed');
        }
 
        if(this._parent){
          
            if(await this.MenuIsCollapsed()){
                await this._parent.Hover();
            }else{
               
               
                const submenuOpen = await this._parent?._locator.getAttribute('class');
              
                if(submenuOpen?.includes('open')==false){
                    await this._parent.Hover();
                    await this._parent.Click()
                }
            }
        }
        await this.Hover();
        await this.Click();
 
       
        await this._page.waitForTimeout(2500);
       
    }
 
     /**
     * POS: Hover to the menu
     */
    public async Hover(): Promise<void>{
        if (this._page && this._page.isClosed()) {
            throw new Error('Target page, context or browser has been closed');
        }
        try {
            await this._locator.hover();
        } catch (err) {
            if (this._page && this._page.isClosed()) {
                throw new Error('Target page, context or browser has been closed during hover');
            }
            throw err;
        }
    }
 
    /**
     * POS: Click on the menu
     */
    public async Click(): Promise<void>{
 
        await this._locator.click();
    }
}
 
export let MenuLocator: Locator;