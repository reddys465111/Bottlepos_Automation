export interface IStaffAdminData {
    id?:          string;
    username:    string;
    admin?:       number;
    permissions?: IStaffPermissions;
    mobile?:      string;
    userdob?:     string;
    pass?:        string;
    address?:     string;
    zipcode?:     string;
    api_client?:  string;
}

export interface IStaffPermissions {
    access?:            string;
    dashboard?:         string;
    adminreports?:      number;
    otherstorereports?: number;
    graph?:             number;
    sales?:             number;
    invoices?:          number;
    items?:             number;
    stock?:             number;
    categories?:        number;
    suppliers?:         number;
    customers?:         number;
    receive?:           number;
    transfer?:          number;
    orders?:            number;
    closing?:           number;
    expense?:           number;
    assistant?:         number;
    clockinout?:        number;
    tasklist?:          number;
    itemmodule?:        IStaffItemmodule;
    sections_control?:  IStaffSectionsControl;
    pos?:               { [key: string]: number };
}

export interface IStaffItemmodule {
    delete: number;
}

export interface IStaffSectionsControl {
    promotionsms: number;
}
