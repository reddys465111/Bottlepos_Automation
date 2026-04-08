import { Locator } from "@playwright/test";
import { Checkbox } from "../../../../objects/checkbox";
import { LabelField } from "../../../../objects/labelField";


export type ColumnTitles = "Qty" | "Price" | "Avg Cost" | "Margin" | "Markup" | "Latest Cost" | "Qty On Hand" | "Prompt";
export class Legacy_MultipackQty{
    _locator : Locator

    public PackQty: LabelField;
    public PackQtyOnHand: LabelField;
 
    // public Prompt: Checkbox;

    constructor(locator: Locator){
        this._locator = locator;
        this.PackQty = new LabelField(this._locator.locator('#totalqty'));
        this.PackQtyOnHand = new LabelField(this._locator.locator('#totalcases'));
        // this.Prompt = new Checkbox(this._locator.locator('#prompt'));
    }
    /**
     * get the row locator given its position
     * @param row position of the desired row
     * @returns returning the row locator
     * @example this.Row({row: 1});
     */
    private async Row(option: {row: number}):Promise<Locator>{
        var Row : Locator[]
        Row = await this._locator.locator('tbody tr').all()
        return Row[option.row-1]
    }

    /**
     * Get the cell locator given the row position and column title
     * @param row Position of a desired row
     * @param column Title of the column
     * @returns returning the cell locator
     * @example this.GetCell({row: 1, column: "Price"});
     * @returns 
     */
    private async GetCell(option: {row: number, column: ColumnTitles}):Promise<Locator>{
        // var Row = await this.Row({row: option.row});
        // const columnOrder: ColumnTitles[] = ["Qty", "Price", "Avg Cost", "Margin", "Markup", "Latest Cost", "Qty On Hand", "Prompt"];
        const columnsHeaders = await this._locator.locator('thead tr th').all();
        let columnIndex: number | null = null;
        for (let i = 0; i < columnsHeaders.length; i++) {

            let headerText: string | null = null;
            try {
                headerText = await columnsHeaders[i].locator('small').textContent({timeout: 100});
            } catch (error) {
                // console.error(`Error getting text content for header at index ${i}:`, error);
                continue; // Skip to the next iteration if there's an error
            }
            if (headerText) {
                if ( headerText.includes(option.column)) {
                    // console.log(`Found column "${option.column}" at index ${i}`);
                    columnIndex = i;
                    break;
                }
            }
        }

        if (typeof columnIndex === 'undefined') {
            throw new Error(`Column "${option.column}" not found`);
        }

        const cell = this._locator.locator(`tbody tr:nth-child(${option.row}) td:nth-child(${columnIndex! + 1})`);    
        return cell;
    }
    /**
     * Edit the row Price given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditPrice(option: {row: number, price: number}):Promise<void>{
        // var Row = await this.Row({row: option.row});
        await (await this.GetCell({row: option.row, column: "Price"})).locator('input').fill(option.price.toString());
        // await Row.locator('#newitemprice').fill(option.price.toString());
    }

    /**
     * Edit the row Avg Cost given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditAvgCost(option: {row: number, AvgCost: number}):Promise<void>{
        var Row = await this.Row({row: option.row});
        await Row.locator('#itemcost').fill(option.AvgCost.toString()); 
    }
    /**
     * Edit the row Margin given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditMargin(option: {row: number, margin: number}):Promise<void>{
        var Row = await this.Row({row: option. row});
        await Row.locator('#itemmargin').fill(option.margin.toString()); 
    }
    /**
     * Edit the row Markupt given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditMarkup(option: {row: number, markup: number}):Promise<void>{
        var Row = await this.Row({row: option.row});
        await Row.locator('#itemmarkup').fill(option.markup.toString()); 
    }
    /**
     * Edit the row Latest cost given the row position
     * @param row Position of a desired row
     * @param value Price value
     */
    public async EditlatestCost(option: {row: number, latestCost: number}):Promise<void>{
        var Row = await this.Row({row: option.row});
        await Row.locator('#itemlastcost').fill(option.latestCost.toString()); 
    }

    public async ReadlatestCostValue(option: { row: number }): Promise<string> {
        // Get the specific row
        const Row = await this.Row({ row: option.row });
 
        // Locate the input field for latest cost
        const input = Row.locator('#itemlastcost');
 
        // Wait for it to be attached and visible
        await input.waitFor({ state: 'attached', timeout: 15000 });
        await input.scrollIntoViewIfNeeded();
        await input.waitFor({ state: 'visible', timeout: 15000 });
 
        // Read and return its value
        const value = await input.inputValue();
       
        return value;
    }
    /**
     * Click the row label print given the row position
     * @param row Position of a desired row
     */
    public async LabelPrint(option: {row: number}):Promise<void>{
        var Row = await this.Row({row: option.row});
        await Row.locator('.grey').click();
    }
    /**
     * Add a new Row
     */
    public async AddRow():Promise<void>{
        var Row = await this.Row({row: 1});
        await Row.locator('.pull-right').click();
    }
    /**
     * Remove the row given its position
     * @param row Position of a desired row
     */
    public async RemoveRow(option: {row: number}):Promise<void>{
        var Row = await this.Row({row: option.row});
        await Row.locator('.red remove-modifier').click();
    }

}