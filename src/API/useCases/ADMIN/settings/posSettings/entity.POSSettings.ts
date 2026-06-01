export enum DefaultTemplate {
    DefaultReceipt = '4',
    MixedLanguage = '5',
    AlternateLanguage = '6',
    PaxDefaultReceipt = '19'

}

// export type FontSize = '10px'|'11px'|'12px'|'13px'|'14px'|'15px'|'16px'|'17px'|'18px'|'19px'|'20px'|'21px'|'22px'|'23px'|'24px'|'25px'|'26px'|'27px'|'28px'|'29px'|'30px'|'31px'|'32px'|'33px'|'34px'|'35px'|'36px'|'37px'|'38px'|'39px'|'40px'|'41px'|'42px'|'43px'|'44px'|'45px'|'46px'|'47px'|'48px'|'49px'|'50px';
export interface EntityPOSSettings {
    Receipt?: {
        DefaultTemplate?: DefaultTemplate,
        HeaderLine2?: string,
        HeaderLine3?: string,
        PrintItemDescription?: boolean,
        PrintItemPrice?: boolean,
        PrintPOSReportFontSize?: '10px'|'11px'|'12px'|'13px'|'14px'|'15px'|'16px'|'17px'|'18px'|'19px'|'20px'|'21px'|'22px'|'23px'|'24px'|'25px'|'26px'|'27px'|'28px'|'29px'|'30px'|'31px'|'32px'|'33px'|'34px'|'35px'|'36px'|'37px'|'38px'|'39px'|'40px'|'41px'|'42px'|'43px'|'44px'|'45px'|'46px'|'47px'|'48px'|'49px'|'50px',
        OpenDrawerForCardAndSideCard?: boolean,
        ShowBalanceCashReconciliation?: boolean,
        PrintSignatureLine?: boolean,
        DoNotPrintTaxOnReceipt?: boolean,
        PrintCustomerDetails?: boolean,
        PrintCustomerName?: boolean,
        PrintCustomerMobile?: boolean,
        PrintCustomerAddress?: boolean,
        Notes?: boolean,
        AddressQROnTheReceipt?: boolean,
        PrintSaleNote?: boolean,
        ReceiptCurrencyCodepage?: number,
        PrintReceiptLogo?: boolean,
        ReceiptCurrencyCharacters?: string,
        // ReceiptPrinterLogo?: string,
        // BrowserEmailLogo?: string,
        ReceiptFooterText?: string,
        PromoQRCode?: string,
    }, 
    POSRecords?: { 
        ForTheLast?: 'day'| 'week' | 'month', //week, day, month
        include?: 'device'|'location'|'all', //device, location, all

    },
    SaleOptions?: { 
        AllowChangingStoredItemPrices?: 'When Price is Blank or 0'|'Always',  //blanck, always
        AllowChangingStoredItemTax?: 'Yes'|'No', //always, no
        CashRounding?: '0'|'5'|'10', //None, 5, 10

        DoNotSaleBelowCost?:    "None"| "Alert"| "Not Allowed" //none, alert, not_allowed
        AllowNegativeItemPrices?: boolean,
        AllowDecimalQTYsale?: boolean,
        AllowCashierToApplyDiscount?: boolean,
        AllowCashierToRefundAndVoid?: boolean,
        AllowCashierToRemoveItems?: boolean,
        HideVoidOption?: boolean,
        HideNoSaleButton?: boolean,
        MustEnterAgeVerificationDate?: boolean,
        DiscountStackingBehavior?: 'Stack Line and Basket Discounts'|'Do Not Stack Discounts', // true, false
        EnableMaximumDiscountLimitPerSale?: boolean,
        MaximumDiscountLimitPerSaleType?: '%'|'$', //percent, dollar
        MaximunDiscountLimitPerSaleAmount?: number
        
    },

    OtherOPtions?: { 
        TobaccoCutOffAge?: number,
        AlcoholCutOffAge?: number,
        EnableLottoButtons?: boolean,
        EnableSuspendRecallButtons?: boolean,
    }
    // POSSearch?: { },
    // CustomerScreen?: { },
    // TVScreen?: { }

}
