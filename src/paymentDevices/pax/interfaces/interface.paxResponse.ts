export interface IPaxResponse {
    errorCode: string;
    error:     string;
    data:      Data;
}

export interface Data {
    total:                    string;
    rounding:                 number;
    promocouponcount:         number;
    promocoupondisc:          number;
    isroundingenable:         boolean;
    extracosts:               Extracost[];
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
    multipleDiscounts:        Additionalcharges;
    lineDiscounts:            Additionalcharges;
    discountvalue:            Discountvalue[];
    discountindex:            number;
    discount:                 number;
    discount_amountvalue:     number;
    tax:                      number;
    taxdata:                  Additionalcharges;
    promotions:               Additionalcharges;
    additionalcharges:        Additionalcharges;
    cardfees:                 number;
    manualpriceedit:          number;
    totalLoyaltyPoints:       number;
    totalLoyaltyPointsDeduct: number;
    rating:                   string;
    scanpromocouponcode:      any[];
    order_from:               string;
    response:                 Response[];
    id:                       string;
    dt:                       Date;
    balance:                  number;
    status:                   number;
}

export interface Additionalcharges {
}

export interface Code {
    sitemid: string;
    qty:     number;
    name:    string;
    code_id: null;
}

export interface Discountvalue {
    item_id:  string;
    discount: number;
}

export interface Extracost {
    charge:   string;
    costname: string;
    costrate: string;
    costtype: string;
    discount: string;
    total:    number;
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
    lineDiscount:             Additionalcharges;
    price:                    string;
    additionalcharges:        string;
    additionalfeeforprint:    string;
    additionalfeenontaxable:  string;
    additionalfeetaxable:     string;
    allowebt:                 boolean;
    alt_name:                 string;
    categoryid:               string;
    changed_price:            string;
    cost:                     number;
    desc:                     string;
    donotdiscountitem:        boolean;
    donottrackinventory:      string;
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
    pointsmultiplier:         string;
    showhideinventory:        number;
    tags:                     any[];
    unit_original:            number;
    priceedit:                boolean;
    upcfull:                  number;
    totalLoyaltyPoints:       number;
    totalLoyaltyPointsDeduct: number;
    id:                       string;
}

export interface Tax {
    inclusive: boolean;
    ruleid:    string;
    total:     number;
    values:    Additionalcharges;
}

export interface Payment {
    change:     number;
    tender:     number;
    tip_amount: number;
    method:     string;
    amount:     number;
    id:         string;
    processdt:  number;
}

export interface Response {
    Status:                string;
    Command:               string;
    Version:               string;
    ResponseCode:          string;
    ResponseMessage:       string;
    isApproved:            boolean;
    HostInformation:       string[];
    _processor:            Processor;
    TransactionType:       string;
    commandName:           string;
    AmountInformation:     string[];
    approvedAmount:        number;
    subTotalAmount:        number;
    tipAmount:             string;
    surcharge_fee:         number;
    Balance1:              number;
    Balance2:              number;
    fsaCard:               string;
    convenienceFeeAmount:  string;
    AccountInformation:    string[];
    accountNumber:         string;
    isCardInserted:        string;
    cardHolderName:        string;
    entryMode:             string;
    cardTypeName:          string;
    TraceInformation:      string[];
    AVSinformation:        string[];
    CommercialInformation: CommercialInformation;
    motoEcommerce:         MotoEcommerce;
    AdditionalInformation: string[];
    VASInformation:        Additionalcharges;
    TORInformation:        Additionalcharges;
    cardLogo:              string;
    currencyCode:          string;
    expirationYear:        string;
    expirationMonth:       string;
    paymentType:           string;
    pinVerified:           string;
    signature:             Signature;
    statusCode:            string;
    transactionDateTime:   string;
    transactionId:         string;
    merchantId:            string;
    paytype:               string;
    binValue:              string;
}

export interface CommercialInformation {
    PONumber:           string;
    CustomerCode:       string;
    TaxExempt:          string;
    TaxExemptID:        string;
    MerchantTaxID:      string;
    DestinationZipCode: string;
    ProductDescription: string;
}

export interface Processor {
    processorLogs:               string[];
    processorRawResponse:        string;
    processorReferenceNumber:    string;
    processorRequestFailed:      boolean;
    processorRequestWasApproved: boolean;
    processorResponseCode:       string;
    processorResponseMessage:    string;
    expressResponseCode:         string;
    expressResponseMessage:      string;
    hostResponseCode:            string;
    hostResponseMessage:         string;
    logs:                        string[];
    rawResponse:                 string;
}

export interface MotoEcommerce {
    MOTO_ECommerceMode: string;
    TransactionType:    string;
    SecureType:         string;
    OrderNumber:        string;
    Installments:       string;
    CurrentInstallment: string;
}

export interface Signature {
    statusCode: string;
}
