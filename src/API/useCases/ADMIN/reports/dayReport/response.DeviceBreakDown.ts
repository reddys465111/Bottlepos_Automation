export interface DayDeviceBreakDownResponse {
    errorCode: string;
    error: string;
    data: DayReportDeviceBreakDownData;
}

export interface DayReportDeviceBreakDownData {
    ranksale: DataRanksale;
}

export interface DataRanksale {
    data: { [key: string]: RankSale };
    total: RankSaleTotal;
}

export interface RankSaleData {
    [key: string]: RankSale;
}

export interface RankSale {
    refs: string;
    refundrefs: string;
    voidtotal: number;
    voidnum: number;
    saletotal: number;
    salenum: string;
    refundtotal: number;
    refundnum: number;
    salecost: string;
    saletax: string;
    salediscount: string;
    refundcost: number;
    refundtax: number;
    refunddiscount: number;
    voidcost: number;
    voidtax: number;
    voiddiscount: number;
    payoutnum: number;
    payoutamount: number;
    name: string;
    salerefs: string;
    balance: string;
    saleprofit: number;
    margin: number;
    markup: number;
}

export interface RankSaleTotal {
    name: string;
    saleprofit: number;
    salenum: number;
    salecost: number;
    saletotal: number;
    salediscount: number;
    margin: number;
    markup: number;
}
