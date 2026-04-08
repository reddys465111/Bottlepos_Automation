

export const EndPoint = {

    AUTH: '/api/auth',
    LogOut: '/api/logout',

    //ITEMS
    Items: {
        Add: '/api/items/add',
        Edit: '/api/items/edit',
        Get: '/api/items/get/server',
        Delete: '/api/items/delete',
    },

    //CUSTOMERS
    Customers: {
        Add: '/api/customers/add',
        Edit: '/api/customers/edit',
        Get: '/api/get/customers/server',
        Delete: '/api/customers/delete',
    },
    //Inventory: 
    Inventory: {
        Add: '/api/stock/add',
        Edit: '/api/stock/edit',
    },
    //CATEGORIES
    Categories: {
        Add: '/api/categories/add',
        Edit: '/api/categories/edit',
        Get: '/api/get/categories/server',
        Delete: '/api/categories/delete',
    },

    //CATEGORY GROUPS
    CategoryGroup: {
        Add: '/api/categories/group/add',
        Edit: '/api/categories/group/edit',
        Get: '/api/categories/group/server',
        Delete: '/api/categories/group/remove',
    },

    // ITEM SIZES
    Sizes: {
        Add: '/api/itemsizes/add',
        Edit: '/api/itemsizes/edit',
        Get: '/api/itemsizes/get',
        Delete: '/api/itemsizes/delete'
    },

    // ITEM PROMOTIONS
    Promotions: {
        Add: '/api/stock/promotions/set',
        Edit: '/api/stock/promotions/edit',
        Get: '/api/stock/promotions/get',
        Delete: '/api/stock/promotions/delete',
        All: '/api/stock/promotions/get'
    },

    //TAX ITEMS
    TaxItem: {
        Add: '/api/tax/items/add',
        Edit: '/api/tax/items/edit',
        Delete: '/api/tax/items/delete',
    },

    // TAX RULES
    TaxRule: {
        Add: '/api/tax/rules/add',
        Edit: '/api/tax/rules/edit',
        delete: '/api/tax/rules/delete',
    },

    //BottleDeposit
    BottleDeposit: {
        Add: '/api/itemdeposit/add',
        Edit: '/api/itemdeposit/edit',
        delete: '/api/itemdeposit/delete',
        Get: '/api/itemdeposit/server'

    },

    //AdditionalFees
    AdditionalFees: {
        Add: '/api/additionalcharges/add',
        Edit: '/api/additionalcharges/edit',
        Get: '/api/additional_charges/get',
        Delete: '/api/additionalcharges/delete',
    },

    //Staff & Admin
    StaffAdmin: {
        Disable: '/api/users/disable',
        Edit: '/api/users/edit',
        Add: '/api/users/add',
        Delete: '/api/users/delete',
        List: '/api/users/get?',

    },

    //AccountSettings
    AccountingSettings: {
        Get: '/api/settings/pos/get',
        Edit: '/api/settings/pos/set',
    },

    // SETTINGS
    AdminConfig: {
        Get: '/api/adminconfig/get', //'/api/adminconfig/get?_=',
    },

    GeneralSettings: {
        Get: '/api/settings/general/get?_=',
        Edit: '/api/settings/general/set',
    },

    POSSettings: {
        Edit: '/api/settings/pos/set',
        Get: '/api/settings/pos/get'
    },

    //DeviceAndLocations
    Locations: {
        Add: '/api/locations/add',
        Delete: '/api/locations/delete',
        Get: '/api/locations/get/server',
        Edit: '/api/locations/edit',
        Disable: '/api/locations/disable'
    },
    Devices: {
        Add: '/api/devices/add',
        Get: '/api/devices/get/server',
        Edit: '/api/devices/edit',
        Disable: '/api/devices/disable',
        Delete: '/api/devices/delete'
    },
    DeviceAndLocation: {
        Get: '/api/multi',
    },

    Reports: {
        DayReport: {
            daySelling: '/api/stats/dayselling',
            reportOverview: '/api/stats/dayReportOverview',
            countTakings: '/api/stats/dayReportCountTakings',
            saleNote: '/api/stats/dayreportsalenote',
            deviceBreakDown: '/api/stats/dayReportDeviceBreakDown',
            hourly: '/api/stats/dayReportHourly',
            tax: '/api/stats/dayreporttax'
        },
        Summary: {
            Get: '/api/stats/general'
        }
    },

    Sales: {
        Add: '/api/sales/add',
    },

    POS: {
        Config: {
            Get: '/api/config/get',
        },
        Settings: {
            Update: '/api/lconfig/update',
            Get: '/api/lconfig/get'
        },
        GiftCards: {
            Get: '/api/gift-cards',
            Create: '/api/gift-cards',
            Login: '/api/giftcard/loginAccount',
            Transactions: '/api/transactions',
        }
    }

}