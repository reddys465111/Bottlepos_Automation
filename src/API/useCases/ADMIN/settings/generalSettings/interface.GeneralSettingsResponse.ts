export interface IGeneralSettingsResponse {
    errorCode: string;
    error:     string;
    data:      IGeneralSettingsResponseData;
}

export interface IGeneralSettingsResponseData {
    accept:                          string;
    accntype:                        string;
    additionaltendor:                any[];
    allow_duplicate_code:            boolean;
    allow_import_csv:                boolean;
    altlabels:                       Altlabels;
    apptypelogo:                     string;
    autosettings:                    Autosettings;
    billing_account:                 string;
    bizaddress:                      string;
    bizcountry:                      string;
    bizemail:                        string;
    bizicon:                         string;
    bizlogo:                         string;
    bizname:                         string;
    biznumber:                       string;
    bizpostcode:                     string;
    bizstate:                        string;
    bizsuburb:                       string;
    card_type:                       string;
    content_type:                    string;
    currencyformat:                  string;
    custnumber:                      string;
    datacap:                         Datacap;
    dateformat:                      string;
    doordash_enabled:                boolean;
    email_host:                      string;
    email_pass:                      string;
    email_port:                      string;
    email_tls:                       boolean;
    email_user:                      string;
    gcontact:                        number;
    gcontactaval:                    boolean;
    giftcardenable:                  boolean;
    giftcards:                       Giftcards;
    hide_summary_report_zero_amount: boolean;
    hide_unnecessary_options:        boolean;
    include_nontax:                  boolean;
    inventorysettings:               Inventorysettings;
    itemsalerepcol:                  { [key: string]: boolean };
    loyaltysettings:                 Loyaltysettings;
    mobiletp_ebtcash:                boolean;
    mobiletp_ebtsales:               boolean;
    paxsettings:                     Paxsettings;
    payfac:                          Payfac;
    pusher_start:                    boolean;
    recurly_inactive_access:         string;
    report_default_time:             ReportDefaultTime;
    scanner_speed:                   string;
    show_other_loc_item:             boolean;
    sms_integration:                 boolean;
    sms_provider:                    string;
    tendersettings:                  Tendersettings;
    timezone:                        string;
    tp_allowDebit:                   string;
    tp_application_id:               string;
    tp_application_name:             string;
    tp_application_version:          string;
    tp_authorization:                string;
    tp_confirmOriginalAmount:        string;
    tp_ebtcash:                      boolean;
    tp_ebtsales:                     boolean;
    tp_express_acceptor_id:          string;
    tp_express_account_id:           string;
    tp_express_account_token:        string;
    tp_isManualEntryAllowed:         string;
    tp_promptForSignature:           string;
    tp_thresholdAmount:              string;
    Triposdirect:                    Triposdirect;
    twilio:                          Twilio;
    twilio_service:                  boolean;
    url:                             string;
    use_upc_10:                      boolean;
    version:                         string;
}

export interface Triposdirect {
    mobiletripos_direct_ebtcash:  boolean;
    mobiletripos_direct_ebtsales: boolean;
    tD_accept:                    string;
    tD_content_type:              string;
    tD_developerKey:              string;
    tD_developerSecret:           string;
    tD_tp_application_id:         string;
    tD_tp_application_name:       string;
    tD_tp_application_version:    string;
    tD_tp_promptForSignature:     string;
    tD_tp_thresholdAmount:        string;
    tD_url:                       string;
    tripos_direct_ebtcash:        boolean;
    tripos_direct_ebtsales:       boolean;
}

export interface Altlabels {
    cash:               string;
    change:             string;
    cheque:             string;
    credit:             string;
    deposit:            string;
    eftpos:             string;
    item:               string;
    items:              string;
    refund:             string;
    "sale-time":        string;
    subtotal:           string;
    tendered:           string;
    total:              string;
    "transaction-id":   string;
    "transaction-ref":  string;
    "void-transaction": string;
}

export interface Autosettings {
}

export interface Datacap {
    data_cap_custom_four_tip:                   string;
    data_cap_custom_one_tip:                    string;
    data_cap_custom_three_tip:                  string;
    data_cap_custom_two_tip:                    string;
    datacap_allow_manual_entry:                 boolean;
    datacap_batchclosetoggle:                   boolean;
    datacap_debitsales:                         boolean;
    datacap_ebtcash:                            boolean;
    datacap_ebtsales:                           boolean;
    datacap_giftcard:                           boolean;
    datacap_giftcard_item_id:                   string;
    datacap_offline_max_transactions:           string;
    datacap_offline_transaction_purchase_limit: string;
    datacap_support_offline_sale:               boolean;
    datacapaccountno:                           string;
    datacapcustomtip:                           boolean;
    datacapmerchant:                            string;
    datacapsequenceno:                          string;
    datacapurl:                                 string;
    datacapxmlip:                               string;
    datacapxmlport:                             string;
    giftsetting:                                Giftsetting;
    mobiledatacap_debitsales:                   boolean;
    mobiledatacap_ebtcash:                      boolean;
    mobiledatacap_ebtsales:                     boolean;
    mobiledatacap_giftcard:                     boolean;
}

export interface Giftsetting {
    catIds:  IDS;
    itemIds: IDS;
}

export interface IDS {
    gift_add: null | string;
}

export interface Giftcards {
    giftcard_expiration: string;
    giftcard_itemid:     string;
}

export interface Inventorysettings {
    evaluationperiod: string;
}

export interface Loyaltysettings {
    loyaltystatus:    boolean;
    pointdollarratio: string;
}

export interface Paxsettings {
    giftsetting:             Giftsetting;
    mobilepax_debitsales:    boolean;
    mobilepax_ebtcash:       boolean;
    mobilepax_ebtsales:      boolean;
    mobilepax_giftcard:      boolean;
    pax_application_name:    string;
    pax_application_version: string;
    pax_batchclosetoggle:    boolean;
    pax_custom_one_tip:      string;
    pax_custom_three_tip:    string;
    pax_custom_tips:         boolean;
    pax_custom_two_tip:      string;
    pax_debitsales:          boolean;
    pax_ebtcash:             boolean;
    pax_ebtsales:            boolean;
    pax_fraud_chip:          boolean;
    pax_fraud_chipfallback:  boolean;
    pax_fraud_contactless:   boolean;
    pax_fraud_manual:        boolean;
    pax_fraud_scanner:       boolean;
    pax_fraud_swipe:         boolean;
    pax_fraudprevention:     string;
    pax_fraudwarningamt:     string;
    pax_giftcard:            boolean;
    pax_giftcard_item_id:    string;
    pax_prompt_for_tips:     boolean;
    pax_promptForSignature:  string;
    pax_surcharge:           boolean;
    pax_timeout:             string;
    pax_troubleshoot:        boolean;
}

export interface Payfac {
    mobilepf_debitsales:     boolean;
    mobilepf_giftcard:       boolean;
    pf_accountid:            string;
    pf_apiurl:               string;
    pf_card_not_present:     boolean;
    pf_custom_one_tip:       string;
    pf_custom_three_tip:     string;
    pf_custom_two_tip:       string;
    pf_debitsales:           boolean;
    pf_ebt_card_not_present: boolean;
    pf_ebtcash:              boolean;
    pf_ebtcash_mobile:       boolean;
    pf_ebtsales:             boolean;
    pf_ebtsales_mobile:      boolean;
    pf_fraud_chip:           boolean;
    pf_fraud_chipfallback:   boolean;
    pf_fraud_contactless:    boolean;
    pf_fraud_manual:         boolean;
    pf_fraud_scanner:        boolean;
    pf_fraud_swipe:          boolean;
    pf_fraudprevention:      string;
    pf_fraudwarningamt:      string;
    pf_giftcard:             boolean;
    pf_giftcard_item_id:     string;
    pf_max_refund_amount:    string;
    pf_payfac_custom_tips:   boolean;
    pf_prompt_for_tips:      boolean;
    pf_timeout:              string;
}

export interface ReportDefaultTime {
    etime: string;
    stime: string;
}

export interface Tendersettings {
    mobiletendercheck:    boolean;
    mobiletendersidecard: boolean;
    tendercheck:          boolean;
    tendermoreamountcard: boolean;
    tendersidecard:       boolean;
}

export interface Twilio {
    twilio_auth_token: string;
    twilio_number:     string;
    twilio_serviceid:  string;
    twilio_sid:        string;
}
