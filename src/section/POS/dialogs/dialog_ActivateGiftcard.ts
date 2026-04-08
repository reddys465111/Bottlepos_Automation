import { text } from "stream/consumers";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Page } from "@playwright/test";
import { TextField } from "../../../objects/textField";
import { Dropdown } from "../../../objects/dropdown";

export class Dialog_ActivateGiftcard extends BaseDialog {

    public GiftcardCode: TextField;
    public Expiration: Dropdown;
    public Amount: TextField;
    public ActivateButton: Button;
    public CancelButton: Button;

    constructor(page: Page) {
        super(page, 'Activate Gift Card');

        this.GiftcardCode = new TextField(this._locator.getByRole('textbox', { name: 'Gift Card Code:' }));

        this.Expiration = new Dropdown(this._locator.getByRole('combobox', { name: 'Expiration:' }));

        this.Amount = new TextField(this._locator.getByRole('textbox', { name: 'Amount:' }));

        this.ActivateButton = new Button(this._locator.getByRole('button', { name: 'Activate' }));

        this.CancelButton = new Button(this._locator.getByRole('button', { name: 'Cancel' }));


    }
}