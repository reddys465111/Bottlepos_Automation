import { type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { PromptTerminal } from "../../../objects/promptTerminal";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";

export class Dialog_Checkout extends BaseDialog{

    Cash: Button;
    Card: Button;
    Sidecard : Button;
    Return: Button;
    Cancel: Button;
    TotalItems: LabelField;
    CashTotal: LabelField;
    Tendered: TextField;
    Balance: LabelField;
    Cashbalance: LabelField;
    Change: LabelField;
    RegularTotal:LabelField;
    EBTTotal: LabelField;
    NCATotal:LabelField;
    EBTSale: Button;
    EBTCash: Button;
    NCABalance: LabelField;
    DebitCard: Button;
    GiftCard: Button;
    RegularBalance: LabelField;

    
    constructor(page: Page){
        super(page, 'Checkout');

        this.TotalItems = new LabelField(this._locator.getByTestId('total-items'));
        this.CashTotal = new LabelField(this._locator.getByTestId('cash-total'));
        this.EBTTotal =  new LabelField(this._locator.getByTestId("checkoutebt-total"));
        this.NCABalance = new LabelField(this._locator.getByTestId("non-cash-adj-balance"));
 
        this.Tendered = new TextField(this._locator.getByTestId('tendered-input'));
        this.Balance = new LabelField(this._locator.getByTestId('balance'));
        this.Cashbalance = new LabelField(this._locator.getByTestId('cash-balance'));
        this.Change = new LabelField(this._locator.getByTestId('change'));
        // this.TotalItems
        this.Cash = new Button(this._locator.getByRole('button', { name: 'Cash' , exact: true}));
        this.Card = new Button(this._locator.getByRole('button', { name: 'Card' , exact: true}));
        this.Sidecard = new Button(this._locator.getByRole('button', { name: 'Side Card', exact: true}));
        this.Return = new Button(this._locator.getByRole('button', { name: 'Return' }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));
        this.EBTSale = new Button(this._locator.getByRole('button', { name: 'EBT Sale', exact: true}));
        this.EBTCash = new Button(this._locator.getByRole('button', { name: 'EBT Cash', exact: true}));
        this.RegularTotal = new LabelField(this._locator.getByTestId("regular-total"));
        this.NCATotal = new LabelField(this._locator.getByTestId("non-cash-adj-total"));
        this.DebitCard = new Button(this._locator.getByRole('button', { name: 'Debit Card', exact: true}));
        this.GiftCard = new Button(this._locator.getByRole('button', { name: 'Gift Card', exact: true}));
        this.RegularBalance = new LabelField(this._locator.getByTestId("regular-balance"));
 
        // wait for the prompt terminal to be hidden after clicking thexxxxesrct hbfbg card button
        this.Card.SetAfterEvent(async () => {
            const promptTerminal = new PromptTerminal(page);
            //await promptTerminal.waitForVisible();
            await promptTerminal.waitForHidden();
        });
    }

    /**
     * Click on the Cash button with the exact change option
     * @param index index of the button to click
     */
    public async ClickCashPaymentButton(option: {index?: number}):Promise<void>{
        const cashPaymentButton = this._locator.getByTestId("cash-payment-shortcut-buttons").locator(`button:nth-of-type(${option.index})`);
        await cashPaymentButton.hover();
        await cashPaymentButton.click();
    }
}