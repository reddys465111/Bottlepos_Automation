import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, KEY, payfac, Session } from '../../../../src/utils';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';
 
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, {Scenario: {
    Admin: {
        Settings: {
            GeneralSettings: {
                CreditCard: {
                    PayFac: {
                        Enable: true,
                    }
                }
            }
        }
    }
  }});
});
 
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});
 
test.describe("POS- Bottle Deposit", {tag: ['@pos', '@bottleDeposit']}, () => {   
    test('[C4038] Verify Bottle Deposit is included in Total calculation',{ tag: ['@bottle', '@deposit'] },async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });

        // Step 2: Open Options tab (opens Edit Item dialog)
        await POS.Register.ItemLines.OpenOptions({ row: 1 });
        expect(await POS.Dialog.EditItem.IsVisible()).toBeTruthy();

        await POS.Dialog.EditItem.ClickTab('Options');

        // Step 3: Choose bottle deposit
        await POS.Dialog.EditItem.Options.BottleDeposit.SelectOption({byText:'1PK'});
        await POS.Dialog.EditItem.Update.Click();
        await POS.Dialog.Success.Ok.Click();
        
        // --- Step 2: Capture Register Values ---
        const subtotal = Reports.parseCurrency(await POS.Register.Subtotal.getText());
        const tax = Reports.parseCurrency(await POS.Register.Tax.getText());
        const deposit = Reports.parseCurrency(await POS.Register.Deposit.getText());
        const total = Reports.parseCurrency(await POS.Register.Total.getText());

        console.log(`Subtotal=${subtotal}, Tax=${tax}, Deposit=${deposit}, Total=${total}`);

        // --- Step 3: Validate Total Calculation ---
        expect(total,` Error: Total mismatch! Expected ${subtotal + tax + deposit}, got ${total}`)
        .toEqual(subtotal + tax + deposit);
    });

    test('[C4175] Verify Bottle Deposit amount in Reports',{ tag: ['@bottle', '@deposit', '@reports','@nonparallelizable'] },async () => {
        // --- Step 1: Login to POS Application ---
        await POS.Login.In();

        // --- Step 2: Capture current Bottle Deposit value from Register Report ---
        await POS.Reports.Click();
        await POS.Reports.RegisterReport.Click();
        const oldBottleDeposit = await POS.Reports.RegisterReport.Table.GetCellValueByRowLabel("Bottle Deposit", 3);
        console.log('Old Bottle Deposit in Register Report:', oldBottleDeposit);

        // --- Step 3: Ring an item and add Bottle Deposit ---
        await POS.Register.Click();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });

        await POS.Register.ItemLines.OpenOptions({ row: 1 });
        expect(await POS.Dialog.EditItem.IsVisible(), "Error: Edit Item dialog did not open").toBeTruthy();

        await POS.Dialog.EditItem.ClickTab('Options');
        await POS.Dialog.EditItem.Options.BottleDeposit.SelectOption({ byText: '10PK' });
        await POS.Dialog.EditItem.Update.Click();
        await POS.Dialog.Success.Ok.Click();

        // --- Step 4: Complete the Sale (Cash Payment) ---
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();

        // --- Step 5: Re-check Bottle Deposit value in Register Report ---
        await POS.Reports.Click();
        await POS.Reports.RegisterReport.Click();
        await POS.waitForTimeout(1000);

        expect(await POS.Reports.RegisterReport.Table.IsNotEmpty(),'Error: Register Report table should not be empty').toBeTruthy();

        const newBottleDeposit = await POS.Reports.RegisterReport.Table.GetCellValueByRowLabel("Bottle Deposit", 3);

        expect(oldBottleDeposit,`Error: Bottle Deposit did not update. Old=${oldBottleDeposit}, New=${newBottleDeposit}`).not.toEqual(newBottleDeposit);

    });

});