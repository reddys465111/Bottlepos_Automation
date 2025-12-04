export interface DayReportPayload {
    stime?: number;
    etime?: number;
    supplierid?: string | null;
    userid?: string;
    deviceid?: string;
    type?: string;
    diff?: string;
    reorderpoint?: string;
    expensegroup?: string;
    currentstockgroup?: string;
    taxfillter?: string;
    staffid?: string;
    receivegroupby?: string;
    expensetypeid?: null;
    custids?: any[];
    transfergroupby?: string;
    transferfromname?: null;
    transfertoname?: null;
    salerepsupp?: any[];
    salerepcat?: any[];
    itemtype?: string;
}
