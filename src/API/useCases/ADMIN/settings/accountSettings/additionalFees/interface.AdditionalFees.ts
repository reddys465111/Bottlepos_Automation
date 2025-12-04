

export interface IAdditionalFees <T extends IAdditionalFeesData| IAdditionalFeesResponse | boolean>{
    errorCode?: string;
    error?:     string;
    data?:      T;
}

export interface IAdditionalFeesData {
    id?:    string,
    name?:                    string;
    amount?:                  string;
    type?:                    string;
    enabletaxableadditional?: number;

}




export interface IAdditionalFeesResponse {
    data:            IAdditionalFeesUnit[];
    objcount:        string;
    recordsTotal:    string;
    recordsFiltered: string;
    draw:            number;
}

export interface IAdditionalFeesUnit {
    id:         string;
    name:       string;
    amount:     string;
    type:       string;
    taxable:    string;
    created_at: Date;
    updated_at: Date;
}
