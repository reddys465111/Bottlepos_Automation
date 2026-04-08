
export interface EntityAdditionalFees {
    Delete?: boolean,
    Name: string,
    Type: 'percentage' | 'amount',
    Value: number,
    Taxable?: boolean
}