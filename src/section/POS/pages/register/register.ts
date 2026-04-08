import { Table_Register } from "../../tables/table_Register/table_Register";
import { Shortcuts } from "./shortcuts";
// import { Dialog_Checkout } from "../../../dialogs/dialog_Checkout";
import { DiscountToggle } from "../../../../objects/specialObjects/discountToggle";
import { TextField } from "../../../../objects/textField";
import { Autocomplete } from "../../../../objects/autocomplete";
import { Button } from "../../../../objects/button";
import { LabelField } from "../../../../objects/labelField";
import { Locator, Page } from "@playwright/test";
import { IsMobile, Timeouts } from "../../../../utils";
import { ppid } from "process";
import { CUSTOMER } from "../../../../utils/data/data.customer";

export class Register {
    private _page: Page;
    _locator: Locator;
    StockCode : TextField;
    StockSearch : Autocomplete;
    ItemLines: Table_Register;
    AddStockCode: Button;
    AddItem: Button;
    PayButton : Button;
    ChangeTaxes: Button;
    TotalItems : LabelField;
    Subtotal : LabelField;
    Additionalfees:LabelField;
    Deposit : LabelField;
    Tax : LabelField;
    Total : LabelField;
    EbtTotal : LabelField;
    // Checkout : Dialog_Checkout;
    Shortcuts: Shortcuts;
    Discount: DiscountToggle;
    ApplyDiscount: Button;
    Suspend: Button;
    Recall: Button;
    TaxButton: Button;
    Payout: Button;
    Customer: {
        Mobile: TextField,
        Options: Button,
        SelectCustomer: (option: {customer: string})=>Promise<void>
    };
    // CustomerOptions: Button;
    Cancel : Button;
    warnings: LabelField;
    OtherButton: Button;
    OthersButton: Button;
    TotalButton: Button;
    // DualPay: Button;
    NCApay:Button;
    SaleNotes: TextField;
    constructor(page: Page, device: string) {
        this._page = page;
        this._locator = page.locator('#react-root');
        // SALES
        this.AddItem = new Button(this._locator.getByRole('button', { name: 'Add Item', exact: true }));
        this.ItemLines= new Table_Register(this._page);
        this.StockCode = new TextField(this._locator.getByTestId(`${device}:search-controls`).getByPlaceholder('Stock Code'));
        this.AddStockCode = new Button(this._locator.getByTestId(`${device}:search-controls`).getByRole('button', { name: 'Add', exact: true }));
        this.StockSearch = new Autocomplete(page, this._locator.getByTestId(`${device}:search-controls`).getByPlaceholder('Stock Search'));
        this.Shortcuts = new Shortcuts(page);
        this.Discount= new DiscountToggle(this._page, this._locator);
        this.warnings = new LabelField(this._locator.getByTestId('warning-message'));
        this.ApplyDiscount= new Button(this._locator.getByRole('button', {name: "Apply Discount"}));
        const customerPhoneBlock = this._locator.getByTestId('customer-phone-block');
        this.Customer = {
            Mobile: new TextField(customerPhoneBlock.getByPlaceholder('Customer Mobile')),
            Options: new Button(customerPhoneBlock.getByRole('button', { name: 'Options' })),
            SelectCustomer: async (option: {customer: string})=>{
                await this.Customer.Mobile.setText({ value: option.customer });
                await customerPhoneBlock.getByTestId(new RegExp('customer-option-')).filter({ hasText: option.customer }).click();
                await this._page.waitForTimeout(1500);
            }
        }
        
        // TOTALS
        this.TotalItems = new LabelField(this._locator.getByTestId('total-items-value'));
        this.Subtotal = new LabelField(this._locator.getByTestId('subtotal-value'));
        this.Additionalfees = new LabelField(this._locator.getByTestId('additional-fees-value'));
        this.Tax = new LabelField(this._locator.getByTestId('tax-value'));
        this.EbtTotal = new LabelField(this._locator.getByTestId('ebttotal-value'));
        this.Total = new LabelField(this._locator.getByTestId('total-value'));
        this.Deposit = new LabelField(this._locator.getByTestId('item-deposit-value'));
        // this.Checkout = new Checkout(this._locator.locator('#myModal[style*="display: block;"]'));
        this.PayButton = new Button(this._locator.getByTestId(/paybtn$/));
        this.OtherButton = new Button(this._locator.getByRole('button', { name: 'Other', exact: true }));
        this.OthersButton = new Button(this._locator.getByRole('button', { name: 'Others', exact: true }));
        this.TotalButton = new Button(this._locator.getByRole('button', { name: 'Total', exact: true }));

        //Buttons
        this.Payout = new Button(this._locator.getByRole('button', { name: 'Payout' }));
        this.Suspend = new Button(this._locator.getByRole('button', { name: 'Suspend' }));
        this.Recall = new Button(this._locator.getByRole('button', { name: 'Recall' }));
        this.Recall.SetBeforeEvent(async () => {
            await this._page.waitForTimeout(Timeouts.DEFAULT);
        });
        this.ChangeTaxes = new Button(this._locator.locator('#etbbutton'));
        this.Cancel=new Button(this._locator.getByRole( 'button', {name : 'Cancel'}));
        // this.DualPay = new Button(this._locator.getByTestId('dual_paybtn'));
        this.NCApay = new Button(this._locator.getByTestId('nca_paybtn'));
        this.SaleNotes = new TextField(this._locator.locator('textarea[name="sale-notes"]'));
        this.TaxButton = new Button(this._locator.getByTestId(`${device}:checkout-buttons`).getByTestId('taxbutton'));
        // this.PayButton.After(async () => {
        //     await this._page.waitForTimeout(2000);
        // });

        this.Suspend.SetAfterEvent(async () => {
            await this._page.waitForTimeout(Timeouts.DEFAULT);
        });

        this.Suspend.SetBeforeEvent(async () => {
            if(IsMobile()){
                if(await this._locator.getByTestId(`${device}:checkout-buttons`).getAttribute('aria-expanded') === 'false'){
                    await this.OtherButton.Click();
                }
            }
            // await this._page.waitForTimeout(Timeouts.DEFAULT);
        });

        this.Recall.SetAfterEvent(async () => {
            await this._page.waitForTimeout(Timeouts.DEFAULT);
        });

        this.Recall.SetBeforeEvent(async () => {
            if(IsMobile()){
                if(await this._locator.getByTestId(`${device}:checkout-buttons`).getAttribute('aria-expanded') === 'false'){
                    await this.OtherButton.Click();
                }
            }
            // await this._page.waitForTimeout(Timeouts.DEFAULT);
        });
    }

    /**
     * The method will write the stockcode in the search field, 
     * then will select the first option that matches with the code
     * @param options request for 1 value, the stockcode of the Item
     * @example  await POS.Register.AddItemByStockcode({stockCode: "999999415"});
     */
    public async AddItemByStockcode(option: { stockCode: string }): Promise<void> {
        await this.StockCode.setText({ value: option.stockCode });
        await this.AddStockCode.Click();
 
        // Safe wait: page may reload / close
        try {
            await this._page.waitForTimeout(1000);
        } catch {
            // ignore – page navigated or closed
        }
    }

    public async Click(): Promise<void> {
        if (IsMobile()) {
            const toggle = this._locator.locator('[aria-label="Toggle menu"]');
            try {
                await toggle.waitFor({ state: 'visible', timeout: 5000 });
                await toggle.click();
            } catch {
                // toggle did not appear → continue
            }
        }
 
        await this._locator.getByRole('link', { name: 'Register' }).click();
    }
}
