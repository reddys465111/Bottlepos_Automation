import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { EntityCategoryGroup } from "./entity.CategoryGroup";
import { ICategoryGroup, ICategoryGroupData, ICategoryGroupListData, ICategoryGroupResponse, ICategoryGroupResponseData } from "./interface.CategoryGroups";

export const CategoryGroup_Add = async (categoryGroup: EntityCategoryGroup): Promise<ICategoryGroup | undefined> => {

    const iCategoriesData: ICategoryGroup = {
        name: categoryGroup.Name,
        showtoweb: categoryGroup.ShowToWebStore ?? false
    }
    const response = await posFetcher.post<ICategoryGroupResponse<ICategoryGroupResponseData>>({ url: EndPoint.CategoryGroup.Add, data: EncodeData(iCategoriesData) });
    const group = response.data.data.data;
    return (group != undefined && group.length > 0) ? JSON.parse(group[0].data) as ICategoryGroup : undefined;
}

export const CategoryGroup_Edit = async (categoryGroup: EntityCategoryGroup, oldCategoryGroup: ICategoryGroup): Promise<ICategoryGroup | undefined> => {
    oldCategoryGroup.showtoweb = categoryGroup.ShowToWebStore ?? oldCategoryGroup.showtoweb;
    oldCategoryGroup.name = categoryGroup.NewName ?? oldCategoryGroup.name;

    const response = await posFetcher.post<ICategoryGroupResponse<ICategoryGroupResponseData>>({ url: EndPoint.CategoryGroup.Edit, data: EncodeData(oldCategoryGroup) });

    const group = response.data.data.data;
    return (group != undefined && group?.length > 0) ? JSON.parse(group[0].data) as ICategoryGroup : undefined;
}

export const CategoryGroup_Get = async (categoryGroup?: EntityCategoryGroup): Promise<ICategoryGroup | undefined> => {

    const data = `draw=100&search%5Bvalue%5D=${categoryGroup?.Name ?? ''}`;
    const response = await posFetcher.post<ICategoryGroupResponse<ICategoryGroupListData>>({ url: EndPoint.CategoryGroup.Get, data: data });
    const group = response.data.data.data
    return (group != undefined && group?.length > 0) ? JSON.parse(group[0].data) as ICategoryGroup : undefined;
}


export const CategoryGroup_Delete = async (categoryGroup?: ICategoryGroup): Promise<ICategoryGroupData[]> => {
    const response = await posFetcher.post<ICategoryGroupResponse<ICategoryGroupResponseData>>({ url: EndPoint.CategoryGroup.Delete, data: EncodeData(categoryGroup) });
    return response.data.data.data
}
