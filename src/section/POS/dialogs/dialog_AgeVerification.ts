import { type Page } from "playwright";
import { GetAge, GetCurrentDate } from "../../../utils/dateManager";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";
 
export class Dialog_AgeVerification extends BaseDialog {
 
    public AlcoholCutoff: LabelField;
    public TobaccoCutoff: LabelField;
    public EnterBirthDate: TextField;
    public Yes: Button;
    public No: Button;
 
    constructor(page: Page) {
        super(page, 'Verify Age');
        this.AlcoholCutoff = new LabelField(page.getByTestId('alcohol-cutoff'));
        this.TobaccoCutoff = new LabelField(page.getByTestId('tobacco-cutoff'));
        this.EnterBirthDate = new TextField(this._locator.getByPlaceholder('MM/DD/YYYY'));
        this.Yes = new Button(this._locator.getByRole('button', { name: 'Yes' }));
        this.No = new Button(this._locator.getByRole('button', { name: 'No' }));
    }
 
   public async AlcoholVerifyAge(): Promise<number | null> {
    const text = await this.AlcoholCutoff.getText();
 
    if (!text || !text.includes(':')) {
        return null;
    }
 
    const beforeage = text.split(':')[1]?.trim();
 
    if (!beforeage) {
        return null;
    }
 
    return GetAge(GetCurrentDate(), beforeage);
}
 
// ---------- Tobacco ----------
public async TobaccoVerifyAge(): Promise<number | null> {
    const text = await this.TobaccoCutoff.getText();
 
    if (!text || !text.includes(':')) {
        return null;
    }
 
    const beforeAge = text.split(':')[1]?.trim();
 
    if (!beforeAge) {
        return null;
    }
 
    return GetAge(GetCurrentDate(), beforeAge);
}
 
   
}
 
 