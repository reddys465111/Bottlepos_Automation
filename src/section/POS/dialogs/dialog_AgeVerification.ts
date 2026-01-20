import { type Page } from "playwright";
import { GetAge, GetCurrentDate } from "../../../utils/dateManager";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";

export class Dialog_AgeVerification extends BaseDialog {
    
    public AlcoholCutoff : LabelField;
    public TobaccoCutoff: LabelField;
    public EnterBirthDate : TextField
    public Yes : Button;
    public No : Button;
    
    constructor(page: Page) { 
        super(page, 'Verify Age');
        this.AlcoholCutoff = new LabelField(page.getByTestId('alcohol-cutoff'));
        this.TobaccoCutoff = new LabelField(page.getByTestId('tobacco-cutoff'));
        this.EnterBirthDate = new TextField(this._locator.getByPlaceholder('MM/DD/YYYY'));
        this.Yes = new Button(this._locator.getByRole('button', { name: 'Yes' }));
        this.No = new Button(this._locator.getByRole('button', { name: 'No' }));
    }
    
    public async AlcoholVerifyAge() : Promise <number>{
        try {
            await this._locator.waitFor({ state: 'visible', timeout: 3000 });
        } catch {
            return NaN;
        }

        const text = (await this.AlcoholCutoff.getText()) ?? '';
        const afterColon = text.includes(':') ? text.split(':')[1].trim() : text.trim();
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
        const numRegex = /(\d{1,3})/;
        if (dateRegex.test(afterColon)) {
            const currentDate = GetCurrentDate();
            return GetAge(currentDate, afterColon);
        }
        const numMatch = afterColon.match(numRegex);
        return numMatch ? Number(numMatch[1]) : NaN;
    }

    public async TobaccoVerifyAge() : Promise <number>{
        try {
            await this._locator.waitFor({ state: 'visible', timeout: 3000 });
        } catch {
            return NaN;
        }

        const text = (await this.TobaccoCutoff.getText()) ?? '';
        const afterColon = text.includes(':') ? text.split(':')[1].trim() : text.trim();
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
        const numRegex = /(\d{1,3})/;
        if (dateRegex.test(afterColon)) {
            const currentDate = GetCurrentDate();
            return GetAge(currentDate, afterColon);
        }
        const numMatch = afterColon.match(numRegex);
        return numMatch ? Number(numMatch[1]) : NaN;
    }
}