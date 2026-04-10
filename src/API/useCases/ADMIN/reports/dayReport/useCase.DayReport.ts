
import { Round } from "../../../../../utils/numberManager";
import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";

import { EntityDayReport, EntityDayReport_Taxable, EntityDayReport_Total, EntityDayReport_TotalHourlySales, EntityDayReport_TotalRankSale, EntityDayReport_TotalRegister, EntityDayReport_TotalSales, EntityDayReport_TotalTendered } from "./entity.DayReport";
import { DayReportPayload } from "./payload.DayReport";
import { DayReportCountTakingData, DayReportCountTakingResponse } from "./response.CountTaking";
import { DayReportResponse, Taxable, Taxable_Data, Taxable_List, Taxable_Total } from "./response.DayReport";
import { DataRanksale, DayDeviceBreakDownResponse, } from "./response.DeviceBreakDown";
import { DayReportHourlyResponse, Hourlyreport } from "./response.Hourly";
import { DayReportOverviewData, DayReportOverviewResponse } from "./response.Overview";
import { DayReportTax, DayReportTaxResponse } from "./response.Tax";

/**
 * 
 * @param options date should follow the pattern MM/DD/YYYY hh:mm if you not 
 * include the date, the current date will be used.
 * @returns 
 */
export const GetDayReport = async (options?: { dateFrom: string, dateTo: string }): Promise<EntityDayReport> => {

    let timestamp1 = options?.dateFrom ? Date.parse(options?.dateFrom) : new Date().setHours(0, 1, 0.0); //"10/02/2024 00:01");    
    let timestamp2 = options?.dateTo ? Date.parse(options.dateTo) : new Date().setHours(23, 59, 59, 59); // Date.parse("10/02/2024 23:59");

    const payload: DayReportPayload = {
        "stime": timestamp1,
        "etime": timestamp2,
        "supplierid": "0",
        "userid": "",
        "deviceid": "",
        "type": "all",
        "diff": "0",
        "reorderpoint": "1",
        "expensegroup": "category",
        "currentstockgroup": "item",
        "taxfillter": "byrule",
        "staffid": "",
        "receivegroupby": "supplier",
        "expensetypeid": null,
        "custids": [],
        "transfergroupby": "item",
        "transferfromname": null,
        "transfertoname": null,
        "salerepsupp": [],
        "salerepcat": [],
        "itemtype": ""
    }

    const reportDayReportResponse = await posFetcher.post<DayReportResponse>({ url: EndPoint.Reports.DayReport.daySelling, data: EncodeData(payload) });
    const reportOverviewResponse = await posFetcher.post<DayReportOverviewResponse>({ url: EndPoint.Reports.DayReport.reportOverview, data: EncodeData(payload) });
    const reportCountTakingsResponse = await posFetcher.post<DayReportCountTakingResponse>({ url: EndPoint.Reports.DayReport.countTakings, data: EncodeData(payload) });
    const reportTaxResponse = await posFetcher.post<DayReportTaxResponse>({ url: EndPoint.Reports.DayReport.tax, data: EncodeData(payload) });
    const reportDeviceBreakDownResponse = await posFetcher.post<DayDeviceBreakDownResponse>({ url: EndPoint.Reports.DayReport.deviceBreakDown, data: EncodeData(payload) });
    const reportHourlyResponse = await posFetcher.post<DayReportHourlyResponse>({ url: EndPoint.Reports.DayReport.hourly, data: EncodeData(payload) });

    const nontaxable = reportDayReportResponse.data.data.catData.nontaxable;
    const taxable = reportDayReportResponse.data.data.catData.taxable;
    const total = reportDayReportResponse.data.data.catData.total;

    const total_register = reportOverviewResponse.data.data;
    const total_tendered = reportCountTakingsResponse.data.data;

    const total_tax = reportTaxResponse.data.data.taxdata.data;
    const total_ranksale = reportDeviceBreakDownResponse.data.data.ranksale;
    const total_hours = reportHourlyResponse.data.data.hourlyreport;

    return {
        "TOTAL_NONTAXABLE": LoadDaySelling(nontaxable),
        "TOTAL_TAXABLE": LoadDaySelling(taxable),
        "TOTAL_SALES": LoadTotalSales(total, total_register),
        "TOTAL_REGISTER": LoadTotalRegister(total_register, total),
        "TOTAL_TENDERED": LoadTotalTendered(total_register, total_tendered),
        "TOTAL": LoadTotal(total_tax),
        "TOTAL_RANK_SALE": LoadRankSaleTotal(total_ranksale),
        "TOTAL_CASH": {},
        "Total_Hourly_Sales": LoadTotLHourlySales(total_tendered, total_hours)
    };
}


const LoadDaySelling = (taxable: Taxable): EntityDayReport_Taxable => {
    let _taxable: EntityDayReport_Taxable = {
        Name: taxable.total.name,
        NetAmount: taxable.total.pricetotal,
        CostAmount: taxable.total.costtotal,
        Margin: taxable.total.margin,
        Markup: taxable.total.markup,
        DiscountAmount: taxable.total.discounttotal,
        Hits: taxable.total.hitstotal,
        Category: LoadDaySellingData(taxable.data) //await LoadData(taxable)
    }
    return _taxable;
}

const LoadDaySellingData = (taxable: { [key: string]: Taxable_List }): { [key: string]: EntityDayReport_Taxable } => {
    let _data: { [key: string]: EntityDayReport_Taxable } = {}
    for (const index in taxable) {
        _data = {
            ..._data,
            [taxable[index].total.name]:
            {
                CostAmount: taxable[index].total.costtotal,
                DiscountAmount: taxable[index].total.discounttotal,
                Hits: taxable[index].total.hitstotal,
                Margin: taxable[index].total.margin,
                Markup: taxable[index].total.markup,
                Name: taxable[index].total.name,
                NetAmount: taxable[index].total.pricetotal,
                Category: LoadDaySellingSubData(taxable[index].data)
            }
        }
    };
    return _data;
}

const LoadDaySellingSubData = (data: Taxable_Data[]): { [key: string]: EntityDayReport_Taxable } => {
    let _subData: { [key: string]: EntityDayReport_Taxable } = {}
    for (const index in data) {
        _subData = {
            ..._subData,
            [data[index].name]:
            {
                CostAmount: Number(data[index].costtotal),
                DiscountAmount: Number(data[index].discounttotal),
                Hits: Number(data[index].hitstotal),
                Margin: data[index].margin,
                Markup: data[index].markup,
                Name: data[index].name,
                NetAmount: data[index].pricetotal,
                // Category: LoadSubData(data[index)
                Category: {}
            }
        }
    };
    return _subData;
}

const LoadTotalSales = (total: Taxable_Total, total_sales: DayReportOverviewData): EntityDayReport_TotalSales => {
    return {
        Hits: total.hitstotal, NetAmount: Round(total.pricetotal), CostAmount: Round(total.costtotal), Margin: Round(total.margin), Markup: Round(total.markup), Category: {
            "Total Discount": { Hits: Round(total_sales.dicountqty) - Round(total_sales.couponpercentsale.couponitemsalediscount) - Round(total_sales.couponsale.couponitemsalediscount), NetAmount: Round(total_sales.discount) },
            "Customer Returns": { Hits: Round(total_sales.refund.numitem), NetAmount: Round(total_sales.refund.total) },
            "Void Items": { Hits: Round(total_sales.voiditems.numitem), NetAmount: Round(total_sales.voiditems.total) },
        }
    }
}

const LoadTotalRegister = (total_register: DayReportOverviewData, total_sales: Taxable_Total): EntityDayReport_TotalRegister => {
    let amount = Round(total_register.lottosale.lottosaletotal)
        + Round(total_register.onlinelotterysale.onlinelottertotal)
        + Round(total_register.couponsale.couponitemsaletotal)
        + Round(total_register.couponpercentsale.couponitemsaletotal)
        + Round(total_register.houseaccountpay.houseaccountpaytotal)
        + Round(total_register.feesale.feesaletotal)
        + Round(total_register.salerounding.saleroundingtotal)
        + Round(total_register.satax.taxtotal)
    return {

        Hits: 0, NetAmount: Round(total_sales.pricetotal) + Round(amount), Category: {
            "Lotto Sales": { Hits: Round(total_register.lottosale.lottosalenum), NetAmount: Round(total_register.lottosale.lottosaletotal) },
            "Online Lottery Sales": { Hits: Round(total_register.onlinelotterysale.onlinelotterynum), NetAmount: Round(total_register.onlinelotterysale.onlinelottertotal) },
            "Coupon Sale $": { Hits: Round(total_register.couponsale.couponitemsalenum), NetAmount: Round(total_register.couponsale.couponitemsaletotal) },
            "Coupon Sale %": { Hits: Round(total_register.couponpercentsale.couponitemsalenum), NetAmount: Round(total_register.couponpercentsale.couponitemsaletotal) },
            "House Account Pay": { Hits: Round(total_register.houseaccountpay.houseaccountpaynum), NetAmount: Round(total_register.houseaccountpay.houseaccountpaytotal) },
            "Fee Sales": { Hits: Round(total_register.feesale.feesalenum), NetAmount: Round(total_register.feesale.feesaletotal) },
            "Sale Rounding": { Hits: Round(total_register.salerounding.salesroundingcount), NetAmount: Round(total_register.salerounding.saleroundingtotal) },
            "Sales Tax": { Hits: Round(total_register.satax.taxid), NetAmount: Round(total_register.satax.taxtotal) },

        }
    }
}

const LoadTotalTendered = (reportOverview: DayReportOverviewData, reportTakingCount: DayReportCountTakingData): EntityDayReport_TotalTendered => {
    let card = { Hits: reportTakingCount.payData?.card?.salenum ?? 0, Expected: Round(reportTakingCount.payData?.card?.saletotal ?? 0) };
    let cash = { Hits: reportTakingCount.payData.cash?.salenum ?? 0, Expected: Round(reportTakingCount.payData?.cash?.saletotal ?? 0) };
    let cashPayout = { Hits: reportTakingCount.cashpayout?.count ?? 0, Expected: Round(reportTakingCount.cashpayout?.amount ?? 0) };
    let onlinePayout = { Hits: Round(reportOverview.onlinepayout.onlinepaynum), Expected: Round(reportOverview.onlinepayout.onlinepaytotal) };
    let lottoPayout = { Hits: Round(reportOverview.payout.payoutnum), Expected: Round(reportOverview.payout.payouttotal) };

    let totalTendered: EntityDayReport_TotalTendered = {
        Category: { 'Card': card, 'Cash': cash, 'Cash Payout': cashPayout, 'Online Payout': onlinePayout, 'Lotto Payout': lottoPayout },
        Hits: card.Hits + cash.Hits + cashPayout.Hits + onlinePayout.Hits + lottoPayout.Hits,
        Expected: card.Expected + cash.Expected + cashPayout.Expected + onlinePayout.Expected + lottoPayout.Expected,
    };

    return totalTendered;
}

const LoadDevice = () => {

}

const LoadTotal = (reportTotal: { [key: string]: DayReportTax }): EntityDayReport_Total => {
    let items = 0;
    let saleSubtotal = 0;
    let tax = 0;
    let refund_subtotal = 0;
    let totalTax = 0;
    let list: { [key: string]: EntityDayReport_Total } = {}
    for (const val in reportTotal) {
        if (reportTotal[val].name != 'Cash Rounding') {

            items += reportTotal[val].qtyitems;
            saleSubtotal += Round(reportTotal[val].saletotal);
            tax += Round(reportTotal[val].saletax);
            refund_subtotal += Round(reportTotal[val].refundtotal);
            totalTax += Round(reportTotal[val].saletax)

            list[reportTotal[val].name] = {
                Items: reportTotal[val].qtyitems,
                SaleSubtotal: Round(reportTotal[val].saletotal).toString(),
                Tax: Round(reportTotal[val].saletax).toString(),
                RefundSubtotal: Round(reportTotal[val].refundtotal).toString(),
                TotalTax: Round(reportTotal[val].saletax).toString(),
                Taxes: {}
            }
        }
    }

    let output: EntityDayReport_Total = {
        Items: items,
        SaleSubtotal: saleSubtotal.toString(),
        Tax: tax.toString(),
        RefundSubtotal: refund_subtotal.toString(),
        TotalTax: totalTax.toString(),
        Taxes: list
    }
    return output;
}

const LoadRankSaleTotal = (reportDeviceBreak: DataRanksale): EntityDayReport_TotalRankSale => {
    let list: { [key: string]: EntityDayReport_TotalRankSale } = {};

    if (reportDeviceBreak?.data) {
        for (const index in reportDeviceBreak.data) {
            list[index.length > 0 ? index : 'None'] = {
                Hits: Round(reportDeviceBreak.data[index].salenum),
                NetAmount: Round(reportDeviceBreak.data[index].saletotal),
                CostAmount: Round(reportDeviceBreak.data[index].salecost),
                Margin: Round(reportDeviceBreak.data[index].margin),
                Markup: Round(reportDeviceBreak.data[index].markup),
                DiscountAmount: Round(reportDeviceBreak.data[index].salediscount),
                Ranks: {}
            }
        }

    }
    let total: EntityDayReport_TotalRankSale = {
        Hits: Round(reportDeviceBreak.total.salenum),
        NetAmount: Round(reportDeviceBreak.total.saletotal),
        CostAmount: Round(reportDeviceBreak.total.salecost),
        Margin: Round(reportDeviceBreak.total.margin),
        Markup: Round(reportDeviceBreak.total.markup),
        DiscountAmount: Round(reportDeviceBreak.total.salediscount),
        Ranks: list
    }
    return total;
}

const LoadTotLHourlySales = (reportTaking: DayReportCountTakingData, reportHourly: Hourlyreport): EntityDayReport_TotalHourlySales => {
    let list: { [key: string]: EntityDayReport_TotalHourlySales } = {};
    let totalQty = 0;
    let totalAmount = 0;

    for (const index in reportHourly) {
        list[index] = {
            Detail: {},
            NetAmount: Round(reportHourly[index].price).toString(),
            Qty: Round(reportHourly[index].qty)
        }
        totalAmount += Round(reportHourly[index].price);
        totalQty += Round(reportHourly[index].qty);
    }

    list["Customer Count"] = { NetAmount: "0", Qty: 0, Detail: {} }
    ///MISSING CUSTOMER COUNT
    // totalAmount += Round(reportTaking.cashpayout.amount);
    // totalQty += Round(reportTaking.cashpayout.count);

    list["Cash Payout"] = { NetAmount: Round(reportTaking.cashpayout.amount).toString(), Qty: Round(reportTaking.cashpayout.count), Detail: {} }
    totalAmount += Round(reportTaking.cashpayout.amount);
    totalQty += Round(reportTaking.cashpayout.count);

    let totalHours: EntityDayReport_TotalHourlySales = {
        Qty: totalQty,
        NetAmount: totalAmount.toString(),
        Detail: list,
    }

    return totalHours;
}