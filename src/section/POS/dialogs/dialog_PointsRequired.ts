import { Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";

interface PointsRequiredRow {
    Name: string;
    Points: number;
}

export class Dialog_PointsRequired extends BaseDialog {
    OK:Button;
    constructor(page: Page) {
        super(page, 'Points Required');
        this.OK = new Button(this._locator.getByRole('button', {name: "OK"}));
    }

    public async getItemsAndPoints(): Promise<PointsRequiredRow[]> {
        const tableData: PointsRequiredRow[] = [];
        
        // Get all table rows (excluding header)
        const rows = await this._locator.locator('table tbody tr').all();

        console.log('rows.length', rows.length);
        
        for (const row of rows) {
            // Get the Name and Points cells from each row
            const nameCell = await row.locator('td').nth(0).textContent();
            const pointsCell = await row.locator('td').nth(1).textContent();
            
            if (nameCell && pointsCell) {
                tableData.push({
                    Name: nameCell.trim(),
                    Points: parseInt(pointsCell.trim(), 10)
                });
            }
        }
        
        return tableData;
    }

}