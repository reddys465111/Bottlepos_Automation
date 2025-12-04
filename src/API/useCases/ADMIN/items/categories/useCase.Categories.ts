
import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { ITaxRuleData, TaxRule_Get } from "../../settings/accountSettings/taxRule";
import { CategoryGroup_Get, ICategoryGroup } from "../categoryGroups";
import { EntityCategories, ICategory, ICategoryData, ICategoryResponse, ICategoryResponseData } from "./";

export const Categories_Get = async(category: EntityCategories): Promise<ICategory | undefined> => {
    const data = `draw=100&search%5Bvalue%5D=${category?.Name ?? ''}`;
    const response = await posFetcher.post<ICategoryResponse<ICategoryResponseData>>({url: EndPoint.Categories.Get, data: data});
    const cat = response.data.data?.data;
    if(cat){
        const obj = cat[0]
        return cat?.length! >0 ? obj as ICategory : undefined;
    }
    return undefined;
}

export const Categories_Add = async(category: EntityCategories): Promise<ICategory|undefined> =>{
    let groupId : string = '0'

    if(category.CategoryGroup){
        const groupResponse = await CategoryGroup_Get({Name: category.CategoryGroup});
        groupId = groupResponse? groupResponse.id! : '0';
    }
    
    let taxId: string = '';
    if(category.DefaultTax){
        const taxResponse = await TaxRule_Get(category.DefaultTax);
        taxId = taxResponse ? taxResponse.id! : '';
    }
    const categoryData : ICategoryData = {
        defaulttax: taxId,
        ageverification: category.AgeVerification ?? '',
        defaultmargin: category.DefaultMargin ?? '',
        allowebt: category.AllowEBT ?? false,
        donotdiscount: category.doNotDiscount ?? false,
        addtowebstore: category.DoNotShowToWebstore ?? true,
        exclusenoncashadj: category.ExcludeNonCashAdj ?? false,
        excludeloyaltyreward: category.ExcludeLoyaltyReward ?? false

    }
    const iCategory : ICategory = {
        name: category.Name,
        cat_group_id: groupId,
        data: categoryData
    }

    const response = await posFetcher.post<ICategoryResponse<ICategory>>({url: EndPoint.Categories.Add, data: EncodeData(iCategory)});
    return response.data.data
}


export const Categories_Edit = async(edit: EntityCategories, old: ICategory): Promise<ICategory|undefined> =>{

    let groupResponse: ICategoryGroup| undefined = undefined;
    if(edit.CategoryGroup){
        groupResponse = await CategoryGroup_Get({Name: edit.CategoryGroup});
    }

    let taxResponse: ITaxRuleData | undefined= undefined
    if(edit.DefaultTax){
        taxResponse = await TaxRule_Get(edit.DefaultTax);
    }
    const oldData: ICategoryData = JSON.parse(old.data as string) as ICategoryData;

    const categoryData : ICategoryData = {
        
        defaulttax: taxResponse? taxResponse.id! : oldData.defaulttax,
        ageverification: edit.AgeVerification ?? oldData.ageverification,
        defaultmargin: edit.DefaultMargin ?? oldData.defaultmargin,
        allowebt: edit.AllowEBT ?? oldData.allowebt,
        donotdiscount: edit.doNotDiscount ?? oldData.donotdiscount,
        addtowebstore: edit.DoNotShowToWebstore ?? oldData.addtowebstore,
        exclusenoncashadj: edit.ExcludeNonCashAdj ?? oldData.exclusenoncashadj,
        excludeloyaltyreward: edit.ExcludeLoyaltyReward ?? oldData.excludeloyaltyreward

    }
    const iCat : ICategory = {
        id: old.id,
        name: edit.ReplaceName ?? edit.Name ?? old.name,
        cat_group_id: groupResponse? groupResponse.id! : old.cat_group_id,
        /*this fields are not needed for the payload
         cat_group_name: groupResponse? groupResponse.name : old.cat_group_name, 
         numitems: old.numitems,
         dt: old.dt,
        */
        data: categoryData,
    }

    const response = await posFetcher.post<ICategoryResponse<ICategory>>({url: EndPoint.Categories.Edit, data: EncodeData(iCat)});
    return response.data.data
}


export const Categories_Delete = async(category: ICategory) : Promise<boolean>=> {
    const response = await posFetcher.post<ICategoryResponse<boolean>>({url: EndPoint.Categories.Delete, data: EncodeData(category)});
    return response.data.data!
}