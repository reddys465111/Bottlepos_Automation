export interface DayReportOverviewResponse {
    errorCode: string;
    error: string;
    data: DayReportOverviewData;
}

export interface DayReportOverviewData {
    payout: Payout;
    lottosale: Lottosale;
    feesale: Feesale;
    satax: Satax;
    voiditems: Refund;
    refund: Refund;
    discount: number;
    dicountqty: string;
    itemdepositdata: Itemdepositdata;
    depositreturndata: Depositreturndata;
    onlinepayout: Onlinepayout;
    onlinelotterysale: Onlinelotterysale;
    houseaccountpay: Houseaccountpay;
    couponsale: Couponsale;
    couponpercentsale: Couponsale;
    salerounding: Salerounding;
    addnlrepdata: Addnlrepdata;
    tipsamontobj: Tipsamontobj;
    registerclose: Registerclose;
}

export interface Addnlrepdata {
    additionalchargeslisting: any[];
}

export interface Couponsale {
    couponitemsalenum: string;
    couponitemsaletotal: string;
    couponitemsalediscount: string;
}

export interface Depositreturndata {
    itemdepositreturn: number;
    itemdepositreturncount: number;
}

export interface Feesale {
    feesalenum: string;
    feesaletotal: number;
    feesalediscount: string;
}

export interface Houseaccountpay {
    houseaccountpaynum: string;
    houseaccountpaytotal: number;
    houseaccountpaydiscount: string;
}

export interface Itemdepositdata {
    itemdeposit: number;
    itemdepositcount: number;
}

export interface Lottosale {
    lottosalenum: string;
    lottosaletotal: number;
    lottosalediscount: string;
}

export interface Onlinelotterysale {
    onlinelotterynum: string;
    onlinelottertotal: number;
    onlinelotterydiscount: string;
}

export interface Onlinepayout {
    onlinepaynum: string;
    onlinepaytotal: number;
    onlinepaydiscount: string;
}

export interface Payout {
    payoutnum: string;
    payouttotal: number;
    lottopayoutdiscount: string;
}

export interface Refund {
    numitem: string;
    total: number;
}

export interface Registerclose {
}

export interface Salerounding {
    salesroundingcount: string;
    saleroundingtotal: string;
}

export interface Satax {
    taxtotal: number;
    taxid: number;
}

export interface Tipsamontobj {
    tipsamountcount: string;
    tipsamounttotal: string;
}
