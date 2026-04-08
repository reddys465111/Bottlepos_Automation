export interface ICategoryGroupResponse <T extends ICategoryGroupResponseData | ICategoryGroupListData>{
    errorCode: string;
    error:     string;
    data:      T;
}

export interface ICategoryGroupResponseData {
    errorCode: string;
    error:     string;
    data:      ICategoryGroupData[];
}

export interface ICategoryGroupData {
    id:      string;
    name:    string;
    data:    string;
    created?: Date;
}

export interface ICategoryGroup {
    id?: string,
    name: string,
    showtoweb: boolean
}

export interface ICategoryGroupListData {
    data:            IcategorGroupList[];
    objcount:        string;
    recordsTotal:    string;
    recordsFiltered: string;
    draw:            number;
}

export interface IcategorGroupList {
    id:      string;
    name:    string;
    data:    string;
    created: Date;
}
