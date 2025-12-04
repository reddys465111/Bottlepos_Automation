export interface ITaxItemResponse {
    errorCode?: string;
    error?:     string;
    data?:      ITaxItemData;
}

export interface ITaxItemData {
    name:       string;
    altname?:    string;
    type?:       string;
    value:      string;
    multiplier?: number;
    id?:         string;
}
