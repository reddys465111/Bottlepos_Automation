import { Locator } from "@playwright/test";
import { Checkbox } from "../../../../objects/checkbox";
import { LabelField } from "../../../../objects/labelField";


export type ColumnTitles = "Qty" | "Price" | "Avg Cost" | "Margin" | "Markup" | "Latest Cost" | "Qty On Hand" | "Prompt";
export class MultipackQty{
    _locator : Locator


    constructor(locator: Locator){
        this._locator = locator;

    }
   

    
    /**
     * Edit the row Price given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditPrice(option: {row: number, price: number}):Promise<void>{
        await this._locator.getByTestId(`price-${option.row}`).fill(option.price.toString());
    }

    /**
     * Edit the row Avg Cost given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditAvgCost(option: {row: number, AvgCost: number}):Promise<void>{
        await this._locator.getByTestId(`cost-${option.row}`).fill(option.AvgCost.toString()); 
    }
    /**
     * Edit the row Margin given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditMargin(option: {row: number, margin: number}):Promise<void>{
        await this._locator.getByTestId(`margin-${option.row}`).fill(option.margin.toString()); 
    }
    /**
     * Edit the row Markupt given the row position
     * @param row Position of a desired row
     * @param value Price value
    */
    public async EditMarkup(option: {row: number, markup: number}):Promise<void>{
        await this._locator.getByTestId(`markup-${option.row}`).fill(option.markup.toString()); 
    }
    /**
     * Edit the row Latest cost given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditlatestCost(option: {row: number, latestCost: number}):Promise<void>{
        await this._locator.getByTestId(`last-cost-${option.row}`).fill(option.latestCost.toString()); 
    }
    /**
     * Click the row label print given the row position
     * @param row Position of a desired row
     */
    public async LabelPrint(option: {row: number}):Promise<void>{
        await this._locator.getByTestId(`label-print-${option.row}`).click();
    }
    /**
     * Add a new Row
     */
    public async AddRow():Promise<void>{
        await this._locator.getByTestId('add-modifier').click();
    }
    /**
     * Remove the row given its position
     * @param row Position of a desired row
     */
    public async RemoveRow(option: {row: number}):Promise<void>{
        await this._locator.getByTestId(`remove-${option.row}`).click();
    }

}