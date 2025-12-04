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
        let beforeage = (await this.AlcoholCutoff.getText()).split(':')[1].trim();
        let currentDate = GetCurrentDate();
        return GetAge(currentDate, beforeage);
    }

    public async TobaccoVerifyAge() : Promise <number>{
        let beforeage = (await this.TobaccoCutoff.getText()).split(':')[1].trim();
        let currentDate = GetCurrentDate();
        return GetAge(currentDate, beforeage);
    }
}