import { Timezones } from "../../../../../utils/timezones"


export interface EntityGeneralSettings {
    Formats?: {
        TimeZone?: Timezones,
        DateFormat?: 'd/m/y' | 'm/d/y' | 'Y-m-d', //'Dd/Mm/Yy' | 'Mm/Dd/Yy' | 'Yyyy-Mm-Dd', // 
        CurrencySymbol?: string,
        CurrencyDecimals?: '2' | '3' | '0',
        DecimalSeparator?: ',' | '.',
        ThousandSeparator?: ',' | '.' | ' ',
        SymbolPosition?: 'Before Amount' | 'After Amount' //0, 1
    },
    // BusinessDetails?: {   },
    // AlternateLabels?: { },
    // SMS? : {  },
    // Email? : {  },
    CreditCard?: {
        TriposDirect?: {
            MobileEbtCash?: boolean,
            MobileEbtSales?: boolean,
            Accept?: string,
            ContentType?: string,
            DeveloperKey?: string,
            DeveloperSecret?: string,
            TpApplicationId?: string,
            TpApplicationName?: string,
            TpApplicationVersion?: string,
            TpPromptForSignature?: string,
            TpThresholdAmount?: string,
            Url?: string,
            EbtCash?: boolean,
            EbtSales?: boolean,
        }
        // Tripos?: {  },
        // TriposDirect?: {  },
        Pax?: {
            Enable?: boolean,
            GiftSetting?: {
               [key: string]: string | null
            },
            PaxApplicationName?: string,
            PaxApplicationVersion?: string,
            ConfigurationTimeout?: string,
            ConfigurationPromptForSignature?: 'YES' | 'NO',
            FraudPrevention?: 'Disable' | 'Enable',
            ShowFraudWarningOn?: {
                Manual?: boolean,
                Swipe?: boolean,
                ChipFallBackSwipte?: boolean,
                Scanner?: boolean,
                ContactLess?: boolean,
                Chip?: boolean
            },

            AmountAbove?: string,
            PromptForTips?: boolean,
            // pax_application_version?: string,
            BatchCloseToggle?: boolean,
            CustomOneTip?: string,
            CustomThreeTip?: string,
            CustomTwoTip?: string,
            DebitSales?: boolean,
            EbtCash?: boolean,
            EbtSales?: boolean,
            CustomTips?: {
                enable: boolean,
                tip1: string,
                tip2: string,
                tip3: string
            },

            GiftCard?: boolean,
            GiftCardItemId?: string,
            ShowTroubleshootButton?: boolean,
            Surcharge?: boolean,
            // Show Batch Close Toggle
            // Gift Card
            // DebitSales
            // EBTSales
            // EBTCash: boolean
            // ShowTroubleshootButton: boolean
        },
        // DataCap?: {  },
        PayFac?: {
            Enable?: boolean,
            EbtSales?: boolean,
            EbtCash?: boolean,
            AccountID?: string,
            APIURL?: string,
            AllowManualEntry?: boolean,
            P5Timeout?: string,
            MaxRefundAmount?: string,
            FraudPrevention?: string,
            ShowFraudWarningOn?: {
                Manual?: boolean,
                Swipe?: boolean,
                ChipFallBackSwipte?: boolean,
                Scanner?: boolean,
                ContactLess?: boolean,
                Chip?: boolean
            },
            AmountAbove?: string,
            PromptForTips?: boolean,
            CustomTips?: {
                enable: boolean,
                tip1: string,
                tip2: string,
                tip3: string
            }
        }

    },
    // AutomationSettings?: {  },
    // DefaultimeForReports?: {   },
    TenderSettings?: { 
        SideCard?: boolean,
        Check?: boolean
    },
    // InventorySEttings?: {   },
    loyaltysettings?: {
        loyaltystatus: boolean,
        pointdollarratio: string
    },
    OtherSettings?: {
        UseUPC10?: boolean,
        AllowDuplicateBarcode?: boolean,
        IncludeNonTaxInNetSales?: boolean,
        ShowOtherLocationItemDetails?: boolean,
        HideZeroAMountFromSummaryReport?: boolean,
        AllowImportCSVInReceive?: boolean,
        ItemSalesReportColumnVisible?: {
            CustomerName?: boolean,
            ItemName?: boolean,
            StockCode?: boolean,
            Sold?: boolean,
            Category?: boolean,
            Supplier?: boolean,
            StockLevel?: boolean,
            Price?: boolean,
            Cost?: boolean,
            Profit?: boolean,
            Margin?: boolean,
            Markup?: boolean,
            Discounts?: boolean,
            Tax?: boolean,
            BottleDeposit?: boolean,
            Total?: boolean,
            Refunde?: boolean,
            Balance?: boolean
        }
    },
    GiftCards?: {
        Enable?: boolean,
        Email?: string,
        Password?: string,
        ItemId?: string,
        Expiration?: string,
    }

}