import { BrowserContext, Page, TestInfo } from "@playwright/test";
import { test } from '@playwright/test';
import { randomUUID } from "crypto";
import { ADMIN } from "../section/ADMIN";
import { POS } from "../section/POS";
import { EnvironmentSessions, Session } from ".";
import { iScenario } from "./iScenario";
import { Authenticate, Logout } from "../API/useCases/auth/useCase.Auth";
import { Payfac } from "../paymentDevices/payfac/payfac";
import { DeviceAndLocation_LoadArgs } from "../API/useCases/ADMIN/settings/deviceAndLocations/deviceAndLocations";
import { Items_LoadArgs } from "../API/useCases/ADMIN/items/useCase.Items";
import { AccountingSettings_LoadArgs, GeneralSettings_LoadArgs, StaffAdmin_LoadArgs } from "../API/useCases/ADMIN";
import { POSSettings_LoadArgs } from "../API/useCases/ADMIN/settings/posSettings/useCase.POSSettings";
import { Device_Get } from "../API/useCases/ADMIN/settings/deviceAndLocations/devices";
import { Location_Get } from "../API/useCases/ADMIN/settings/deviceAndLocations/locations";
import { POSGeneralSettings_Update } from "../API/useCases/POS/Settings/useCase.Settings";
import { Customers_LoadArgs } from "../API/useCases/ADMIN/customer/useCase.Customer";

export interface initArgs {
    context?: BrowserContext
    Environment?: string;
    URL?: string,
    Admin?: boolean,
    // User?: string,
    // Password?: string,
    API?: {
        enable?: boolean
        password?: string,
        headers?: string,
        URL?: string
    },
    credentials?: {
        User?: string,
        Password?: string,
        Device?: LocationDeviceSetup,
        Location?: LocationDeviceSetup
    }
    // Location?: LocationDeviceSetup,
    // Device?: LocationDeviceSetup,
    device?: {view: 'desktop' | 'mobile', width?: number, height?: number},
    Scenario?: iScenario,
}

export type LocationDeviceSetup = {
    Name?: string,
    Index?: number
}

class InitializerClass {

    private _page!: Page;
    private _context!: BrowserContext;
    private _environment: string = 'AUTO';

    public setContext(context: BrowserContext) {
        this._context = context;
    }
    public GetContext(): BrowserContext {
        if (this._context === undefined) {
            throw new Error("Browser context is not initialized");
        }
        return this._context;
    }
    public SetPage(page: Page) {
        this._page = page;
    }

    public GetPage(): Page {
        if (this._page === undefined) {
            throw new Error("Page is not initialized");

        }
        return this._page!;
    }

    public SetEnvironment(environment: string) {
        this._environment = environment;
    }

    public GetEnvironment(): string {
        return this._environment;
    }

    public async Finalize(page: Page, testInfo: TestInfo): Promise<void> {
        // if the test fail take a screenshot and save the image in the 
        // folder test-results/screenshots/
        if (testInfo.status !== testInfo.expectedStatus) {
            let screenshotPath = `test-results/screenshots/screenshot-${randomUUID()}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });

            await testInfo.attach(testInfo.title, 
            {
                body: await page.screenshot({ fullPage: true }), 
                contentType : 'image/png' 
            });
        }
    }

    public async InitData(args?: initArgs): Promise<void> {
        this._environment = args?.Environment ?? 'AUTO';
        await this.LoadCredentials(args);
        Session.URL = args?.URL ?? process.env.POS_URL ?? EnvironmentSessions[this._environment].URL;
        await this.LoadScenario(args?.Scenario);
    }
    
    public async Init(page: Page, args?: initArgs): Promise<void> {
        
        this.SetPage(page);
        if (args?.device?.view === 'mobile') {
            setMobile(true);
            await page.setViewportSize({ width: args.device.width ?? 500, height: args.device.height ?? 844 });
        }
        if (args?.context) {
            this.setContext(args.context);
        } else {
            this.setContext(page.context());
        }
        this._environment = args?.Environment ?? 'AUTO';
        await this.LoadCredentials(args);
        await this.LoadURL(page, args);
        await this.LoadScenario(args?.Scenario);
        if (args?.Admin!==undefined && args.Admin){
            ADMIN.Initialize(page, args?.device?.view?? 'desktop');
        }
        else{
            POS.Initialize(page, args?.device?.view ?? 'desktop');
        }
        test.slow();
    }

    private async LoadURL(page: Page, args?: initArgs): Promise<void> {    
        Session.URL = args?.URL ?? process.env.POS_URL ?? EnvironmentSessions[this._environment].URL;
        let adminUrl = args?.Admin ? Session.URL + "/admin" : Session.URL;
        await page.goto(adminUrl, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        // Wait for application to be ready
        await page.waitForLoadState('networkidle', { timeout: 60000 });
        // await page.waitForTimeout(1000);

        if (!args?.Admin) {
            const appToggleButton = await this._page.getByTestId('toggle-ui-version-button');
            const buttonLabel = await appToggleButton.textContent();

            if (buttonLabel && buttonLabel.trim() === 'Legacy') {
            await appToggleButton.click();
            }
        }
    }

    public async LoadCredentials(args?: initArgs): Promise<void> {
        Session.User = args?.credentials?.User ?? (process.env.POS_USER ?? EnvironmentSessions[this._environment].USR);
        Session.Password = args?.credentials?.Password ?? (process.env.POS_PASSWORD ?? EnvironmentSessions[this._environment].PSW);
        Session.Device.Name = args?.credentials?.Device?.Name ?? (process.env.POS_DEVICE_NAME ?? EnvironmentSessions[this._environment].DEVICE.Name);
        Session.Device.Index = args?.credentials?.Device?.Index ?? ((process.env.POS_DEVICE_INDEX ? Number.parseInt(process.env.POS_DEVICE_INDEX) : undefined) ?? EnvironmentSessions[this._environment].DEVICE.Index);
        Session.Location.Name = args?.credentials?.Location?.Name ?? (process.env.POS_LOCATION_NAME ?? EnvironmentSessions[this._environment].LOCATION.Name);
        Session.Location.Index = args?.credentials?.Location?.Index ?? ((process.env.POS_LOCATION_INDEX ? Number.parseInt(process.env.POS_LOCATION_INDEX) : undefined) ?? EnvironmentSessions[this._environment].LOCATION.Index);

        //API
        Session.API.PSW = args?.API?.password ?? process.env.API_PASSWORD ?? EnvironmentSessions[this._environment].API.PSW;
        Session.API.Headers = args?.API?.headers ?? process.env.API_HEADERS ?? EnvironmentSessions[this._environment].API.HEADERS;
        Session.API.URL = args?.API?.URL ?? process.env.API_URL ?? EnvironmentSessions[this._environment].API.URL;
    }

    public async LoadScenario(args?: iScenario): Promise<void> {
        if (args) {
            await Authenticate();
            
            const deviceId = await Device_Get(Session.Device.Name);
            const locationId = await Location_Get(Session.Location.Name);

            Session.Location.Id = locationId?.id!;
            Session.Device.Id = deviceId?.id!;

            args?.Admin?.Settings?.StaffAndAdmins && await StaffAdmin_LoadArgs(args.Admin.Settings.StaffAndAdmins);
            args.Admin?.Settings?.AccountingSettings && await AccountingSettings_LoadArgs(args.Admin.Settings.AccountingSettings);

            args.Admin?.Settings?.GeneralSettings && await GeneralSettings_LoadArgs(args.Admin.Settings.GeneralSettings);
            // args.Scenario.Admin?.Settings?.AccountingSettings && await EditAccountSettings( args.Scenario.Admin.Settings.AccountingSettings );

            args.Admin?.Settings?.DevicesAndLocations && await DeviceAndLocation_LoadArgs(args.Admin.Settings.DevicesAndLocations);
            args.Admin?.Settings?.POSSettings && await POSSettings_LoadArgs(args.Admin.Settings.POSSettings);
            args.Admin?.Items && await Items_LoadArgs(args.Admin.Items);

            args.POS?.General && await POSGeneralSettings_Update(Session.Device.Id, args.POS.General);
            args.Admin?.Customers && await Customers_LoadArgs(args.Admin.Customers);

            await Logout();
        }
    }
}
   
let _isMobile: boolean = false;
export const IsMobile = (): boolean => {
    return _isMobile;
}

export const setMobile = (value: boolean): void => {
    _isMobile = value;
}

export let PAGE: Page;
export let PAGE_BACKUP: Page;

export const setAdminPage = (page: Page) => {
    PAGE_BACKUP = PAGE;
    PAGE = page;
}

export const setPOSPage = () => {
    PAGE = PAGE_BACKUP;
}

export let Initializer = new InitializerClass();


/**
 * Sets the POS to offline or online
 * @param enable {boolean} True if the POS should be offline, false if it should be online
 */
export const Offline = async (enable: boolean) => {
    
    await Initializer.GetPage().waitForTimeout(2500);
    await Initializer.GetContext().setOffline(enable);
    await Initializer.GetPage().waitForTimeout(8000);
}

/**
 * Checks if the POS is offline
 * @returns {Promise<boolean>} True if the POS is offline, false otherwise
 */
export const isOffline = async (): Promise<boolean> => {
    return await Initializer.GetPage().getByTestId('status-indicator-text').innerHTML() === 'POS is Offline';
}

/**
 * Checks if the POS is online
 * @returns {Promise<boolean>} True if the POS is online, false otherwise
 */
export const isOnline = async (): Promise<boolean> => {
    return await Initializer.GetPage().getByTestId('status-indicator-text').innerHTML() === 'POS is Online';
}


export const payfac = new Payfac();
