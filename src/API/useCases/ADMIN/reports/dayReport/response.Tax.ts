export interface DayReportTaxResponse {
    errorCode: string;
    error: string;
    data: DayReportTaxResponseData;
}

export interface DayReportTaxResponseData {
    taxdata: DayReportTaxdata;
}

export interface DayReportTaxdata {
    errorCode: string;
    error: string;
    data: { [key: string]: DayReportTax };
}

export interface DayReportTax {
    refs: string;
    name: string;
    qty: string;
    total: string;
    qtyitems: number;
    saletotal: number;
    refundtotal: number;
    saletax: number;
    refundtax: number;
    balance: number;
}
















