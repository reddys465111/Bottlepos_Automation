export interface IBottleDeposit{}

export interface IBottleDepositResponse {
    errorCode: string;
    error:     string;
    data?:      IBottleDepositData;
}

export interface IBottleDepositData {
    name?:   string;
    amount?: string;
    id?:     string;
}

export interface IBottleDepositListResponse {
    errorCode: string;
    error:     string;
    data?:      IBottleDepositList;
}

export interface IBottleDepositList {
    data:            IBottleDepositData[];
    objcount:        string;
    recordsTotal:    string;
    recordsFiltered: string;
    draw:            number;
}
