

export interface ItemResponse <T extends ItemResponseSearch | ItemResponseData > {
    errorCode: string;
    error:     string;
    data:      T;
}

export interface ItemResponseSearch {
    data:            { [key: string]: ItemResponseData };
    draw:            string;
    recordsTotal:    string;
    recordsFiltered: string;
}

export interface ItemResponseData {
    id?:                   number;
    name:                 string;
    description:          string;
    alt_name:             string;
    cost:                 string;
    price:                string;
    margin:               string;
    markup:               string;
    vendoritemno:         string;
    reorder_value:        number;
    reorder_point:        number;
    unitspercase:         number;
    lastcost:             string;
    taxid:                string;
    stock_codes:          ItemResponseStockCode[];
    total_stock?:          number;
    modifiers:            ItemResponseModifier[];
    code:                 string;
    upcfull?:              string;
    seprate_total_stock?:  string;
    type:                 string;
    qty:                  string;
    casecosttotal:        string;
    itemrank:             string;
    webprice:             string;
    vendorname:           string;
    shortcutname:         string;
    reminddate:           string;
    percenttype:          string;
    notes:                string;
    minprice:             string;
    itemtype:             string;
    itemsortno:           string;
    custom_image:         any[];
    color_code:           string;
    additionalPrice:      string[];
    itemtags:             string[];
    additionalcharges:    string[];
    pointsmultiplier:     number;
    pointsvalue:          string;
    itemdeposit?:          any[];
    category_name?:        string;
    categoryid:           number;
    cat_group_name?:       string;
    cat_group_id?:         number;
    supplierid:           number;
    supplier_name?:        string;
    showtoweb:            boolean;
    closeout:             boolean;
    allowebt:             number;
    excludefrompromotion: boolean;
    donottrackinventory:  boolean;
    donotdiscountitem:    boolean;
    itemviewonprompt:     boolean;
    showhideinventory:    boolean;
    autoupdate:           boolean;
    promptforqty:         boolean;
    shortcutkeys:         boolean;
    sort_index?:           number;
    qtydayssupply?:        string;
    code_id?:             string;
    merge_ids?:            string;
}

export interface ItemResponseModifier {
    qty:          string;
    cost:         string;
    name:         string;
    type:         string;
    price:        string;
    margin:       string;
    markup:       string;
    maxqty:       string;
    minqty:       string;
    lastcost:     string;
    viewonprompt: boolean;
}

export interface ItemResponseStockCode {
    id?:         string;
    code:       string;
    upcfull:    string;
    stocklevel: string;
}
