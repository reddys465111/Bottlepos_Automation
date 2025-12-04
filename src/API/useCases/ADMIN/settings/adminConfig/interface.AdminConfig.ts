export interface IAdminConfig {
    errorCode?: string;
    error?:     string;
    data?:      IACData;
}

export interface IACData {
    general?:         IACGeneral;
    pos?:             IACPos;
    invoice?:         IACInvoice;
    adminconfig?:     IACAdminconfig;
    webstoreconfig?:  IACWebstoreconfig;
    devices?:         { [key: string]: IACDevice };
    locations?:       { [key: string]: IACLocation };
    users?:           { [key: string]: IACUser };
    tax?:             IACTax;
    saleolderrecord:  IACSaleOlderRecord[];
    templates?:       { [key: string]: IACTemplate };
    pusher?:          IACPusher;
}

export interface IACAdminconfig {
    printsetting:    IACPrintsetting;
    itemexactsearch: boolean;
}

export interface IACPrintsetting {
    eftpos: IACEftpos;
    keypad: boolean;
}

export interface IACEftpos {
    custrec:  string;
    enabled:  boolean;
    merchrec: string;
    provider: string;
    receipts: boolean;
}

export interface IACDevice {
    id:                          number | string;
    name:                        string;
    locationname?:               string;
    disabled:                    number | string;
    type?:                       string;
    laneId?:                     string;
    pax_ip?:                     string;
    pax_port?:                   string;
    ordertype?:                  string;
    cameratype?:                 string;
    locationid?:                 string;
    pax_auto_ip?:                string;
    datacap_port?:               string;
    orderdisplay?:               boolean;
    pax_protocol?:               string;
    pax_serial_no?:              string;
    camerapassword?:             string;
    cameraprotocol?:             string;
    camerausername?:             string;
    pf_terminal_id?:             string;
    cameraipaddress?:            string;
    datacap_secure_device?:      string;
    datacap_secure_device_pdcx?: string;
    kitchenid?:                  string;
}

export interface IACGeneral {
    url:                             string;
    accept:                          string;
    payfac:                          IACPayfac;
    twilio:                          IACTwilio;
    bizicon:                         string;
    bizlogo:                         string;
    bizname:                         string;
    datacap:                         IACDatacap;
    version:                         string;
    accntype:                        string;
    bizemail:                        string;
    bizstate:                        string;
    gcontact:                        number;
    timezone:                        string;
    altlabels:                       IACAltlabels;
    biznumber:                       string;
    bizsuburb:                       string;
    card_type:                       string;
    email_tls:                       boolean;
    giftcards:                       IACGiftcards;
    bizaddress:                      string;
    bizcountry:                      string;
    custnumber:                      string;
    dateformat:                      string;
    email_host:                      string;
    email_pass:                      string;
    email_port:                      string;
    email_user:                      string;
    tp_ebtcash:                      boolean;
    use_upc_10:                      boolean;
    apptypelogo:                     string;
    bizpostcode:                     string;
    paxsettings:                     IACPaxsettings;
    tp_ebtsales:                     boolean;
    Triposdirect:                    IACTriposdirect;
    autosettings:                    IACWebstoreconfig;
    content_type:                    string;
    pusher_start:                    boolean;
    sms_provider:                    string;
    scanner_speed:                   string;
    tp_allowDebit:                   string;
    currencyformat:                  string;
    giftcardenable:                  boolean;
    include_nontax:                  boolean;
    itemsalerepcol:                  { [key: string]: boolean };
    tendersettings:                  IACTendersettings;
    twilio_service:                  boolean;
    billing_account:                 string;
    loyaltysettings:                 IACLoyaltysettings;
    sms_integration:                 boolean;
    additionaltendor:                any[];
    allow_import_csv:                boolean;
    mobiletp_ebtcash:                boolean;
    tp_authorization:                string;
    inventorysettings:               IACInventorysettings;
    mobiletp_ebtsales:               boolean;
    tp_application_id:               string;
    tp_thresholdAmount:              string;
    report_default_time:             IACReportDefaultTime;
    show_other_loc_item:             boolean;
    tp_application_name:             string;
    allow_duplicate_code:            boolean;
    tp_express_account_id:           string;
    tp_promptForSignature:           string;
    tp_application_version:          string;
    tp_express_acceptor_id:          string;
    recurly_inactive_access:         string;
    tp_isManualEntryAllowed:         string;
    hide_unnecessary_options:        boolean;
    tp_confirmOriginalAmount:        string;
    tp_express_account_token:        string;
    hide_summary_report_zero_amount: boolean;
    gcontactaval:                    boolean;
}

export interface IACTriposdirect {
    tD_url:                       string;
    tD_accept:                    string;
    tD_content_type:              string;
    tD_developerKey:              string;
    tD_developerSecret:           string;
    tD_tp_application_id:         string;
    tD_tp_thresholdAmount:        string;
    tripos_direct_ebtcash:        boolean;
    tD_tp_application_name:       string;
    tripos_direct_ebtsales:       boolean;
    tD_tp_promptForSignature:     string;
    tD_tp_application_version:    string;
    mobiletripos_direct_ebtcash:  boolean;
    mobiletripos_direct_ebtsales: boolean;
}

export interface IACAltlabels {
    cash:               string;
    item:               string;
    items:              string;
    total:              string;
    change:             string;
    cheque:             string;
    credit:             string;
    eftpos:             string;
    refund:             string;
    deposit:            string;
    subtotal:           string;
    tendered:           string;
    "sale-time":        string;
    "transaction-id":   string;
    "transaction-ref":  string;
    "void-transaction": string;
}

export interface IACWebstoreconfig {
}

export interface IACDatacap {
    datacapurl:                                 string;
    giftsetting:                                IACDatacapGiftsetting;
    datacapxmlip:                               string;
    datacapxmlport:                             string;
    datacap_ebtcash:                            boolean;
    datacapmerchant:                            string;
    datacap_ebtsales:                           boolean;
    datacap_giftcard:                           boolean;
    datacapaccountno:                           string;
    datacapcustomtip:                           boolean;
    datacapsequenceno:                          string;
    datacap_debitsales:                         boolean;
    mobiledatacap_ebtcash:                      boolean;
    mobiledatacap_ebtsales:                     boolean;
    mobiledatacap_giftcard:                     boolean;
    data_cap_custom_one_tip:                    string;
    data_cap_custom_two_tip:                    string;
    data_cap_custom_four_tip:                   string;
    datacap_batchclosetoggle:                   boolean;
    datacap_giftcard_item_id:                   string;
    mobiledatacap_debitsales:                   boolean;
    data_cap_custom_three_tip:                  string;
    datacap_allow_manual_entry:                 boolean;
    datacap_support_offline_sale:               boolean;
    datacap_offline_max_transactions:           string;
    datacap_offline_transaction_purchase_limit: string;
}

export interface IACDatacapGiftsetting {
    catIds:  IACGiftsettingCatIDS;
    itemIds: IACGiftsettingCatIDS;
}

export interface IACGiftsettingCatIDS {
    gift_add: string;
}

export interface IACGiftcards {
    giftcard_itemid:     string;
    giftcard_expiration: string;
}

export interface IACInventorysettings {
    evaluationperiod: string;
}

export interface IACLoyaltysettings {
    loyaltystatus:    boolean;
    pointdollarratio: string;
}

export interface IACPaxsettings {
    giftsetting:             IACPaxsettingsGiftsetting;
    pax_ebtcash:             boolean;
    pax_timeout:             string;
    pax_ebtsales:            boolean;
    pax_giftcard:            boolean;
    pax_surcharge:           boolean;
    pax_debitsales:          boolean;
    pax_fraud_chip:          boolean;
    pax_custom_tips:         boolean;
    pax_fraud_swipe:         boolean;
    pax_fraud_manual:        boolean;
    pax_troubleshoot:        boolean;
    mobilepax_ebtcash:       boolean;
    pax_fraud_scanner:       boolean;
    mobilepax_ebtsales:      boolean;
    mobilepax_giftcard:      boolean;
    pax_custom_one_tip:      string;
    pax_custom_two_tip:      string;
    pax_fraudprevention:     string;
    pax_fraudwarningamt:     string;
    pax_prompt_for_tips:     boolean;
    mobilepax_debitsales:    boolean;
    pax_application_name:    string;
    pax_batchclosetoggle:    boolean;
    pax_custom_three_tip:    string;
    pax_giftcard_item_id:    string;
    pax_fraud_contactless:   boolean;
    pax_fraud_chipfallback:  boolean;
    pax_promptForSignature:  string;
    pax_application_version: string;
}

export interface IACPaxsettingsGiftsetting {
    itemIds: IACGiftsettingCatIDS;
}

export interface IACPayfac {
    pf_apiurl:               string;
    pf_ebtcash:              boolean;
    pf_timeout:              string;
    pf_ebtsales:             boolean;
    pf_giftcard:             boolean;
    pf_accountid:            string;
    pf_debitsales:           boolean;
    pf_fraud_chip:           boolean;
    pf_fraud_swipe:          boolean;
    pf_fraud_manual:         boolean;
    pf_fraud_scanner:        boolean;
    mobilepf_giftcard:       boolean;
    pf_custom_one_tip:       string;
    pf_custom_two_tip:       string;
    pf_ebtcash_mobile:       boolean;
    pf_ebtsales_mobile:      boolean;
    pf_fraudprevention:      string;
    pf_fraudwarningamt:      string;
    pf_prompt_for_tips:      boolean;
    mobilepf_debitsales:     boolean;
    pf_card_not_present:     boolean;
    pf_custom_three_tip:     string;
    pf_giftcard_item_id:     string;
    pf_fraud_contactless:    boolean;
    pf_max_refund_amount:    string;
    pf_fraud_chipfallback:   boolean;
    pf_payfac_custom_tips:   boolean;
    pf_ebt_card_not_present: boolean;
}

export interface IACReportDefaultTime {
    etime: string;
    stime: string;
}

export interface IACTendersettings {
    tendercheck:          boolean;
    tendersidecard:       boolean;
    mobiletendercheck:    boolean;
    mobiletendersidecard: boolean;
    tendermoreamountcard: boolean;
}

export interface IACTwilio {
    twilio_sid:        string;
    twilio_number:     string;
    twilio_serviceid:  string;
    twilio_auth_token: string;
}

export interface IACInvoice {
    payinst:         string;
    emailmsg:        string;
    defaultduedt:    string;
    defaulttemplate: string;
}

export interface IACLocation {
    id:            number | string;
    name:          string;
    locationname?: string;
    disabled:      number | string;
    dt?:           Date;
}

export interface IACPos {
    reclogo:                      string;
    taxedit:                      string;
    disctype:                     string;
    recline2:                     string;
    recline3:                     string;
    priceedit:                    string;
    recfooter:                    string;
    recqrcode:                    string;
    salerange:                    string;
    drawercard:                   boolean;
    saledevice:                   string;
    reccurrency:                  string;
    recprinttax:                  boolean;
    rectemplate:                  string;
    allow_refund:                 boolean;
    cashrounding:                 string;
    item_options:                 boolean;
    recemaillogo:                 string;
    recprintlogo:                 boolean;
    lottoSettings:                IACLottoSettings;
    other_options:                IACOtherOptions;
    recprintprice:                boolean;
    shortcut_keys:                { [key: string]: { [key: string]: string } };
    slideshowimgs:                any[];
    apply_discount:               boolean;
    cusscreenwidth:               string;
    discount_limit:               boolean;
    must_enter_age:               boolean;
    negative_items:               boolean;
    cusscreenheight:              string;
    sale_below_cost:              string;
    showoncusscreen:              string;
    hide_void_option:             boolean;
    askfornumberimage:            string;
    cashreconcilation:            boolean;
    houseSaleSettings:            IACHouseSaleSettings;
    itemslideshowimgs:            any[];
    print_report_font:            string;
    slideshowinterval:            string;
    allow_remove_items:           boolean;
    printsignatureline:           boolean;
    discount_limit_type:          string;
    hide_no_sale_button:          boolean;
    showoncusitemscreen:          string;
    askfornumberheading1:         string;
    askfornumberheading2:         string;
    enable_lotto_buttons:         boolean;
    reccurrency_codepage:         string;
    discount_limit_amount:        string;
    enableautoplayslideshow:      boolean;
    enable_remote_label_print:    boolean;
    enable_shortcut_draggable:    boolean;
    enable_suspendrecall_buttons: boolean;
}

export interface IACHouseSaleSettings {
    itemIds: IACItemIDS;
}

export interface IACItemIDS {
    house_sale: string;
}

export interface IACLottoSettings {
    catIds:  IACLottoSettingsCatIDS;
    itemIds: IACLottoSettingsCatIDS;
}

export interface IACLottoSettingsCatIDS {
    lotto_sale:   string;
    lotto_payout: string;
}

export interface IACOtherOptions {
    alcohol_cutoff_age: string;
    tobacco_cutoff_age: string;
}

export interface IACPusher {
    app_key:      string;
    app_cluster:  string;
    app_channel:  string;
    pusher_start: boolean;
    error:        string;
}

export interface IACSaleOlderRecord {
    id:               string;
    ref:              string;
    type:             string;
    channel:          string;
    data:             string;
    userid:           string;
    deviceid:         string;
    locationid:       string;
    custid:           string;
    discount:         string;
    rounding:         string;
    cost:             string;
    total:            string;
    balance:          string;
    status:           string;
    delivery_status:  null;
    processdt:        string;
    duedt:            string;
    dt:               Date;
    payout:           string;
    discountamt:      string;
    notes:            string;
    promocouponcount: string;
    promocoupondisc:  string;
    manualpriceedit:  string;
    rating:           string;
}

export interface IACTax {
    items: IACItems;
    rules: { [key: string]: IACRule };
}

export interface IACItems {
    [key: string]: IACItem;
}

export interface IACItem {
    name:       string;
    altname?:    string;
    type?:       string;
    value:      string;
    multiplier?: string;
    id?:         string;
}

export interface IACRule {
    name:         string;
    inclusive:    boolean;
    isdefaulttax: boolean;
    mode:         string;
    base:         number[];
    locations:    IACWebstoreconfig;
    posbutton:    IACPosbutton;
    id:           string;
}

export interface IACPosbutton {
    taxid:       string;
    button:      string;
    buttoncolor: string;
}

export interface IACTemplate {
    id:                  string;
    default_template_id: string;
    name:                string;
    type:                string;
    content:             string;
    created_at:          Date;
    updated_at:          Date;
}

export interface IACUser {
    id:          string;
    username:    string;
    admin:       string;
    permissions: string;
    disabled:    string;
    mobile:      string;
    dob:         string;
    address:     string;
    zipcode:     string;
    api_client:  string;
}
