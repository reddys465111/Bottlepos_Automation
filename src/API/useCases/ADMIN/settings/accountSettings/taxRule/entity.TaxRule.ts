

export interface EntityTaxRule {
    Name: string,
    Delete?: boolean,
    Inclusive?: boolean,
    MultiMode?: "single" | "multiple",
    POSTaxButton?: "select" | "Button1" | "Button2" | "Button3",
    POSTaxButtonColor?: string,
    DefaultTax?: boolean,
   //BaseTaxes?: {[key: number]: number[]}[],
    BaseTaxes? : string[];
    ApplyAtLocations?: {location: string, tax: string[]}[]
}