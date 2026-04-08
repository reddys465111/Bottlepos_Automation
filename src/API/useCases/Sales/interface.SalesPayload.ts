export interface ISalesPayload {
    total:                    string;
    rounding:                 number;
    promocouponcount:         number;
    promocoupondisc:          number;
    isroundingenable:         boolean;
    extracosts:               any[];
    ref:                      string;
    userid:                   string;
    devid:                    string;
    locid:                    string;
    custid:                   string;
    custemail:                string;
    custnotes:                string;
    custname:                 string;
    custphone:                string;
    customerage:              number;
    customerdob:              string;
    notes:                    string;
    cost:                     number;
    subtotal:                 string;
    numitems:                 number;
    processdt:                number;
    items:                    Item[];
    codes:                    Code[];
    payments:                 Payment[];
    payout:                   number;
    totaltendered:            number;
    discountamt:              number;
    multipleDiscounts:        MultipleDiscounts;
    lineDiscounts:            LineDiscount;
    discountvalue:            Discountvalue[];
    discountindex:            number;
    discount:                 number;
    discount_amountvalue:     number;
    tax:                      number;
    taxdata:                  Taxdata;
    promotions:               Additionalcharges;
    additionalcharges:        Additionalcharges;
    cardfees:                 number;
    manualpriceedit:          number;
    totalLoyaltyPoints:       number;
    totalLoyaltyPointsDeduct: number;
    rating:                   string;
    scanpromocouponcode:      any[];
    order_from:               string;
    declined:                 boolean;
    giftcard:                 boolean;
    response:                 any[];
}

export interface Additionalcharges {
}

export interface Code {
    sitemid: string;
    qty:     number;
    name:    string;
    code_id: string;
}

export interface Discountvalue {
    item_id:  string;
    discount: number;
}

export interface Item {
    ref:                      string;
    sitemid:                  string;
    qty:                      number;
    name:                     string;
    unit:                     number;
    taxid:                    string;
    increaseqty:              string;
    code_id:                  string;
    tax:                      Tax;
    discountid:               string;
    lineDiscount:             LineDiscount;
    price:                    string;
    additionalcharges:        string;
    additionalfeeforprint:    string;
    additionalfeenontaxable:  string;
    additionalfeetaxable:     string;
    allowebt:                 boolean;
    alt_name:                 string;
    categoryid:               string;
    changed_price:            string;
    cost:                     string;
    desc:                     string;
    donotdiscountitem:        boolean;
    donottrackinventory:      boolean;
    excludefrompromotion:     boolean;
    excludeloyaltyreward:     boolean;
    exclusenoncashadj:        boolean;
    giftcarditem:             boolean;
    itemdeposit:              number;
    itemrank:                 string;
    itemtags:                 any[];
    itemtype:                 string;
    loyaltypointsrequired:    string;
    minprice:                 string;
    percenttype:              string;
    pointsmultiplier:         number;
    showhideinventory:        number;
    tags:                     any[];
    unit_original:            string;
    upcfull:                  number;
    totalLoyaltyPoints:       number;
    totalLoyaltyPointsDeduct: number;
}

export interface LineDiscount {
    [key: string]: The2;
}

export interface The2 {
    amount:       number;
    percentage:   number;
    username:     string;
    discounttype: string;
}

export interface Tax {
    inclusive: boolean;
    ruleid:    string;
    total:     number;
    values:    Taxdata;
}

export interface Taxdata {
    [key: string]: number;
}

export interface MultipleDiscounts {
    [key: string]: The2;
}

export interface Payment {
    amount:     number;
    tender:     number;
    change:     number;
    method:     string;
    tip_amount: number;
}
