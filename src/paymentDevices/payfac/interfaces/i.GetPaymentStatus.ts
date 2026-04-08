export interface GetPaymentStatusResponse {
    errorCode: string;
    error:     string;
    data?:      GetPaymentStatusData;
}

export interface GetPaymentStatusData {
    payment_id:              string;
    date_created:            string;
    external_transaction_id: string;
    merchant_reference:      null;
    status:                  string;
    amount:                  string;
    amount_authorized:       string;
    amount_captured:         string;
    amount_capturable:       number;
    amount_refunded:         string;
    amount_refundable:       string;
    tip_amount:              number;
    donation_amount:         number;
    currency:                string;
    card_present:            boolean;
    payment_method_id:       null;
    notes:                   null;
    authorization_code:      null;
    processor:               string;
    funding_source:          null;
    payment:                 GetPayment;
    last_error:              string;
    last_error_code:         string;
    refunds:                 any[];
}

export interface GetPayment {
    type:              string;
    brand:             string;
    last_4:            string;
    exp_month:         string | null;
    exp_year:          number | null;
    cardholder_name:   null;
    receipt_data:      GetPaymentReceiptData;
    avs_response:      string;
    payment_method_id: null;
}

export interface GetPaymentReceiptData {
    emv_app_id:           string;
    emv_cryptogram:       string;
    emv_reference_number: string;
    emv_app_label:        string;
    emv_term_id:          string;
    emv_auth_code:        string;
}
