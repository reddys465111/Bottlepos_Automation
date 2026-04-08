export interface IAuthResponse {
    errorCode: string;
    error: string;
    data: iAuthData;
}

export interface iAuthData {
    id?: string;
    username?: string;
    isadmin?: string;
    sections?: null;
    pospermissions?: null;
    sections_control?: null;
    token?: string;
    auth_hash?: string;
}