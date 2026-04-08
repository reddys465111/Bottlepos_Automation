import { Locator } from "@playwright/test";
import { LabelField } from "../../../../objects/labelField";

export type ColumnTitles = "Items" | "Cases";
export class MultipackStockcode{
    private _locator : Locator;

    constructor(locator: Locator){
        this._locator = locator;
        
    }

    /**
     * Edit stockcode field on a given row position
     * @param itemPosition Position of a desired row
     * @param value Stockcode value
     */
    public async EditStockcode(option: {row: number, stockCode: string}):Promise<void>{
        await this._locator.getByTestId(`stockcode-${option.row-1}`).fill(option.stockCode);
    }
    /**
     * Edit the Item qty given the row position
     * @param rowPosition row position
     * @param value qty value
     */
    public async EditItemQty(option: {row: number, itemQty: string}):Promise<void>{
        await this._locator.getByTestId(`stocklevel-${option.row-1}`).fill(option.itemQty); 
    }
    /**
     * Edit the Case qty given the row position
     * @param rowPosition row position
     * @param value qty value
     */
    public async EditCaseQty(option: {row: number, caseQty: string}):Promise<void>{
        await this._locator.getByTestId(`unitspercase-${option.row-1}`).fill(option.caseQty); 
    }
    /**
     * Click on the Generate barcode icon give its row position
     * @param itemPosition row position
     */
    public async GenerateBarcode(option: { row: number}):Promise<void>{
        await this._locator.getByTestId(`generate-button-${option.row-1}`).click(); 
    }

    /**
     * Get the barcode value from the stockcode field
     * @param option: contains the row position
     * @returns the barcode value
     */
    public async GetBarcode(option: {row: number}):Promise<string>{
        return await this._locator.getByTestId(`stockcode-${option.row-1}`).inputValue();
    }

    /**
     * Add a new row 
     * @param itemPosition row position
     */
    public async AddStockcode():Promise<void>{
        await this._locator.getByTestId('add-button-0').click(); 
    }
    /**
     * remove the row given its row position
     * @param itemPosition row position
     * @param value qty value
     */
    public async RemoveStockcode(option: {row: number}):Promise<void>{
        await this._locator.getByTestId(`remove-button-${option.row-1}`).click(); 
    }
}