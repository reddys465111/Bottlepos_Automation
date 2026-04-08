

export interface EntityTaxItem {
    Name: string,
    AltName?: string,
    Type?:  'vat' | 'standard',
    Value?: number,
    Delete?: boolean
}
