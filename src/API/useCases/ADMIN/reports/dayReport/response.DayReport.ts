export interface DayReportResponse {
    errorCode: string;
    error: string;
    data: ResponseData;
}

export interface ResponseData {
    catData: CatData;
}

export interface CatData {
    nontaxable: Taxable;
    taxable: Taxable;
    total: Taxable_Total;
}

export interface Taxable {
    data: { [key: string]: Taxable_List };
    total: Taxable_Total;
}

export interface Taxable_List {
    data: Taxable_Data[];
    total: Taxable_Total;
}

export interface Taxable_Data {
    name: string;
    hitstotal: string;
    groupid: string;
    catgroupid: null;
    ctax: string;
    payout: string;
    discounttotal: string;
    pricetotal: number;
    taxprice: string;
    itemdeposit: string;
    refundqty: string;
    refundtotal: string;
    costtotal: string;
    profittotal: number;
    margin: number;
    markup: number;
    catgroupname: string;
    taxtotal?: string;
}

export interface Taxable_Total {
    name: string;
    hitstotal: number;
    ctax: number;
    payout: number;
    discounttotal: number;
    pricetotal: number;
    taxtotal: number;
    taxprice: number;
    refundqty: number;
    refundtotal: number;
    costtotal: number;
    profittotal: number;
    margin: number;
    markup: number;
}


