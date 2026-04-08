import { AdminAccess, AdminDashboard } from "../../../src/API/useCases/ADMIN";
import { iScenario, CATEGORYGROUPS, CATEGORIES, ITEMS } from "../../../src/utils";
import { CUSTOMER } from "../../../src/utils/data/data.customer";
import { TAXITEMS, TAXRULES } from "../../../src/utils/data/data.taxes";

export const GeneralData: iScenario = {
    POS: {
        General: {
            ShowCustomerNumber: true,
        }
    },
    Admin: {
        Customers: [
            { // Customer with loyalty points
                Name: CUSTOMER.WITH_LOYALTY_POINTS.Name,
                Mobile: CUSTOMER.WITH_LOYALTY_POINTS.Mobile,
                Email: CUSTOMER.WITH_LOYALTY_POINTS.Email,
                DOB: CUSTOMER.WITH_LOYALTY_POINTS.DOB,
                Address: CUSTOMER.WITH_LOYALTY_POINTS.Address,
                ZipCode: CUSTOMER.WITH_LOYALTY_POINTS.ZipCode,
                Points: CUSTOMER.WITH_LOYALTY_POINTS.Points,
                MaxAmountOfBalance: CUSTOMER.WITH_LOYALTY_POINTS.MaxAmountOfBalance,
            },
            { // Customer without loyalty points
                Name: CUSTOMER.NO_LOYALTY_POINTS.Name,
                Mobile: CUSTOMER.NO_LOYALTY_POINTS.Mobile,
                Email: CUSTOMER.NO_LOYALTY_POINTS.Email,
                DOB: CUSTOMER.NO_LOYALTY_POINTS.DOB,
                Address: CUSTOMER.NO_LOYALTY_POINTS.Address,
                ZipCode: CUSTOMER.NO_LOYALTY_POINTS.ZipCode,
                Points: CUSTOMER.NO_LOYALTY_POINTS.Points,
                MaxAmountOfBalance: CUSTOMER.NO_LOYALTY_POINTS.MaxAmountOfBalance,
            }
        ],
        Settings: {
            DevicesAndLocations: {
                Devices: [
                    {
                        Name: 'Register1',
                        Location: 'Inventory',
                    },
                ],
                Locations: [
                    {
                        Name: 'Inventory',
                    },
                ],
            },
            StaffAndAdmins: [
                {
                    Username: 'register',
                    Password: '38076b9a1a153ff3bcfa0d4e6d89b6d9f1895578e0194911bce3a2d248bfe005',
                    Permissions: {
                        Dashboard: {
                            AdminAccess: AdminAccess.Yes,
                            AdminDashboard: AdminDashboard.Both
                        },
                        POSPermissions: {
                            AllowExchange_Refund: {Allow: true},
                            ApplyDiscount: {Allow: false},
                            RemoveItemsFromTran: {Allow: true}
                        }
                    }
                }
            ],
            AccountingSettings: {
                TaxItems: [
                    TAXITEMS['NewTaxItem']
                ],
                TaxRules: [
                    TAXRULES['NewTaxRule'],
                    TAXRULES['MultiExclisiveTax'],
                    TAXRULES['MultiInclusiveTax'],
                    TAXRULES['InclusiveTax'],
                    TAXRULES['ExclusiveTax'],
                ],
                BottleDeposit_Enable:true,
                AdditionalFees: [
                    {
                        Name: 'TAXABLE ADDITIONAL FEE',
                        Type: 'percentage',
                        Value: 5,
                        Taxable: true
                    },
                    {
                        Name: 'NON-TAXABLE ADDITIONAL FEE',
                        Type: 'percentage',
                        Value: 5,
                        Taxable: false
                    }
                ]
            },
            POSSettings: {
                SaleOptions: {
                    AllowNegativeItemPrices: true,
                    AllowCashierToApplyDiscount: false,
                    HideVoidOption: false,
                }
            },
            GeneralSettings: {
                TenderSettings: {
                  SideCard: true
                },
                loyaltysettings: {
                    loyaltystatus: true,
                    pointdollarratio: "1"
                  },
            }
        },
        Items: {
            CategoryGroups: [
                { // CATEGORY GROUP WITH AGE
                    Name: CATEGORYGROUPS.AGE
                },
                { // CATEGORY GROUP WIHOUT AGE
                    Name: CATEGORYGROUPS.NO_AGE
                },
                {
                    Name: CATEGORYGROUPS.LIQUOR
                },
            ],
            Categories: [
                { // CAGETORY WITH AGE
                    Name: CATEGORIES.AGE.Name,
                    AgeVerification: CATEGORIES.AGE.AgeVerification,
                    CategoryGroup: CATEGORIES.AGE.CategoryGroup
                },
                { // CATEGORY WITHOUT AGE
                    Name: CATEGORIES.NO_AGE.Name,
                    CategoryGroup: CATEGORIES.NO_AGE.CategoryGroup
                },
                {
                    //CATEGORY WITHOUT DUAL PRICE SETTING ENABLED
                    Name: CATEGORIES.LIQUOR.Name,
                    CategoryGroup: CATEGORIES.LIQUOR.CategoryGroup,
                    ExcludeNonCashAdj:true,
                },
            ]
        }
    }
}