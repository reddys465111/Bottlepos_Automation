export interface DayReportCountTakingResponse {
    errorCode: string;
    error: string;
    data: DayReportCountTakingData;
}

export interface DayReportCountTakingData {
    payData: DayReportCountTakingPayData;
    cashpayout: DayReportCountTakingCashpayout;
}

export interface DayReportCountTakingCashpayout {
    count: number;
    amount: number;
}

export interface DayReportCountTakingPayData {
    cash: DayReportCountTakingCash;
    card: DayReportCountTakingCash
}

export interface DayReportCountTakingCash {
    refs: string;
    saletotal: number;
    tipsamount: string;
    salenum: number;
    payout: string;
    refundrefs: string;
    refundtotal: number;
    refundnum: number;
    payoutamount: number;
    payoutnum: number;
    saletax: number;
    balance: number;
}
