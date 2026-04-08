export interface ISettingsGetResponse {
    errorCode: string;
    error:     string;
    data:      ISettingsGetResponseData;
}

export interface ISettingsGetResponseData {
    device_id:              string;
    show_email_notes?:       boolean;
    window_size?:            string;
    auto_launch_cus_screen?: boolean;
    hide_advanced_options?:  boolean;
    fixedkeypad?:            boolean;
    keypad?:                 boolean;
    printing?:               ISettingsGetResponsePrinting;
}

export interface ISettingsGetResponsePrinting {
    recask:            string;
    receiptsprint:     string;
    cashdraw:          boolean;
    serviceip:         string;
    serviceport:       number;
    escpreceiptmode:   string;
    alt_charset:       string;
    alt_codepage:      number;
    rec_language:      string;
    rec_orientation:   string;
    currency_override: boolean;
    currency_codepage: number;
    currency_codes:    string;
    rectemplate:       string;
    invtemplate:       string;
    printinv:          boolean;
    printers:          Printers;
    sheet_width:       number;
}

export interface Printers {
    receipts:   ISettingsGetResponseKitchen;
    reports:    ISettingsGetResponseKitchen;
    kitchen:    ISettingsGetResponseKitchen;
    labels:     ISettingsGetResponseKitchen;
    pos_labels: ISettingsGetResponseKitchen;
}

export interface ISettingsGetResponseKitchen {
    printer:              string;
    port:                 string;
    method:               string;
    type:                 string;
    baud:                 string;
    databits:             string;
    stopbits:             string;
    parity:               string;
    flow:                 string;
    printip:              string;
    printport:            string;
    cutter:               string;
    feed:                 number;
    electronPrintType?:   string;
    electronPrintFormat?: string;
}
