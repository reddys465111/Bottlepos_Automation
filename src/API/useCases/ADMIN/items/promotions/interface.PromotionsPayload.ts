export interface IPromotionsPayload {
    name:                    string;
    type:                    null;
    sdate:                   string;
    edate:                   string;
    promotax:                string;
    promotionType:           string;
    promotionStatus:         number;
    scandatapromotion:       number;
    webstoreenablepromotion: number;
    promotionforall:         number;
    promotionforallitems:    number;
    allowallcustomers:       number;
    promoappytype:           string;
    couponstatus:            boolean;
    couponcode:              string;
    selweekdays:             PromotionSelweekdaysPayload;
    catModifiersIds:         string[];
    sizeModifiersIds:        PromotionSizeModifiersIDPayload[];
    tagsModifiers:           string[];
    modifiers:               PromotionModifierPayload[];
    modifiersIds:            string[];
    custModifiersIds:        any[];
    custGroupsModifiersIds:  any[];
    id:                      string;
}

export interface PromotionModifierPayload {
    qty:                  string;
    price:                string;
    type:                 string;
    status:               number;
    scandatapromotion:    number;
    sdate:                string;
    edate:                string;
    promotax:             string;
    promotionforallitems: number;
    name:                 string;
}

export interface PromotionSelweekdaysPayload {
    repeat_sun: boolean;
    repeat_mon: boolean;
    repeat_tue: boolean;
    repeat_wed: boolean;
    repeat_thu: boolean;
    repeat_fri: boolean;
    repeat_sat: boolean;
}

export interface PromotionSizeModifiersIDPayload {
    id:       string;
    name:     string;
    ordernum: string;
}
