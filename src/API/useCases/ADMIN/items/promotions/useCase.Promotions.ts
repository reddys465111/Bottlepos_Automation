import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";

import { TaxRule_Get } from "../../settings/accountSettings/taxRule";
import { Categories_Get, ICategory, ICategoryData } from "../categories";
import { EntityItemsData, Items_Get } from "../items";

import { ISize, ISizeResponse, Sizes_Get } from "../sizes";
import { EntityPromotions } from "./entity.promotions";
import { IPromotionData, IPromotionResponseList, PromotionModifier } from "./interface.PromotionResponse";

export const Promotion_All = async (): Promise<IPromotionData[]> => {

    const payload = {};
    const response = await posFetcher.post<IPromotionResponseList>({ url: EndPoint.Promotions.All, data: EncodeData(payload) });
    let promos: IPromotionData[] = [];
    for(let promo in response.data.data){
        promos.push(response.data.data[promo]);
    }
    return promos;
}

export const Promotion_Get = async (data: EntityPromotions): Promise<IPromotionData|undefined> => {
    return (await Promotion_All()).find(x=> x.name == data.Name);
}


export const Promotion_Add = async (data: EntityPromotions): Promise<IPromotionData> => {
    
    let categories : string[] = [];
    if(data.Categories){
        for(let cat of data.Categories){
            const existingCat = await Categories_Get({Name: cat});
            existingCat && categories.push(existingCat.id!);
        }
    }

    let sizes: ISize[] = [];
    if(data.Sizes){
        for(let size of data.Sizes){
            const existingSize : ISize|undefined = await Sizes_Get({name: size});
            existingSize && sizes.push(existingSize);
        }
    }

    let itemIds: string[] = [];
    if(data.Items){
        for(let itemName of data.Items){
            const itemsData : EntityItemsData = {
                Name: itemName,
                StockCodes: [],
                Modifiers: [],
                Tax: ""
            };
            const existingItem = await Items_Get(itemsData);
            existingItem && itemIds.push(existingItem.id?.toString()!);
        }
    }

    let CustomerIds: string[] = [];
    if(data.Customer){
        if(data.Customer.Customers){
           //to do
        }
    }

    let groupIds: string[] = [];
    if(data.CustomerGroups){
        if(data.CustomerGroups.groups){
            //to do
        }
    }

    const promotion : IPromotionData = { 
        name: data.NewName ?? data.Name,
        type: 'Item',
        sdate: data.StarDate ?? "",
        edate: data.EndDate ?? "",
        promotax: data.CustomerTax ?? '',
        promotionType: data.Type ?? "simple" ,
        promotionStatus: data.Status ? Number(data.Status) : 1,
        scandatapromotion: data.EnableScanData? Number(data.EnableScanData) : 0,
        webstoreenablepromotion: data.EnableWebstore? Number(data.EnableWebstore) : 0,
        promotionforall: 0,
        promotionforallitems: 0,
        allowallcustomers: data.Customer?.AllowAllCustomer? 1 : 0,
        promoappytype: data.AppliedType?.type ?? 'default',
        couponstatus: false,
        couponcode: '0',
        selweekdays: {
            repeat_sun: data.AppliedType?.RepeatsOn?.Sunday ?? false,
            repeat_mon: data.AppliedType?.RepeatsOn?.Monday  ?? false,
            repeat_tue: data.AppliedType?.RepeatsOn?.Tuesday  ?? false,
            repeat_wed: data.AppliedType?.RepeatsOn?.Wednesday ?? false,
            repeat_thu: data.AppliedType?.RepeatsOn?.Thursday ?? false,
            repeat_fri: data.AppliedType?.RepeatsOn?.Friday ?? false,
            repeat_sat: data.AppliedType?.RepeatsOn?.Saturday ?? false,
        },
        
        sizeModifiersIds: sizes.map(size => { return { id: size.id!, name: size.name, ordernum: size.ordernum! } }),
        tagsModifiers: data.Tags ?? [],
        modifiers: await Promise.all(
            
            data.BulkSale ? data.BulkSale.map(
                async sale => {
                    return {
                        qty: sale.qty.toString(),
                        price: sale.price.toString(),
                        type: data.Type ?? 'simple',
                        status: data.Status? Number(data.Status) : 1,
                        scandatapromotion: 0,
                        sdate: data.StarDate ?? "",
                        edate: data.EndDate ?? "",
                        promotax: (await TaxRule_Get(data.CustomerTax ?? '0'))?.toString() ?? '0',
                        promotionforallitems: 0,
                        name: `${sale.qty}+for+${sale.price}`
                    }
                }
            ) : []
        ),
        catModifiersIds: categories,
        modifiersIds: itemIds,
        custModifiersIds: CustomerIds,
        custGroupsModifiersIds: groupIds,
    }

    const response = await posFetcher.post<IPromotionData>({ url: EndPoint.Promotions.Add, data: EncodeData(promotion) });
    return response.data;
}


export const Promotion_Delete = async (data: IPromotionData): Promise<void> => {
}

export const Promotion_Edit = async (newData: EntityPromotions, oldData: IPromotionData): Promise<IPromotionData> => {
    
    let categories : string[] = [];
    if(newData.Categories){
        for(let cat of newData.Categories){
            const existingCat = await Categories_Get({Name: cat});
            existingCat && categories.push(existingCat.id!);
        }
    }

    let sizes: ISize[] = [];
    if(newData.Sizes){
        for(let size of newData.Sizes){
            const existingSize : ISize|undefined = await Sizes_Get({name: size});
            existingSize && sizes.push(existingSize);
        }
    }

    let itemIds: string[] = [];
    if(newData.Items){
        for(let itemName of newData.Items){
            const itemsData : EntityItemsData = {
                Name: itemName,
                StockCodes: [],
                Modifiers: [],
                Tax: ""
            };
            const existingItem = await Items_Get(itemsData);
            existingItem && itemIds.push(existingItem.id?.toString()!);
        };
    };
    let CustomerIds: string[] = [];
    if(newData.Customer){
        if(newData.Customer.Customers){
           //to do
        };
    };

    let groupIds: string[] = [];
    if(newData.CustomerGroups){
        if(newData.CustomerGroups.groups){
            //to do
        };
    };
    
    let bulkSales: PromotionModifier[] = [];
    if(newData.BulkSale){
        for(let bSale of newData.BulkSale){
            bulkSales.push({
                qty: bSale.qty.toString(),
                price: bSale.price.toString(),
                type: newData.Type ?? 'simple',
                status: newData.Status? Number(newData.Status) : 1,
                scandatapromotion: 0,
                sdate: newData.StarDate ?? "",
                edate: newData.EndDate ?? "",
                promotax: (await TaxRule_Get(newData.CustomerTax ?? '0'))?.toString() ?? '0',
                promotionforallitems: 0,
                name: `${bSale.qty}+for+${bSale.price}`
            });
        }
    }else{
        bulkSales = oldData.modifiers;
    }
   
    oldData.name = newData.NewName ?? newData.Name ?? oldData.name;
    oldData.sdate = newData.StarDate ?? oldData.sdate ?? "";
    oldData.edate = newData.EndDate ?? oldData.edate ?? "";
    oldData.promotax = newData.CustomerTax ?? oldData.promotax ?? '';
    oldData.promotionType = newData.Type ?? oldData.promoappytype ?? "simple" ;
    oldData.promotionStatus = newData.Status ? Number(newData.Status) : (oldData.promotionStatus ?? 1);
    oldData.scandatapromotion = newData.EnableScanData? Number(newData.EnableScanData) : (oldData.scandatapromotion ?? 0);
    oldData.webstoreenablepromotion = newData.EnableWebstore? Number(newData.EnableWebstore) : (oldData.webstoreenablepromotion ?? 0);

    oldData.allowallcustomers = newData.Customer?.AllowAllCustomer? Number(newData.Customer.AllowAllCustomer) : oldData.allowallcustomers;
    oldData.promoappytype = newData.AppliedType?.type ?? oldData.type ?? 'default';

    oldData.selweekdays.repeat_sun = newData.AppliedType?.RepeatsOn?.Sunday ?? oldData.selweekdays.repeat_sun ?? false;
    oldData.selweekdays.repeat_mon = newData.AppliedType?.RepeatsOn?.Monday  ?? oldData.selweekdays.repeat_mon ?? false;
    oldData.selweekdays.repeat_tue = newData.AppliedType?.RepeatsOn?.Tuesday  ?? oldData.selweekdays.repeat_tue ?? false;
    oldData.selweekdays.repeat_wed = newData.AppliedType?.RepeatsOn?.Wednesday ?? oldData.selweekdays.repeat_wed ?? false;
    oldData.selweekdays.repeat_thu = newData.AppliedType?.RepeatsOn?.Thursday ?? oldData.selweekdays.repeat_thu ?? false;
    oldData.selweekdays.repeat_fri = newData.AppliedType?.RepeatsOn?.Friday ?? oldData.selweekdays.repeat_fri ??  false;
    oldData.selweekdays.repeat_sat = newData.AppliedType?.RepeatsOn?.Saturday ?? oldData.selweekdays.repeat_sat ?? false;
    
    oldData.sizeModifiersIds = newData.Sizes ? sizes.map(size => { return { id: size.id!, name: size.name, ordernum: size.ordernum! } }) : oldData.sizeModifiersIds;
    oldData.tagsModifiers = newData.Tags ?? oldData.tagsModifiers;
    oldData.modifiers = bulkSales;
    oldData.catModifiersIds = categories.length>0 ? categories : oldData.catModifiersIds;
    oldData.modifiersIds = itemIds.length>0 ? itemIds : oldData.modifiersIds;
    oldData.custModifiersIds = CustomerIds.length>0 ? CustomerIds : oldData.custModifiersIds;
    oldData.custGroupsModifiersIds = groupIds.length>0 ? groupIds : oldData.custGroupsModifiersIds;

    const response = await posFetcher.post<IPromotionData>({ url: EndPoint.Promotions.Edit, data: EncodeData(oldData) });
    return response.data;
}