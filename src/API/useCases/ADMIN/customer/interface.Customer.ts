export interface ICustomerResponse <T extends ICustomerData | ICustomerResponseData> {
    errorCode: string;
    error:     string;
    data:      T;
}

export interface ICustomerResponseData {
    data:            ICustomerData[];
    draw:            string;
    recordsTotal:    string;
    recordsFiltered: string;
}

export interface ICustomerData {
    id:                   string;
    email:                string;
    name:                 string;
    phone:                string;
    mobile:               string;
    address:              string;
    suburb:               string;
    postcode:             string;
    state:                string;
    country:              string;
    notes:                null;
    googleid:             string;
    pass:                 string;
    token:                string;
    activated:            string;
    disabled:             string;
    lastlogin:            null;
    dt:                   Date;
    points:               string;
    dob:                  string;
    updated_at:           Date;
    houseacclimit:        string;
    ishousepay:           string;
    housesaleborrow:      string;
    promotion_subscribed: null | string;
    txWholesale:          string;
    licenseNumber:        null | string;
    taxPayerId:           null | string;
    totalsales:           string;
    sort_index:           number;
}


export interface ICustomerPayload {
    txWholesale:          string;
    licenseNumber:        string;
    taxPayerId:           string;
    email:                string;
    name:                 string;
    phone:                string;
    mobile:               string;
    dob:                  string;
    address:              string;
    suburb:               string;
    postcode:             string;
    points:               string;
    ishouseenable:        boolean;
    promotion_subscribed: boolean;
    houseacclimit:        string;
    state:                string;
    country:              string;
}
