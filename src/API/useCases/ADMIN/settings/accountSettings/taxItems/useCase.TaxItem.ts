
import { posFetcher } from "../../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../../utils";
import { IAdminConfig } from "../../adminConfig";
import { EntityTaxItem } from "./entity.taxItem";
import { ITaxItemData, ITaxItemResponse } from "./interface.taxItems";



/** Add a new Tax Item
 * if Value is empty or null then default value will be 1%
 * if Type is empty or null then default value will be 'vat'
 */
export const TaxItem_Add = async(taxItem: EntityTaxItem): Promise<ITaxItemResponse> => {

    let addTaxItem : ITaxItemData = {
        name : taxItem.Name,
        value : taxItem.Value?.toString() ?? "1",
        altname : taxItem.AltName ?? '',
        type: taxItem.Type ?? 'vat',
    }

    const response = await posFetcher.post<ITaxItemResponse>({url: EndPoint.TaxItem.Add, data: EncodeData(addTaxItem) });
    return response.data;
}

/*
 * Edit the TaxItem record with new data
 * @param taxItem new data to update
 * @param oldTaxItem to be updated
 * @returns request sucessful or not
 */
export const TaxItem_Edit = async(taxItem: EntityTaxItem, oldTaxItem: ITaxItemData): Promise<ITaxItemResponse> => {
    
    oldTaxItem.altname = taxItem.AltName ?? oldTaxItem.altname;
    oldTaxItem.type = taxItem.Type ?? oldTaxItem.type;
    oldTaxItem.value = taxItem.Value?.toString() ?? oldTaxItem.value;

    const response = await posFetcher.post<ITaxItemResponse>({url: EndPoint.TaxItem.Edit, data: EncodeData(oldTaxItem) });
    return response.data;
}

/**
 * Delete a TaxItem by its ID
 * @param taxItem to be deleted, only needed the ID
 * @returns 
 */
export const TaxItem_Delete = async(taxItem: ITaxItemData): Promise<ITaxItemResponse> => {
    const response = await posFetcher.post<ITaxItemResponse>({url: EndPoint.TaxItem.Delete, data: EncodeData({id: taxItem.id})});
    return response.data;
}
/**
 * Get the Tax Item by its name
 * @param taxItem 
 */
export const TaxItem_Get = async(taxItemName: string): Promise<ITaxItemData | undefined> => {
    const itemList = await TaxItem_List();
    let itemFound : ITaxItemData | undefined = undefined; 
    itemList.forEach(item => {
        if(item.name==taxItemName){
             itemFound = item;
        }
    });
    return itemFound;
}

/**
 * Get the list of current existing Tax Items on POS
 * @returns LIst of TaxItems
 */
const TaxItem_List = async(): Promise<ITaxItemData[]> => {
    const taxItemGetResponse = (await posFetcher.get<IAdminConfig>({url: EndPoint.AdminConfig.Get}));
    let itemList : ITaxItemData[] = [];
    if(taxItemGetResponse?.data?.data?.tax?.items){
        itemList = await ConvertItemstoList(taxItemGetResponse?.data?.data?.tax?.items as { [key: string]: ITaxItemData });
    }
    return itemList;
    
}

/**
 * Convert the item list from the api response into a iterable list
 * @param ruleList api list
 * @returns array list
 */
const ConvertItemstoList = async(ruleList: { [key: string]: ITaxItemData } ): Promise<ITaxItemData[]> => {
    let items : ITaxItemData[] = []
    for( const id in ruleList ){
        items.push(ruleList[id]);
    }
    return items;
}