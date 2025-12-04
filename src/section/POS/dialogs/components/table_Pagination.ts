import { Locator } from "@playwright/test";
import { Button } from "../../../../objects/button";

export class Table_Pagination {
    private _locator: Locator;

    public Previous: Button;
    public Next: Button;
    constructor(locator: Locator){
        this._locator = locator;

        this.Previous = new Button(this._locator.locator('[id$=_previous]'));
        this.Next = new Button(this._locator.locator('[id$=_next]'));
    }


    public async ClickPageNumber(index: number): Promise<void>{
        await this._locator.locator('.paginate_button:not(.previous):not(.next):not(.disabled)',{has:this._locator.locator(`a:has-text("${index}"))`)}).click();

    }


    

    
}