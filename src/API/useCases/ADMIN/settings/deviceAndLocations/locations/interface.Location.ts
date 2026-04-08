export interface ILocationResponse <T extends ILocationData | ILocationData[]>{
    data:            T, //IDeviceData[];
    objcount:        string;
    recordsTotal:    string;
    recordsFiltered: string;
    draw:            number;
}


export interface ILocationData {
    id?:       string;
    name:     string;
    dt:       string;
    disabled: string;
}

