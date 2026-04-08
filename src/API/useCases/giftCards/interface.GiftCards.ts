export interface IGiftCardBalanceResponse {
    id:              number;
    tenant_id:       number;
    code:            string;
    issued_at:       Date;
    expires_at:      Date | null;
    initial_balance: string;
    balance:         string;
    status:          Status;
    created_at:      Date;
    updated_at:      Date;
}

export enum Status {
    Active = "active",
    Inactive = "inactive",
}
