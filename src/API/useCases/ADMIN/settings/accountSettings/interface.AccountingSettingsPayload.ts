export interface AccountingSettingsPayload {
    qrprint:                      null;
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
    ebt_button:                   EbtButton;
    pos_search:                   PosSearch;
    saledevice:                   string;
    itemdeposit:                  boolean;
    reccurrency:                  string;
    recprinttax:                  boolean;
    rectemplate:                  string;
    allow_refund:                 boolean;
    cashrounding:                 string;
    item_options:                 boolean;
    recemaillogo:                 string;
    recprintdesc:                 boolean;
    recprintlogo:                 boolean;
    defaultebttax:                Defaultebttax;
    lottoSettings:                null;
    other_options:                OtherOptions;
    recprintprice:                boolean;
    recptCustomer:                RecptCustomer;
    shortcut_keys:                ShortcutKeys;
    slideshowimgs:                any[];
    tvslidevideos:                any[];
    apply_discount:               boolean;
    cusscreenwidth:               string;
    customerrating:               boolean;
    discount_limit:               boolean;
    must_enter_age:               boolean;
    negative_items:               boolean;
    recprintcustqa:               boolean;
    cusscreenheight:              string;
    recprintdetails:              boolean;
    sale_below_cost:              string;
    showoncusscreen:              string;
    stack_discounts:              boolean;
    tvscreenpincode:              string;
    tvslideshowimgs:              any[];
    hide_void_option:             boolean;
    itemdepositlabel:             string;
    recprintcustname:             boolean;
    askfornumberimage:            string;
    cashreconcilation:            boolean;
    customerreviewurl:            string;
    houseSaleSettings:            HouseSaleSettings;
    itemdepositamount:            string;
    itemslideshowimgs:            any[];
    noncashadjustment:            Noncashadjustment;
    print_report_font:            string;
    recprintcustnotes:            boolean;
    recprintsalenotes:            boolean;
    slideshowinterval:            string;
    allow_decimal_sale:           boolean;
    allow_remove_items:           boolean;
    dayreportcatformat:           string;
    itemdeposittaxable:           boolean;
    printsignatureline:           boolean;
    recprintcustmobile:           boolean;
    registerreportshow:           string;
    discount_limit_type:          string;
    hide_no_sale_button:          boolean;
    recprintcustaddress:          boolean;
    showoncusitemscreen:          string;
    tvslideshowinterval:          string;
    askfornumberheading1:         string;
    askfornumberheading2:         string;
    enable_line_discount:         boolean;
    enable_lotto_buttons:         boolean;
    reccurrency_codepage:         string;
    default_starting_cash:        string;
    discount_limit_amount:        string;
    showsmsemailpromotion:        boolean;
    tvscreenvideoplaytime:        string;
    additionalchargesenable:      boolean;
    enableautoplayslideshow:      boolean;
    print_label_price_change:     boolean;
    showcashnoncashtocashbtn:     boolean;
    enable_remote_label_print:    boolean;
    enable_shortcut_draggable:    boolean;
    disable_pos_add_manual_item:  boolean;
    enable_suspendrecall_buttons: boolean;
}

export interface Defaultebttax {
    ebtenable: boolean;
    ebt_taxid: string;
}

export interface EbtButton {
    etbenable: boolean;
    ebt_taxid: string;
    ebtlabel:  string;
}

export interface HouseSaleSettings {
    itemIds: ItemIDS;
}

export interface ItemIDS {
    house_sale: string;
}

export interface Noncashadjustment {
    noncashadjustmentenable:         boolean;
    noncashadjustmentenableebt:      boolean;
    noncashadjustmentenablegift:     boolean;
    noncashadjustmentenablesidecard: boolean;
    noncashadjustmentcashasgrand:    boolean;
    noncashadjustmentpercent:        string | number;
    noncashadjustmentpercentdual:    string | number;
    noncashadjustmentminimum:        string | number;
    noncashadjustmenttext:           string;
    noncashadjustmentlabel:          string;
    noncashexcludebutton:            boolean;
    showdualcashtocashbtn:           boolean;
    dualnoncashexcludebutton:        boolean;
    enabledualpricingbutton:         boolean;
    roundtocentbutton:               boolean;
    dualdebit:                       boolean;
}

export interface OtherOptions {
    alcohol_cutoff_age: string;
    tobacco_cutoff_age: string;
}

export interface PosSearch {
    possearch_show_tags: boolean;
}

export interface RecptCustomer {
    recprintname:     boolean;
    recprintmobile:   boolean;
    recprintaddress:  boolean;
    recprintcustomer: boolean;
}

export interface ShortcutKeys {
}
