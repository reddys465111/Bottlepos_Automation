import { Page } from "@playwright/test";
import { Button } from "../objects/button";
import { Menu } from "./ADMIN/menu";
import { Session, setPOSPage } from "../utils";
import { POS } from "./POS";
import { Reports } from "./ADMIN/pages/reports/reports"
import { Admin_Items } from "./ADMIN/pages/Items/admin_Items";
import { FakeData } from "../utils/randomData";
import { Admin_Suppliers } from "./ADMIN/pages/Items/admin_Suppliers";
import { Dashboard } from "./ADMIN/pages/dashboard";

import { Admin_Login } from "./ADMIN/adminLogin";
import { Customers } from "./ADMIN/pages/customers/Customers";
import { Loader } from "../objects/loader";
import { Realtime } from "./ADMIN/pages/realtime";
import { Tasks } from "./ADMIN/pages/tasks/tasks";
import { Dialog } from "./ADMIN/dialogs/dialog";
import { AccountingSettings } from "./ADMIN/pages/settings/accountingSetting";
import { GeneralSettings } from "./ADMIN/pages/generalSettings/generalSettings";
import { Admin_Recieve } from "./ADMIN/pages/Items/admin_Receive";
import { Admin_Order } from "./ADMIN/pages/Items/admin_Order";
import { Expense } from "./ADMIN/pages/accounting/expense";
import { Admin_Inventory } from "./ADMIN/pages/Items/admin_Inventory";
import { Admin_Categories } from "./ADMIN/pages/Items/admin_Categories";


export class AdminPortal {
    public Menu!: Menu;
    public Dashboard!: Dashboard;
    public Refresh!: Button;
    public Realtime!: Realtime;
    public Login!: Admin_Login;
    public Logout!: Button;
    public Reports!: Reports;
    public Items!: Admin_Items;
    public Recieve!: Admin_Recieve;
    public Order!: Admin_Order;
    public Suppliers!: Admin_Suppliers;
    public Dialog!: Dialog;
    public Customers!: Customers;
    public Tasks!: Tasks;
    private _page!: Page;
    public FakeData!: FakeData;
    private _device!: string;
    public Loader!: Loader;
    public Expense!: Expense
    public Inventory!: Admin_Inventory;
    public Category!: Admin_Categories;

    public Settings!: {
        AccountingSettings: AccountingSettings;
        GeneralSettings: GeneralSettings;
    }
    
    constructor() {

    }

    public get Page(): Page {
        return this._page;
    }

    public async Initialize(page: Page, device: string): Promise<void> {
        this._page = page;
        this._device = device;
        this.Loader = new Loader(this._page);
        this.Logout = new Button(this._page.locator('.logout_btn'));
        this.Login = new Admin_Login(this._page);
        this.Menu = new Menu(page, this._page.locator('#sidebar'));
        this.Refresh = new Button(this._page.getByRole('button', { name: 'Refresh' }));
        this.Dialog = new Dialog(this._page);
        this.Reports = new Reports(page);
        this.Dashboard = new Dashboard(page);
        this.Realtime = new Realtime(page);
        this.Items = new Admin_Items(page);
        this.Recieve = new Admin_Recieve(page);
        this.Order = new Admin_Order(page);
        this.Suppliers = new Admin_Suppliers(page);
        this.Customers = new Customers(page);
        this.Tasks = new Tasks(page);
        this.Expense = new Expense(page);
        this.FakeData = new FakeData(page);
        this.Inventory = new Admin_Inventory(page);
        this.Category = new Admin_Categories(page);
        this.Settings = {
            AccountingSettings: new AccountingSettings(page),
            GeneralSettings:new GeneralSettings(page)
        }
      
    }

    public async Close(): Promise<void> {
        await this._page.close();
        setPOSPage();
    }

    /**
     * Changes the current page to the POS interface.
     * @param credentials Optional credentials for logging into the POS.
    */
    public async ChangeToPOS(credentials?: { user: string, password?: string, device?: string, location?: string }): Promise<void> {
        await this._page.goto(Session.URL);
        POS.Initialize(this._page, this._device);
        await POS.Login.In(credentials);
    }

   
    // public async Login(options?: { user: string, password?: string }): Promise<void> {

    //     await this._page.locator("#loginbox").waitFor();
    //     await this._page.locator('#loguser').fill(options?.user ?? Session.User);
    //     await this._page.locator('#logpass').fill(options?.password ?? Session.Password);
    //     await this._page.locator("#loginbutton").click();
    //     try {
    //         await this._page.locator("#loginmodal[style*='display: none']").waitFor({ timeout: 5000 });
    //     } catch (e) { }
    // }
    public async waitForTimeout(timeout: number): Promise<void> {
        await this._page.waitForTimeout(timeout);
    }

    public async PageTitle(): Promise<string> {
        return await this._page.title();
    }

    public async PressEnter(): Promise<void> {
        await this._page.keyboard.press('Enter');
    }
}

export const ADMIN = new AdminPortal();
