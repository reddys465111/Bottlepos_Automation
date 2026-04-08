import { type Page } from "playwright";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { LabelField } from "../../../objects/labelField";
 
export class Dialog_TransactionDetail extends BaseDialog {
 
    public Complete: Button;
    public Subtotal: LabelField;
    public Refund: Button;
    public Status: LabelField;
    public Remove: Button;
    public Void: Button;
    public Print: Button;
 
 
    public payments: {
        method: LabelField;
        amount: LabelField;
        Tendered: LabelField;
        Change: LabelField;
        Click: () => Promise<void>;
    }
 
 
    constructor(page: Page) {
        super(page, 'Transaction Details');
        this.Complete = new Button(this._locator.getByRole('button', { name: 'Complete' }));
        this.Subtotal = new LabelField(this._locator.getByTestId('transaction-subtotal'));
        this.Refund = new Button(this._locator.getByRole('button', { name: 'Refund' }));
        this.Status = new LabelField(this._locator.getByTestId('transaction-status'));
        this.Remove = new Button(this._locator.getByRole('button', { name: 'Remove' }));
        this.Void = new Button(this._locator.getByRole('button', { name: 'Void' }));
        this.Print = new Button(this._locator.getByRole('button', { name: 'Print' }));
        this.Complete.SetAfterEvent(async () => {
            await this._page.waitForTimeout(1500);
        });
     
        const paymentsTableRow = this._locator.locator('label:text("Payments")')
            .locator('..')
            .locator('table >> tbody >> tr >> td');
 
        this.payments = {
            method: new LabelField(paymentsTableRow.nth(0)),
            amount: new LabelField(paymentsTableRow.nth(1)),
            Tendered: new LabelField(paymentsTableRow.nth(2)),
            Change: new LabelField(paymentsTableRow.nth(3)),
            Click: async () => {
                await this._locator.getByRole('button', { name: /Payments/i }).click();
            }
        };
 
 
    }

    public async GetPaymentRow(rowIndex: number) {
        const row = this._locator
            .locator('label:text("Payments")')
            .locator('..')
            .locator('table >> tbody >> tr')
            .nth(rowIndex);
 
        return {
            method: await row.locator('td').nth(0).textContent(),
            amount: await row.locator('td').nth(1).textContent(),
            tendered: await row.locator('td').nth(2).textContent(),
            change: await row.locator('td').nth(3).textContent(),
        };
    }
    
    public async ClickTab(tabName: string) {
        await this._locator.getByRole('button', { name: tabName }).click();
    }

     public async Close(): Promise<void> {
        await this._locator.locator('header button').click();
        // await this._page.keyboard.press('Escape');
    }
}
 
 