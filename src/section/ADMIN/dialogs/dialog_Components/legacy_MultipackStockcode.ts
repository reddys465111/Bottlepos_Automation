import { Locator } from "@playwright/test";
import { LabelField } from "../../../../objects/labelField";

export type ColumnTitles = "Items" | "Cases";
export class Legacy_MultipackStockcode{
    private _locator : Locator
    public TotalItemQty: LabelField;
    public TotalCaseQty: LabelField;

    constructor(locator: Locator){
        this._locator = locator;
        this.TotalItemQty = new LabelField(this._locator.locator('#totalqty'));
        this.TotalCaseQty = new LabelField(this._locator.locator('#totalcases'));
    }
    /**
     * return the row location given a position
     * @param itemPosition position of the desired row
     * @returns returning the row locator
     */
    private async RowItem(option: {row: number}):Promise<Locator>{
        var RowItem : Locator[]
        RowItem = await this._locator.locator('tr.stockCodes').all();
        return RowItem[option.row - 1];
    }
    /**
     * Edit stockcode field on a given row position
     * @param itemPosition Position of a desired row
     * @param value Stockcode value
     */
    public async EditStockcode(option: {row: number, stockCode: string}):Promise<void>{
        var RowItem = await this.RowItem({row: option.row});
        await RowItem.locator('#newitemcode').fill(option.stockCode);
    }
    /**
     * Edit the Item qty given the row position
     * @param rowPosition row position
     * @param value qty value
     */
    public async EditItemQty(option: {row: number, itemQty: string}):Promise<void>{
        var RowItem = await this.RowItem({row: option.row});
        await RowItem.locator('#newitemqtyonhand').fill(option.itemQty); 
    }
    /**
     * Edit the Case qty given the row position
     * @param rowPosition row position
     * @param value qty value
     */
    public async EditCaseQty(option: {row: number, caseQty: string}):Promise<void>{
        var RowItem = await this.RowItem({row: option.row});
        await RowItem.locator('#newitemqtyonhandcases').fill(option.caseQty); 
    }
    /**
     * Click on the Generate barcode icon give its row position
     * @param itemPosition row position
     */
    public async GenerateBarcode(option: { row: number}):Promise<void>{
        var RowItem = await this.RowItem({row: option.row});
        await RowItem.locator('[title="Generate Random Barcode"]').click(); 
    }

    /**
     * Add a new row 
     * @param itemPosition row position
     */
    public async AddStockcode():Promise<void>{
        // var RowItem = await this.RowItem({row: 1});
        // await RowItem.locator('[title="Add Stockcode"]').click(); 
        await this._locator.locator('[title="Add Stockcode"]').click(); 
    }
    /**
     * remove the row given its row position
     * @param itemPosition row position
     * @param value qty value
     */
    public async RemoveStockcode(option: {row: number}):Promise<void>{
        var RowItem = await this.RowItem({row: option.row});
        await RowItem.locator('[title="Remove Stockcode"]').click(); 
    }
}