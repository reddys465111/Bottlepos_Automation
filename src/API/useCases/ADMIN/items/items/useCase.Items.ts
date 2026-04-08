import { ITEMS, Session } from "../../../../../utils"
import { posFetcher } from "../../../../pos.adapter"
import { EncodeData, EndPoint } from "../../../../utils"
import { IAdditionalFeesData } from "../../settings/accountSettings/additionalFees/interface.AdditionalFees"
import { AdditionalFees_Get } from "../../settings/accountSettings/additionalFees/useCase.AdditionalFees"
import { TaxRule_Get } from "../../settings/accountSettings/taxRule"
import { Categories_Get } from "../categories"
import { EntityItemsData } from "./entity.Items"
import { ItemPayloadCode, ItemPayloadData, ItemPayloadStockCode } from "./interface.ItemsPayload"
// import { ItemPayloadData, ItemPayloadModifier } from "./interface.ItemsPayload"
import { ItemResponse, ItemResponseData, ItemResponseModifier, ItemResponseSearch, ItemResponseStockCode } from "./interface.ItemsResponse"

export const Items_Get = async (item: EntityItemsData): Promise<ItemResponseData | undefined> => {
    // const data = `draw=100&search%5Bvalue%5D=${item?.Name ?? ''}`;
    const data = `draw=100&columns%5B0%5D%5Bdata%5D=&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=id&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=function&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=description&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=function&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=function&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=qtydayssupply&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=function&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=function&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=function&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=code&columns%5B10%5D%5Bname%5D=&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B11%5D%5Bdata%5D=function&columns%5B11%5D%5Bname%5D=&columns%5B11%5D%5Bsearchable%5D=true&columns%5B11%5D%5Borderable%5D=true&columns%5B11%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B11%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B12%5D%5Bdata%5D=function&columns%5B12%5D%5Bname%5D=&columns%5B12%5D%5Bsearchable%5D=true&columns%5B12%5D%5Borderable%5D=true&columns%5B12%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B12%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B13%5D%5Bdata%5D=function&columns%5B13%5D%5Bname%5D=&columns%5B13%5D%5Bsearchable%5D=true&columns%5B13%5D%5Borderable%5D=true&columns%5B13%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B13%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B14%5D%5Bdata%5D=function&columns%5B14%5D%5Bname%5D=&columns%5B14%5D%5Bsearchable%5D=true&columns%5B14%5D%5Borderable%5D=true&columns%5B14%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B14%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B15%5D%5Bdata%5D=function&columns%5B15%5D%5Bname%5D=&columns%5B15%5D%5Bsearchable%5D=true&columns%5B15%5D%5Borderable%5D=false&columns%5B15%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B15%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=2&order%5B0%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=${item?.Name ?? ''}&search%5Bregex%5D=false&exactsearch=0`
    const response = await posFetcher.post<ItemResponse<ItemResponseSearch>>({ url: EndPoint.Items.Get, data: data });
    let itemsList = response.data.data.data;
    let items: ItemResponseData[] = [];

    for (const val in itemsList) {
        if (itemsList[val].name == item.Name) {
            items.push(itemsList[val]);
        }
    }
    return (items.length > 0) ? items[0] : undefined;
}


export const Items_Edit = async (item: EntityItemsData, oldItem: ItemResponseData) => {
    const supplierID = undefined;
    const category = item.Category && await Categories_Get({ Name: item.Category });
    const categoryID = category ? category.id : oldItem.categoryid.toString();
    const tax = item.Tax ? await TaxRule_Get(item.Tax) : undefined;
    const shortcutkeys = item.Options?.AddToShortCutKeys?.ItemShortCutName != undefined ? true : false;
    // const showToWeb = item.Options?.DoNotShowToWebstore ? (item.Options.DoNotShowToWebstore ? 0 : 1) : undefined;
    const allowEBT = item.Options?.EBTEligible != undefined ? 1 : 0;
    // const hideInventory = item.Options?.HideInventory != undefined ? (item.Options.HideInventory ? 1 : 0) : undefined;
    // const pointsRequired = item.Options?.PointsRequired != undefined ? item.Options.PointsRequired : oldItem.pointsvalue;

    // Process additional charges before creating the object
    const additionalcharges: string[] = [];
    if (item.Options?.AdditionalFees) {
        for (const element of item.Options.AdditionalFees) {
            const afExists = await AdditionalFees_Get(element);
            if (afExists) {
                additionalcharges.push(afExists.id!.toString());
            }
        }
    }
   
    const additionalPrice: string[] = [];
    const customImmage: string[] =[];

    let modifiersList: ItemResponseModifier[] | undefined = undefined;
    let fistModifier: ItemResponseModifier | undefined = undefined;

    if (item.Modifiers) {
        modifiersList = [];
        item.Modifiers.forEach(val => {
            const input: ItemResponseModifier = {
                qty: val.Qty.toString(),
                minqty: val.Qty.toString(),
                cost: val.AvgCost ? val.AvgCost.toString() : '0',
                name: `${val.Qty}+for+${val.Price?.toString()}`,
                price: val.Price.toString(),
                lastcost: val.LatestCost ? val.LatestCost.toString() : '0',
                margin: val.Margin ? val.Margin.toString() : '0',
                markup: val.Markup ? val.Markup.toString() : '0',
                viewonprompt: val.Propmt ?? false,
                maxqty: "0",
                type: "simple"
            };
            modifiersList!.push(input);
        })
        // Get the first modifier and delete that modifier from the list
        if (modifiersList.length > 0) {
            fistModifier = modifiersList.shift();
        }
        // if the list of modifiers is empty then set the list to undefined
        if (modifiersList.length < 1) {
            modifiersList = undefined;
        }
    }

    let stockCodes: ItemResponseStockCode[] | undefined = undefined;
    let singleCodes: string | undefined = undefined;

    if (item.StockCodes) {
        stockCodes = [];
        singleCodes = '';
        item.StockCodes.forEach(code => {
            let scode: ItemResponseStockCode[] = oldItem.stock_codes.filter(x => x.code == code.Stockcode);

            stockCodes?.push({
                id: scode.length > 0 ? scode.pop()?.id : undefined,
                code: code.Stockcode,
                stocklevel: ((code.Cases ?? 1) * (item.UnitsPerCase ?? 1)).toString(),
                upcfull: '0'
            })
            singleCodes += `${code.Stockcode}, `;
        })

        if (singleCodes.length > 1) {
            singleCodes = singleCodes.substring(0, (singleCodes.length - 2));
        }
        if (stockCodes.length < 1) {
            stockCodes = undefined;
        }
    }

    oldItem = {
        ...oldItem,
        id: oldItem.id,
        name: item.ReplaceName ?? oldItem.name,
        alt_name: item.SKU ?? oldItem.alt_name,
        description: item.Size ?? oldItem.description,
        taxid: tax ? tax.id! : oldItem.taxid,
        unitspercase: item.UnitsPerCase? item.UnitsPerCase : oldItem.unitspercase,

        casecosttotal: fistModifier && Number(fistModifier.cost) > 0 ? fistModifier.cost : oldItem.casecosttotal,
        cost: fistModifier && Number(fistModifier.cost) > 0 ? fistModifier.cost : oldItem.casecosttotal,
        margin: fistModifier && Number(fistModifier.margin) > 0 ? fistModifier.margin : oldItem.margin,
        markup: fistModifier && Number(fistModifier.markup) > 0 ? fistModifier.markup : oldItem.markup,
        lastcost: fistModifier && Number(fistModifier.lastcost) > 0 ? fistModifier.lastcost : oldItem.lastcost,
        promptforqty: fistModifier ? fistModifier.viewonprompt : (oldItem.promptforqty ?? false),
        price: fistModifier && Number(fistModifier.price) ? fistModifier.price : oldItem.price,

        supplierid: supplierID ?? oldItem.supplierid ?? 0,
        categoryid: Number(categoryID ?? oldItem.categoryid),
        reorder_point: item.ReorderPoint ? item.ReorderPoint : oldItem.reorder_point,
        reorder_value: item.ReorderValue ? item.ReorderValue : oldItem.reorder_value,
        autoupdate: item.Options?.DoNotAutoUpdate ?? oldItem.autoupdate ?? false,
        shortcutkeys: shortcutkeys ?? oldItem.shortcutkeys ?? false,
        donotdiscountitem: item.Options?.DoNotApplyManualDiscount ?? oldItem.donotdiscountitem,
        showtoweb: item.Options?.DoNotShowToWebstore  ?? oldItem.showtoweb,
        allowebt: allowEBT ?? oldItem.allowebt,
        donottrackinventory: item.Options?.DoNotTrackInventory ?? oldItem.donottrackinventory,
        closeout: item.Options?.CloseOutItem ?? oldItem.closeout,
        excludefrompromotion: item.Options?.ExcludeFromPromotions ?? oldItem.excludefrompromotion,
        showhideinventory: item.Options?.HideInventory ?? oldItem.showhideinventory,

        qty: (item.Options?.DefaultQty ?? oldItem.qty).toString(),
        minprice: item.Options?.MinPrice ? item.Options.MinPrice.toString() : oldItem.minprice,
        reminddate: item.Options?.RemindDate ?? oldItem.reminddate,
        vendorname: item.Options?.VendorItemName ?? oldItem.vendorname,
        itemtags: item.Options?.Tags ?? oldItem.itemtags,
        notes: item.Options?.Notes ?? oldItem.notes,
        modifiers: modifiersList ?? oldItem.modifiers,
        itemrank: item.Rank ?? oldItem.itemrank,

        vendoritemno: item.VendorItemNO ?? oldItem.vendoritemno ?? '',
        merge_ids: oldItem.merge_ids ?? oldItem.merge_ids ?? '',
        pointsmultiplier: oldItem.pointsmultiplier ?? 0,
        shortcutname: item.Options?.AddToShortCutKeys?.ItemShortCutName ?? oldItem.shortcutname,
        code: singleCodes ?? oldItem.code,

        itemviewonprompt: item.PromptForQty ?? oldItem.itemviewonprompt,

        type: item.ItemType ?? oldItem.type ?? 'general',
        percenttype: oldItem.percenttype ?? 'negative',
        additionalPrice: additionalPrice ?? oldItem.additionalPrice ?? [],
        additionalcharges: additionalcharges,
        color_code: oldItem.color_code ?? "#ac725e",
        custom_image: customImmage ?? oldItem.custom_image ?? [],
        itemsortno: item.Options?.AddToShortCutKeys?.ItemSortNo ?? oldItem.itemsortno,
        itemtype: item.ItemType ?? oldItem.itemtype ?? 'inventoryitem',
        pointsvalue: item.Options?.PointsRequired ? item.Options.PointsRequired.toString() : oldItem.pointsvalue,
        stock_codes: stockCodes ?? [],
        webprice: '0.00',
    }
    
    const response = await posFetcher.post<ItemResponse<ItemResponseData>>({ url: EndPoint.Items.Edit, data: EncodeData(oldItem) });
    return response.data.data
}

export const Items_Add = async (item: EntityItemsData): Promise<ItemResponseData> => {
    const supplierID = '0';
    const category = item.Category && await Categories_Get({ Name: item.Category });
    const categoryID = category ? category.id : undefined;
    const tax = item.Tax ? await TaxRule_Get(item.Tax) : undefined;
    const shortcutkeys = item.Options?.AddToShortCutKeys?.ItemShortCutName != undefined ? true : false;
    const showToWeb = item.Options?.DoNotShowToWebstore != undefined ? (item.Options.DoNotShowToWebstore ? 0 : 1) : undefined;
    const allowEBT = item.Options?.EBTEligible != undefined ? (item.Options.EBTEligible ? 0 : 1) : undefined;
    const hideInventory = item.Options?.HideInventory != undefined ? (item.Options.HideInventory ? 1 : 0) : undefined;

    // Process additional charges before creating the object
    const additionalcharges: string[] = [];
    if (item.Options?.AdditionalFees) {
        for (const element of item.Options.AdditionalFees) {
            const afExists = await AdditionalFees_Get(element);
            if (afExists) {
                additionalcharges.push(afExists.id!.toString());
            }
        }
    }
    
    const additionalPrice: string[] = [];
    const customImmage: string[] = [];

    let modifiersList: ItemResponseModifier[] | undefined = undefined;
    let firstModifier: ItemResponseModifier | undefined = undefined;

    if (item.Modifiers) {
        modifiersList = [];
        item.Modifiers.forEach(val => {
            const input: ItemResponseModifier = {
                qty: val.Qty.toString(),
                minqty: val.Qty.toString(),
                cost: val.AvgCost ? val.AvgCost.toString() : '0',
                name: `${val.Qty}+for+${val.Price?.toString()}`,
                price: val.Price.toString(),
                lastcost: val.LatestCost ? val.LatestCost.toString() : '0',
                margin: val.Margin ? val.Margin.toString() : '0',
                markup: val.Markup ? val.Markup.toString() : '0',
                viewonprompt: val.Propmt ?? false,
                maxqty: "0",
                type: "simple"
            };
            modifiersList!.push(input);
        })
        // Get the first modifier and delete that modifier from the list
        if (modifiersList.length > 0) {
            firstModifier = modifiersList.shift();
        }
        // if the list of modifiers is empty then set the list to undefined
        if (modifiersList.length < 1) {
            modifiersList = undefined;
        }
    }

    let itemCodes: ItemPayloadCode[] = [];
    let singleCodes: string | undefined = undefined;

    if (item.StockCodes) {
        itemCodes = [];
        singleCodes = '';
        item.StockCodes.forEach(code => {
            itemCodes?.push({
                code: code.Stockcode,
                amount: ((code.Cases ?? 1) * (item.UnitsPerCase ?? 1)).toString(),
                locationid: Session.Location.Id ,
                upcfull: '0'
            })
            singleCodes += `${code.Stockcode}, `;
        })

        if (singleCodes.length > 1) {
            singleCodes = singleCodes.substring(0, (singleCodes.length - 2));
        }
        // if (itemCodes.length < 1) {
        //     itemCodes = undefined;
        // }
    }
    const newItem : ItemPayloadData = {
        // id: oldItem.id,
        codes: itemCodes ?? [],
        name: item.Name,
        alt_name: item.SKU ?? '',
        description: item.Size ?? '',
        taxid: tax?.id ?? '1',
        unitspercase: item.UnitsPerCase? item.UnitsPerCase.toString() : '1',

        casecosttotal: firstModifier && Number(firstModifier.cost) > 0 ? firstModifier.cost :  "0.00",
        cost: firstModifier && Number(firstModifier.cost) > 0 ? firstModifier.cost :  "0.00",
        margin: firstModifier && Number(firstModifier.margin) > 0 ? firstModifier.margin : "0.00",
        markup: firstModifier && Number(firstModifier.markup) > 0 ? firstModifier.markup : "0.00",
        lastcost: firstModifier && Number(firstModifier.lastcost) > 0 ? firstModifier.lastcost : "0.00",
        promptforqty: firstModifier && Number(firstModifier.viewonprompt) == 1 ? true : false,
        price: firstModifier && Number(firstModifier.price) > 0 ? firstModifier.price : "0.00",

        supplierid: supplierID ?? '0',
        categoryid: categoryID ?? '0',

        reorder_point: item.ReorderPoint ? item.ReorderPoint.toString() : "1",
        reorder_value: item.ReorderValue ? item.ReorderValue.toString() : "1",
        autoupdate: item.Options?.DoNotAutoUpdate ?? false,
        shortcutkeys: shortcutkeys ?? false,
        donotdiscountitem: item.Options?.DoNotApplyManualDiscount ?? false,
        showtoweb: showToWeb ?? 1,
        allowebt: allowEBT ?? 0,
        donottrackinventory: item.Options?.DoNotTrackInventory ?? false,
        closeout: item.Options?.CloseOutItem ?? false,
        excludefrompromotion: item.Options?.ExcludeFromPromotions ?? false,
        showhideinventory: hideInventory ?? 0,

        qty: (item.Options?.DefaultQty ?? '1').toString(),
        minprice: item.Options?.MinPrice ? item.Options.MinPrice.toString() : '',
        reminddate: item.Options?.RemindDate ?? '',
        vendorname: item.Options?.VendorItemName ?? '',
        itemtags: item.Options?.Tags ?? [],
        notes: item.Options?.Notes ?? '',
        modifiers: modifiersList ?? [],
        itemrank: item.Rank ?? '',//item.Options?.AddToShortCutKeys?.ItemSortNo ?? '',

        vendoritemno: item.VendorItemNO ?? '',
        merge_ids: '',
        pointsmultiplier: '',
        shortcutname: item.Options?.AddToShortCutKeys?.ItemShortCutName ?? '',
        code: singleCodes ?? '',

        itemviewonprompt: item.PromptForQty ?? false,

        type: item.ItemType ?? 'general',
        percenttype: 'negative',
        additionalPrice: additionalPrice,
        additionalcharges: additionalcharges,
        color_code: "#ac725e",
        custom_image: customImmage,
        itemsortno: item.Options?.AddToShortCutKeys?.ItemSortNo ?? '',
        itemtype: item.ItemType ?? 'inventoryitem',
        pointsvalue: item.Options?.PointsRequired ? item.Options.PointsRequired.toString() : '0',
        // stock_codes: stockCodes ?? [],
        webprice: '0.00',
    }

    const response = await posFetcher.post<ItemResponse<ItemResponseData>>({ url: EndPoint.Items.Add, data: EncodeData(newItem) });
    return response.data.data
}

export const Items_Delete = async (item: ItemResponseData): Promise<ItemResponse<ItemResponseData>> => {
    const response = await posFetcher.post<ItemResponse<ItemResponseData>>({ url: EndPoint.Items.Delete, data: EncodeData(item) });
    return response.data;
}
