// export interface PayfacResponse {
//     errorCode: string;
//     error:     string;
//     data:      payfacAddData;
// }

// export interface payfacAddData {
//     total:                    string;
//     rounding:                 number;
//     promocouponcount:         number;
//     promocoupondisc:          number;
//     isroundingenable:         boolean;
//     extracosts:               any[];
//     ref:                      string;
//     userid:                   string;
//     devid:                    string;
//     locid:                    string;
//     custid:                   string;
//     custemail:                string;
//     custnotes:                string;
//     custname:                 string;
//     custphone:                string;
//     notes:                    string;
//     cost:                     string;
//     subtotal:                 string;
//     numitems:                 number;
//     processdt:                number;
//     items:                    Item[];
//     payments:                 PaymentElement[];
//     payout:                   number;
//     discountamt:              number;
//     multipleDiscounts:        Additionalcharges;
//     discountvalue:            Discountvalue[];
//     discountindex:            number;
//     customerage:              number;
//     customerdob:              string;
//     discount:                 number;
//     discount_amountvalue:     number;
//     totaltendered:            number;
//     promotions:               Additionalcharges;
//     additionalcharges:        Additionalcharges;
//     totalLoyaltyPoints:       number;
//     totalLoyaltyPointsDeduct: number;
//     rating:                   string;
//     scanpromocouponcode:      any[];
//     manualpriceedit:          number;
//     tax:                      string;
//     taxdata:                  Taxdata;
//     response:                 Response[];
//     order_from:               null;
//     declined:                 boolean;
//     id:                       string;
//     dt:                       Date;
//     balance:                  number;
//     status:                   number;
// }

// export interface Additionalcharges {
// }

// export interface Discountvalue {
//     item_id:  string;
//     discount: string;
// }

// export interface Item {
//     ref:                     string;
//     sitemid:                 string;
//     qty:                     number;
//     name:                    string;
//     unit:                    number;
//     taxid:                   string;
//     tax:                     Tax;
//     price:                   string;
//     code_id:                 null;
//     itemrank:                string;
//     itemdeposit:             number;
//     additionalcharges:       string;
//     additionalfeetaxable:    string;
//     additionalfeenontaxable: string;
//     additionalfeeforprint:   number;
//     itemtype:                string;
//     upcfull:                 number;
//     pointsmultiplier:        number;
//     loyaltypointsrequired:   string;
//     percenttype:             string;
//     allowebt:                number;
//     donottrackinventory:     string;
//     desc:                    string;
//     cost:                    number;
//     unit_original:           number;
//     categoryid:              number;
//     changed_price:           string;
//     priceedit:               boolean;
//     id:                      string;
// }

// export interface Tax {
//     total:     number;
//     values:    Values;
//     inclusive: boolean;
//     ruleid:    string;
// }

// export interface Values {
//     "5": number;
// }

// export interface PaymentElement {
//     method:     string;
//     amount:     string;
//     tender:     string;
//     change:     string;
//     tip_amount: number;
//     id:         string;
//     processdt:  number;
// }

// export interface Response {
//     TransactionResponse: TransactionResponse;
//     paymentId:           string;
//     PaymentStatus:       string;
//     transactionId:       string;
//     PaymentText:         string;
//     amount:              string;
//     approvedAmount:      string;
//     subTotalAmount:      string;
//     CmdStatus:           string;
//     TextResponse:        string;
//     Date:                Date;
//     tipAmount:           number;
//     statusCode:          string;
//     isApproved:          boolean;
// }

// export interface TransactionResponse {
//     payment_id:              string;
//     date_created:            Date;
//     external_transaction_id: string;
//     merchant_reference:      null;
//     status:                  string;
//     amount:                  string;
//     amount_authorized:       string;
//     amount_captured:         string;
//     amount_capturable:       number;
//     amount_refunded:         string;
//     amount_refundable:       string;
//     tip_amount:              number;
//     donation_amount:         number;
//     currency:                string;
//     card_present:            boolean;
//     payment_method_id:       null;
//     notes:                   null;
//     authorization_code:      null;
//     processor:               string;
//     funding_source:          null;
//     payment:                 TransactionResponsePayment;
//     last_error:              string;
//     last_error_code:         string;
//     refunds:                 any[];
// }

// export interface TransactionResponsePayment {
//     type:              string;
//     brand:             string;
//     last_4:            string;
//     exp_month:         string;
//     exp_year:          number;
//     cardholder_name:   null;
//     receipt_data:      ReceiptData;
//     avs_response:      string;
//     payment_method_id: null;
// }

// export interface ReceiptData {
//     emv_app_id:           string;
//     emv_cryptogram:       string;
//     emv_reference_number: string;
//     emv_app_label:        string;
//     emv_term_id:          string;
//     emv_auth_code:        string;
// }

// export interface Taxdata {
//     "5": string;
// }
