

export interface EntityCategories {
    Delete?: 'Delete';
    Name: string;
    ReplaceName?: string,
    // Date?: Date;
    // Categorygroup?: IDataCategoryGroup;
    CategoryGroup?: string;
    AgeVerification?: string,
    // data:           string;
    DefaultTax?: string;
    DefaultMargin?: string;
    doNotDiscount?: boolean;
    AllowEBT?: boolean;
    DoNotShowToWebstore?: boolean;
    ExcludeNonCashAdj?: boolean;
    ExcludeLoyaltyReward?: boolean;

    NumItems?: string;
}
