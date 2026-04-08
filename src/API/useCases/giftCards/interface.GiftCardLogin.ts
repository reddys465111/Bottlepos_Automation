export interface IGiftCardLoginTenant {
    id: number;
    name: string;
}

export interface IGiftCardLoginUser {
    id: number;
    name: string;
    email: string;
}

export interface IGiftCardLoginData {
    tenant: IGiftCardLoginTenant;
    user: IGiftCardLoginUser;
    api_token: string;
}

export interface IGiftCardLoginResponse {
    errorCode: string;
    error: string;
    data: IGiftCardLoginData;
}
