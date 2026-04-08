import { Page, Locator } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";

export class Dialog_PartialApproval extends BaseDialog {
    
    public Yes: Button;
    public No: Button;
    public ApprovedAmount: Locator;
    public RemainingBalance: Locator;
    public Title: Locator;

    constructor(page: Page) {
        super(page, 'Partial Approval');

        // Title and message locators
        this.Title = this._locator.locator('h3', { hasText: 'Partial Approval' });
        this.ApprovedAmount = this._locator.locator('h4', { hasText: 'Approved Amount' });
        this.RemainingBalance = this._locator.locator('h4', { hasText: 'Remaining Cash Balance' });

        // Action buttons
        this.Yes = new Button(this._locator.locator('button:has-text("Yes")'));
        this.No = new Button(this._locator.locator('button:has-text("No")'));
    }

    /**
     * Get the approved amount text value (e.g., "$5.00")
     */
    public async GetApprovedAmount(): Promise<string> {
        const text = await this.ApprovedAmount.textContent();
        return text?.replace('Approved Amount:', '').trim() ?? '';
    }

    /**
     * Get the remaining cash balance text value (e.g., "$12.27")
     */
    public async GetRemainingBalance(): Promise<string> {
        const text = await this.RemainingBalance.textContent();
        return text?.replace('Remaining Cash Balance:', '').trim() ?? '';
    }
}
