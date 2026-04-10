import { Session } from "../../../../../utils";
import { posFetcher } from "../../../../pos.adapter";
import { EndPoint, EncodeData } from "../../../../utils";
import { EntitySummaryReport } from "./entity.SummaryReport";
import { PayloadSummary } from "./payload.SummaryReport";
import { SummaryResponse } from "./response.SummaryReport";

export const GetSummaryReport = async (options?: { dateFrom: string, dateTo: string }): Promise<EntitySummaryReport> => {
    let timestamp1 = options?.dateFrom ? Date.parse(options?.dateFrom) : new Date().setHours(0, 1, 0.0); //"10/02/2024 00:01");    
    let timestamp2 = options?.dateTo ? Date.parse(options.dateTo) : new Date().setHours(23, 59, 59, 59); // Date.parse("10/02/2024 23:59");
    const payload: PayloadSummary = {
        stime: timestamp1,
        etime: timestamp2,
        userid: "",
        deviceid: ""
    };

    const response = await posFetcher.post<SummaryResponse>({ url: EndPoint.Reports.Summary.Get, data: EncodeData(payload) });
    const entitySummary: EntitySummaryReport = {
        GrossSales: {
            Sales: Number(response.data.data.salenum),
            Total: Number(response.data.data.saletotal?.toFixed(2)),
        },
        LottoSales: {
            Sales: Number(response.data.data.lottosalenum),
            Total: Number(response.data.data.lottosaletotal?.toFixed(2)),
        },
        OnlineLottery: {
            Sales: Number(response.data.data.onlinelotterynum),
            Total: Number(response.data.data.onlinelotterytotal?.toFixed(2)),
        },
        FeeSales: {
            Sales: Number(response.data.data.feeitemsalenum),
            Total: Number(response.data.data.feeitemsaletotal?.toFixed(2)),
        },
        HouseAccountPay: {
            Sales: Number(response.data.data.houseitemsalenum),
            Total: Number(response.data.data.houseitemsaletotal?.toFixed(2)),
        },
        Refunds: {
            Sales: Number(response.data.data.refundnum),
            Total: Number(response.data.data.refundtotal?.toFixed(2)),
        },
        Voids: {
            Sales: Number(response.data.data.voidnum),
            Total: Number(response.data.data.voidtotal?.toFixed(2)),
        },
        SaleTax: {
            Sales: Number(response.data.data.taxqty),
            Total: Number(response.data.data.taxes?.toFixed(2)),
        },
        TipsAmount: {
            Sales: Number(response.data.data.tipscount),
            Total: Number(response.data.data.tipsamounttotal),
        },
        NonTaxable: {
            Sales: Number(response.data.data.qtytotal),
            Total: Number(response.data.data.nontaxable?.toFixed(2)),
        },
        ReturnExchange: {
            Sales: Number(response.data.data.salesroundingcount),
            Total: Number(response.data.data.salerounding),
        },
        NetSales: {
            Sales: Number(response.data.data.netsalenum),
            Total: Number(response.data.data.totaltakings),  
        },
        LottoPayout: {
            Sales: Number(response.data.data.payoutnum),
            Total: Number(response.data.data.payouttotal),
        },
        OnlinePayout: {
            Sales: Number(response.data.data.onlinepaynum),
            Total: Number(response.data.data.onlinepaytotal),
        },
        CouponSale_Dollar: {
            Sales: Number(response.data.data.couponitemsalenum),
            Total: Number(response.data.data.couponitemsaletotal),
        },
        CouponSale_Percent: {
            Sales: Number(response.data.data.couponpercentitemsalenum),
            Total: Number(response.data.data.couponpercentitemsaletotal),
        },
        PromoCoupons: {
            Sales: Number(response.data.data.promocouponcount),
            Total: Number(response.data.data.promocoupondisc),
        },
        CanceledSale: {
            Sales: Number(response.data.data.cancelsalenum),
            Total: Number(response.data.data.cancelsaletotal),
        },
        NoSale: {
            Sales: Number(response.data.data.nosalesnum),
            Total: Number(response.data.data.nosalestotal),
        },
        ManualPriceChange: {
            Sales: Number(response.data.data.pricechangenum),
            Total: Number(response.data.data.pricechangetotal),
        },
        Cost: {
            Sales: Number(response.data.data.salenum),
            Total: Number(response.data.data.cost),
        },
        Profit: {
            Sales: Number(response.data.data.salenum),
            Total: Number(response.data.data.profit),
        },
        Cash: {
            Sales: Number(response.data.data.cashnum),
            Total: Number(response.data.data.cashamt?.toFixed(2)),
        },
        Card: {
            Sales: Number(response.data.data.cardnum),
            Total: Number(response.data.data.cardamt?.toFixed(2)),
        },
       CardFee: {
            Sales: Number(response.data.data.additionalchargeslisting?.["card fee"]?.addnlcount || 0),
            Total: Number( Number(response.data.data.additionalchargeslisting?.["card fee"]?.total ?? 0).toFixed(2))
        }
    };
    return entitySummary;
    
}