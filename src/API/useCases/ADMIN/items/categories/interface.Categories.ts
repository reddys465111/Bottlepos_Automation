export interface ICategoryResponse <T extends ICategory | ICategoryResponseData | boolean> {
    errorCode: string,
    error: string,
    data?: T
}

export interface ICategoryResponseData {
    data: ICategory[],
    objcount : string,
    recordsTotal: string,
    recordsFiltered: string,
    draw: number
}

export interface ICategory {
    id?:             string;
    name?:           string;
    dt?:             string;
    cat_group_id?:   string;
    data?:           ICategoryData | string;
    numitems?:       string;
    cat_group_name?: string;
}

export interface ICategoryData {
    defaulttax : string,
    defaultmargin : string,
    allowebt :boolean,
    donotdiscount :boolean,
    addtowebstore :boolean,
    exclusenoncashadj :boolean,
    excludeloyaltyreward :boolean,
    ageverification : string
}