
export interface EntityDayReport {
    /** */
    "TOTAL_TAXABLE"?: EntityDayReport_Taxable,
    "TOTAL_NONTAXABLE"?: EntityDayReport_Taxable,
    "TOTAL_SALES"?: EntityDayReport_TotalSales,
    "TOTAL_REGISTER"?: EntityDayReport_TotalRegister,
    "TOTAL_TENDERED"?: EntityDayReport_TotalTendered,
    "TOTAL_CASH"?: {},
    "TOTAL"?: EntityDayReport_Total,
    "TOTAL_RANK_SALE"?: EntityDayReport_TotalRankSale,
    "Total_Hourly_Sales"?: {}

}

// export interface DayReport_Details {
//     TotalDiscount: { Hits: string, NetAmount: string },
//     CustomerReturns: { Hits: string, NetAmount: string },
//     VoidItems: { Hits: string, NetAmount: string },
// }


export interface EntityDayReport_Taxable {
    Name?: string,
    Hits: number,
    NetAmount: number,
    CostAmount?: number,
    Margin?: number,
    Markup?: number,
    DiscountAmount?: number,
    Category: { [key: string]: EntityDayReport_Taxable }
}
export interface EntityDayReport_TotalSales {
    Name?: string,
    Hits: number,
    NetAmount: number,
    CostAmount?: number,
    Margin?: number,
    Markup?: number,
    DiscountAmount?: number,
    Category: { [key: string]: { Hits: number, NetAmount: number } }
}
export interface EntityDayReport_TotalRegister {
    Hits: number,
    NetAmount: number,
    Category: { [key: string]: { Hits: number, NetAmount: number } }
}

export interface EntityDayReport_TotalTendered {
    Hits?: number,
    Expected?: number
    Category: { [key: string]: { Hits: number, Expected: number } }
}

export interface EntityDayReport_TotalCash {
    DeviceID: number,
    DateCreated: string,
    Taking: string,
    TotalCount: string,
    Balance: string,
    Devices: { [key: string]: EntityDayReport_TotalCash }
}

export interface EntityDayReport_Total {
    Items: number,
    SaleSubtotal: string,
    Tax: string,
    RefundSubtotal: string,
    TotalTax: string,
    Taxes: { [key: string]: EntityDayReport_Total }
}


export interface EntityDayReport_TotalRankSale {
    Hits: number,
    NetAmount: number,
    CostAmount: number,
    Margin: number,
    Markup: number,
    DiscountAmount: number,
    Ranks: { [key: string]: EntityDayReport_TotalRankSale }
}

export interface EntityDayReport_TotalHourlySales {
    // Title: string,
    Qty: number,
    NetAmount: string
    Detail: { [key: string]: EntityDayReport_TotalHourlySales }
}