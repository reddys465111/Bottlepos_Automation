export interface IStaffAdminResponse{
    errorCode: string,
    error: string,
    data: IStaffAdminResponseData[] 
}

export interface IStaffAdminResponseList {
    errorCode: string,
    error: string,
    data: { [key: string]:  IStaffAdminResponseData}[];
}

export interface IStaffAdminResponseData {
    id?:          string;
    username?:    string;
    admin?:       number;
    permissions?: ISARPermissions;
    disabled?:    string;
    mobile?:      null;
    dob?:         string;
    address?:     string;
    zipcode?:     string;
    api_client?:  string;
}

export interface ISARPermissions {
    sections:         ISARSections;
    apicalls:         string[];
    pospermissions:   { [key: string]: number };
    sections_control: ISARSectionsControl;
}

export interface ISARSections {
    access:            string;
    dashboard:         string;
    adminreports:      number;
    otherstorereports: number;
    graph:             number;
    sales:             number;
    invoices:          number;
    items:             number;
    stock:             number;
    categories:        number;
    suppliers:         number;
    customers:         number;
    receive:           number;
    transfer:          number;
    orders:            number;
    closing:           number;
    expense:           number;
    assistant:         number;
    clockinout:        number;
    tasklist:          number;
    itemmodule:        ISARItemmodule;
    sections_control:  ISARSectionsControl;
    pos:               { [key: string]: number };
}

export interface ISARItemmodule {
    delete: number;
}

export interface ISARSectionsControl {
    promotionsms: number;
}
