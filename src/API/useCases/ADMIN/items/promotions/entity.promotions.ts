export enum PromotionType {
    'X Qty For $Y' = 'simple',
    '$Y Off X Qty' = 'dollar',
    '%Y Off X Qty' = 'percent',
    '%Y Off above X Qty' = 'percentonabove',
    '$Y to above X Qty' = 'fixed',
    'Fixed Item Pricelist' = 'custom',
    '% Above Cost' = 'percentonabovecost',
}


export interface EntityPromotions {
    Id?: string,
    Name: string,
    NewName?: string,
    Delete?: boolean,
    Type?: PromotionType,
    AppliedType?: {
        type?: 'default' | 'weekly', 
        RepeatsOn?: {
            Sunday?: boolean, 
            Monday?: boolean, 
            Tuesday?: boolean, 
            Wednesday?: boolean, 
            Thursday?: boolean, 
            Friday?: boolean, 
            Saturday?: boolean
        }
    },
    StarDate?: string,
    EndDate?: string,
    CustomerTax?: string,
    Status?: boolean,
    EnableGroup?: boolean,
    EnableScanData?: boolean,
    EnableWebstore?: boolean,
    BulkSale?: {qty: number, price: number}[],
    Items?: string[],
    Categories?: string[],
    Sizes?: string[],
    Tags?: string[]
    Customer?: {
        AllowAllCustomer?: boolean,
        Customers?: string[]
    }
    CustomerGroups?: {
        groups?: string[]
    }
}  
