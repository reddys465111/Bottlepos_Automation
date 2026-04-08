import { Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";

export class Dialog_DayReport extends Legacy_BaseDialog  {
    public Close: Button;

    constructor(page: Page) {
        super(page, 'Day report');
        this.Close = new Button(this._locator.getByRole('button', { name: 'Close' }));
    }
}