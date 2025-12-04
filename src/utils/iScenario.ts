

import { EntityAccountSettings, EntityGeneralSettings, EntityPOSSettings, EntityStaffAndAdmin } from "../API/useCases/ADMIN";
import { EntityCustomer } from "../API/useCases/ADMIN/customer/entity.Customer";
import { EntityCategories } from "../API/useCases/ADMIN/items/categories/entity.Categories";
import { EntityCategoryGroup } from "../API/useCases/ADMIN/items/categoryGroups";
import { EntityInventory } from "../API/useCases/ADMIN/items/inventory";
import { EntityItemsData } from "../API/useCases/ADMIN/items/items/entity.Items";
import { EntityPromotions } from "../API/useCases/ADMIN/items/promotions";


import { EntityDevicesData } from "../API/useCases/ADMIN/settings/deviceAndLocations/devices";
import { EntityLocationData } from "../API/useCases/ADMIN/settings/deviceAndLocations/locations/entity.Location";
import { EntityPOSGeneral } from "../API/useCases/POS/Settings/entity.Settings";
import { ISalesPayload } from "../API/useCases/Sales/interface.SalesPayload";



export interface iScenario {
    POS?: {
        General?: EntityPOSGeneral,
        // {
            // UseOnscreen?: boolean,
            // ShowFixedKeypad?: boolean,
            // AutoLaunchCustomerScreen?: boolean,
            // ShowTotalOnCustomerScreen?: boolean,
            // ShowPriceOnCustomerScreen?: boolean,
            // ShowCustomerNumber?: boolean,
            // ShowSaleNotes?: boolean,
            // AlwaysShowShortcuts?: boolean,
            // EnableWebordernotifications?: boolean,
            // HideTotalDetails?: boolean,
            // TasklistNotificationSound?: string,
            // SearchFontSize?: string,
            // POSScreenFontSize?: string,
            // CustomerScreenFontSize?: string,
            // CustomerScreenZoom?: string,
            // BackupOfflineSales?: boolean,
            // ResetLocalConfig?: boolean,
            // ClearLocalData?: boolean,
            // RefreshRemoteData?: boolean,
            // RemoveDeviceRegistration?: boolean,
            // RetryFailedTransactions?: boolean
        // },
        Printing?: {
            // General_AskToPrint?: string,
            // General_AutoHideReceiptDialog?: number,
            // General_NumbersOfReceiptToPrint?: number,
        }
    },
    Admin?: {

        Customers?: EntityCustomer[],
        // Tasks?: EntityTask,
        // Accounting?: {  
        //     Closing?: EntityClosing,
        //     Expense?: EntityExpense,
        //     CLockInOut?: EntityClockInOut,
        // },
        Items?: ScenarioItems,
        Settings?: ScenarioSettings

    }
}

export interface ScenarioItems {
    Items?: EntityItemsData[],
    DeleteItems?: string[],
    Inventory?: EntityInventory[],
    Categories?: EntityCategories[],
    Sizes?: { Name: string, ReplaceName?: string, Delete?: boolean }[],
    CategoryGroups?: EntityCategoryGroup[],
    Promotions?: EntityPromotions[]
    // Supplier?: [EntitySupplier],
    // Receive?: [EntityReceive],
    // Transfer?: [EntityTransfer],
    // Order?: [EntityOrder]
}

export interface ScenarioSettings {
    /**
     * StaffAndAdmins requires a list of users
     * @example  StaffAndAdmins: [
        {username: 'user1', password: '123456789'}, 
        {username: 'user2', Birth: '01/01/1990'}
        ]
     */
    StaffAndAdmins?: EntityStaffAndAdmin[],
    /** Not Implemented Yet */
    // Stores?: {} //[EntityStores],
    /** Not Implemented Yet */
    DevicesAndLocations?: {
        Locations?: EntityLocationData[],
        Devices?: EntityDevicesData[]
    },
    GeneralSettings?: EntityGeneralSettings,
    POSSettings?: EntityPOSSettings,
    /** Not Impmlemented Yet */
    // WebStoreSettings? : {
    // Enable?: boolean
    // },
    /** Not Implemented Yet */
    // InvoiceSettings?: { },

    AccountingSettings?: EntityAccountSettings,
    /** Not Implemented Yet */
    // ScanDataProgram?: { },
    /** Not Implemented Yet */
    // Utilities?: {}
}