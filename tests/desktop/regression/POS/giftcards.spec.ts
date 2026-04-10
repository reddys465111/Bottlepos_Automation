import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS } from '../../../../src/utils';
import { injectActivateGiftCard, injectGiftCardItemIntoItemsMock, injectInternalGiftCardBalanceMock, injectRedeemGiftCardMock } from '../../../../src/API/useCases/giftCards/giftCard';


//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                    GeneralSettings: {
                        GiftCards: {
                            Enable: true,
                        }
                    }
                },
            }
        }
    });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.LoadScenario({
        Admin: {
            Settings: {
                GeneralSettings: {
                    GiftCards: {
                        Enable: false,
                    }
                }
            },
        },
    });
    await Initializer.Finalize(page, testInfo);
});

test.describe("Gift Card Test Cases", { tag: ['@GiftCards', '@regression'] }, () => {

    test('[C5587]  select the Activate Gift Card button to sell gift cards to customers', { tag: ['@ActivateGiftCard', '@register'] }, async ({ }) => {
        //Login to POS
        await POS.Login.In();
        //cate the others button on the bottom right and select it
        await POS.Register.OthersButton.Click();
        //A new dialog box should open up with the options "Activate Gift Card" and "Check Gift Card Balance"
        expect(await POS.Dialog.OthersButton.IsVisible()).toBeTruthy();
        //Select the "Activate Gift Card" option
        await POS.Dialog.OthersButton.ActivateGiftCardbutton.Click();
        //Dialog bos should appear with the title "Activate Gift Card"
        expect(await POS.Dialog.ActivateGiftCard.IsVisible()).toBeTruthy();
    });

    test('[C5589] Input on all fields under Activate Gift Card and validate the fields ', { tag: ['@ActivateGiftCard', '@register'] }, async ({ }) => {
        //Login to POS
        await POS.Login.In();
        //Click Others Button to  open the Gift Card options
        await POS.Register.OthersButton.Click();
        //Select the "Activate Gift Card" button
        await POS.Dialog.OthersButton.ActivateGiftCardbutton.Click();
        //Input a custom gift card number into the "Gift Card Number" field
        await injectActivateGiftCard({ code: "GIFT-CARD-12345", initial_balance: 1000, expires_at: 'Never' });
        // Each field should be filled with the corresponding information from the injectActivateGiftCard function
        await POS.Dialog.ActivateGiftCard.GiftcardCode.setText({ value: "GIFT-CARD-12345" });
        //Verify Able to eneter the Text in the Gift Card Number field
        expect(await POS.Dialog.ActivateGiftCard.GiftcardCode.getText()).toBe("GIFT-CARD-12345");
        await POS.Dialog.ActivateGiftCard.Amount.setText({ value: "1000" });
        //Verify Able to eneter the Text in the Amount field
        expect(await POS.Dialog.ActivateGiftCard.Amount.getText()).toBe("1000");
        await POS.Dialog.ActivateGiftCard.Expiration.SelectOption({ byText: "Never" });
        //Verify Able to select the option in the Expiration dropdown
        expect(await POS.Dialog.ActivateGiftCard.Expiration.GetSelectedOption()).toBe("Never");

    });

    test('[C5592] Enter the information for a Gift Card and complete the transaction and check if it activates successfully', { tag: ['@ActivateGiftCard', '@register'] }, async () => {
        const GiftCardID = await POS.FakeData.getMobile();
        //  Activate GiftCard With Mock API
        await injectActivateGiftCard({ code: GiftCardID.toString(), initial_balance: 2000, expires_at: null });
        // Add GiftCard Item to Items Mock API
        await injectGiftCardItemIntoItemsMock(Initializer.GetPage());
        // Login the POS Application
        await POS.Login.In();
        // Click on the Others button to open the Gift Card options
        await POS.Register.OthersButton.Click();
        await POS.Dialog.OthersButton.ActivateGiftCardbutton.Click();
        await POS.Dialog.ActivateGiftCard.GiftcardCode.setText({ value: GiftCardID.toString() });
        await POS.Dialog.ActivateGiftCard.Amount.setText({ value: "2000" });
        await POS.Dialog.ActivateGiftCard.Expiration.SelectOption({ byText: "Never" });
        await POS.Dialog.ActivateGiftCard.ActivateButton.Click();
        //Verify Giftcard Activated Successfully
        expect(await POS.Dialog.GiftcardAdded.Message.GetLabel()).toContain(`Gift card ${GiftCardID} has been added to cart. Complete the payment to activate it.`);
        //Click OK Button
        await POS.Dialog.GiftcardAdded.OK.Click();
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Complete the payment using Cash
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    });

    test('[C5598] Sell a Gift Card with special characters as needed for my customers', { tag: ['@ActivateGiftCard', '@register'] }, async () => {
        const GiftCardID = `GIFT-@!${await POS.FakeData.getMobile()}`;
        //  Activate GiftCard With Mock API
        await injectActivateGiftCard({ code: GiftCardID.toString(), initial_balance: 3000, expires_at: null });
        // Add GiftCard Item to lineitem Mock API
        await injectGiftCardItemIntoItemsMock(Initializer.GetPage());
        // Login the POS Application
        await POS.Login.In();
        // Click on the Others button to open the Gift Card options
        await POS.Register.OthersButton.Click();
        await POS.Dialog.OthersButton.ActivateGiftCardbutton.Click();
        await POS.Dialog.ActivateGiftCard.GiftcardCode.setText({ value: GiftCardID.toString() });
        await POS.Dialog.ActivateGiftCard.Amount.setText({ value: "2000" });
        await POS.Dialog.ActivateGiftCard.Expiration.SelectOption({ byText: "Never" });
        await POS.Dialog.ActivateGiftCard.ActivateButton.Click();
        //Verify Giftcard Activated Successfully
        expect(await POS.Dialog.GiftcardAdded.Message.GetLabel()).toContain(`Gift card ${GiftCardID} has been added to cart. Complete the payment to activate it.`);
        //Click OK Button
        await POS.Dialog.GiftcardAdded.OK.Click();
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Complete the payment using Cash
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    });

    test('[C5599] Use Gift Card as a tender to complete a transaction', { tag: ['@ActivateGiftCard', '@register'] }, async (page) => {
        const GiftCardID = `GIFT-${await POS.FakeData.getZipcode()}-123`;
        //  Activate GiftCard With Mock API
        await injectActivateGiftCard({ code: GiftCardID.toString(), initial_balance: 2000, expires_at: null });
        // Add GiftCard Item to Items Mock API
        await injectGiftCardItemIntoItemsMock(Initializer.GetPage());
        //Check Gift Card Balance Mock API
        // await injectInternalGiftCardBalanceMock({ code: GiftCardID.toString(), balance: "2000.00" });
        // Login the POS Application
        await POS.Login.In();
        // Click on the Others button to open the Gift Card options
        await POS.Register.OthersButton.Click();
        await POS.Dialog.OthersButton.ActivateGiftCardbutton.Click();
        await POS.Dialog.ActivateGiftCard.GiftcardCode.setText({ value: GiftCardID.toString() });
        await POS.Dialog.ActivateGiftCard.Amount.setText({ value: "2000" });
        await POS.Dialog.ActivateGiftCard.Expiration.SelectOption({ byText: "Never" });
        await POS.Dialog.ActivateGiftCard.ActivateButton.Click();
        //Verify Giftcard Activated Successfully
        expect(await POS.Dialog.GiftcardAdded.Message.GetLabel()).toContain(`Gift card ${GiftCardID} has been added to cart. Complete the payment to activate it.`);
        //Click OK Button
        await POS.Dialog.GiftcardAdded.OK.Click();
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Verify the Cash Total Store Value of the Gift Card before redeeming it
        const cashTotalValue = await POS.Dialog.Checkout.CashTotal.getText();
        //Complete the payment using Cash
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        //vErify Transaction Completed Successfully
        await POS.Dialog.CheckoutComplete.No.Click();
        //Ring up the item to redeem the gift card balance
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click Pay Button
        await POS.Register.PayButton.Click();
        // Get the amount due for redemption
        const amountDue = parseFloat(cashTotalValue.replace('$', '').replace(',', ''));
        // Setup redemption mock - card Activated  $2000, will redeem the amount due
        await injectRedeemGiftCardMock({ code: GiftCardID.toString(), currentBalance: "2000.00", amountDue: amountDue });
        //Select Gift Card as the tender type
        await POS.Dialog.Checkout.GiftCard.Click();
        //Scan the GiftCard to redeem the balance
        await POS.Dialog.ScanGiftCard.GiftCardCode.setText({ value: GiftCardID.toString() });
        //Click Save button
        await POS.Dialog.ScanGiftCard.Save.Click();
        //Verify the  Applied Giftcard Value
        await POS.Dialog.RedeemGiftCardAmount.Amount.getText();
        //Click Yes Button to apply the gift card balance to the transaction
        await POS.Dialog.RedeemGiftCardAmount.Yes.Click();
        //Verify the transaction is completed successfully
        await POS.Dialog.CheckoutComplete.No.Click();
        //Navigate Sale  Tab and verify payment method is Gift Card
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        //Click on eye icon to view the transaction details
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.ClickTab('Payments');
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();
        //Verify the payment method contains Gift Card as the tender type used for the transaction
        expect(paymentMethod.toLowerCase()).toContain('gift');



    });

    test('[C5601] Card dialog appears when selecting Gift Card to insert a code', { tag: ['@GiftCardScan', '@register'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Ring up the item to redeem the gift card balance
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Select Gift Card as the tender type
        await POS.Dialog.Checkout.GiftCard.Click();
        //Scan Gift Card dialog box should open with a field to enter the gift card code
        expect(await POS.Dialog.ScanGiftCard.IsVisible()).toBeTruthy();

    });

    test('[C5603] Scan a Gift Card to use as a tender to complete a transaction', { tag: ['@GiftCardScan', '@register'] }, async () => {
        const GiftCardID = `GIFT-${await POS.FakeData.getZipcode()}-123`;
        //  Activate GiftCard With Mock API
        await injectActivateGiftCard({ code: GiftCardID.toString(), initial_balance: 2000, expires_at: null });
        // Add GiftCard Item to Items Mock API
        await injectGiftCardItemIntoItemsMock(Initializer.GetPage());
        // Login the POS Application
        await POS.Login.In();
        // Click on the Others button to open the Gift Card options
        await POS.Register.OthersButton.Click();
        await POS.Dialog.OthersButton.ActivateGiftCardbutton.Click();
        await POS.Dialog.ActivateGiftCard.GiftcardCode.setText({ value: GiftCardID.toString() });
        await POS.Dialog.ActivateGiftCard.Amount.setText({ value: "1000" });
        await POS.Dialog.ActivateGiftCard.Expiration.SelectOption({ byText: "Never" });
        await POS.Dialog.ActivateGiftCard.ActivateButton.Click();
        //Verify Giftcard Activated Successfully
        expect(await POS.Dialog.GiftcardAdded.Message.GetLabel()).toContain(`Gift card ${GiftCardID} has been added to cart. Complete the payment to activate it.`);
        //Click OK Button
        await POS.Dialog.GiftcardAdded.OK.Click();
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Verify the Cash Total Store Value of the Gift Card before redeeming it
        const cashTotalValue = await POS.Dialog.Checkout.CashTotal.getText();
        //Complete the payment using Cash
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        //vErify Transaction Completed Successfully
        await POS.Dialog.CheckoutComplete.No.Click();
        //Ring up the item to redeem the gift card balance
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click Pay Button
        await POS.Register.PayButton.Click();
        // Get the amount due for redemption
        const amountDue = parseFloat(cashTotalValue.replace('$', '').replace(',', ''));
        // Setup redemption mock - card Activated  $2000, will redeem the amount due
        await injectRedeemGiftCardMock({ code: GiftCardID.toString(), currentBalance: "2000.00", amountDue: amountDue });
        //Select Gift Card as the tender type
        await POS.Dialog.Checkout.GiftCard.Click();
        //Scan the GiftCard to redeem the balance
        await POS.Dialog.ScanGiftCard.GiftCardCode.setText({ value: GiftCardID.toString() });
        //Click Save button
        await POS.Dialog.ScanGiftCard.Save.Click();
        //Verify the  Applied Giftcard Value
        await POS.Dialog.RedeemGiftCardAmount.Amount.getText();
        //Click Yes Button to apply the gift card balance to the transaction
        await POS.Dialog.RedeemGiftCardAmount.Yes.Click();
        //Verify the transaction is completed successfully
        await POS.Dialog.CheckoutComplete.No.Click();

    });

    test('[C5604]  Invalid Gift Card that it will not allow me to do so preventing me from taking incorrect payment', async ({ }) => {

        const GiftCardID = `GC-${await POS.FakeData.getZipcode()}-001`;
        // Login the POS Application
        await POS.Login.In();
        //Ring up the item to redeem the gift card balance
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Select Gift Card as the tender type
        await POS.Dialog.Checkout.GiftCard.Click();
        //Enter an invalid Gift Card code
        await POS.Dialog.ScanGiftCard.GiftCardCode.setText({ value: GiftCardID.toString() });
        //Click Save button
        await POS.Dialog.ScanGiftCard.Save.Click();
        // Wait for the Error dialog and store the Error Message displayed
        await POS.Dialog.Error.WaitForVisible();
        const InvalidAlert = await POS.Dialog.Error.GetMessage();
        expect(InvalidAlert).toContain("Gift card with code " + GiftCardID + " doesn't exist. Please use another gift card");
    });

    test('[C5606]  Enter custom amounts for Gift Card payment to be able to take partial payments from a Gift Card', { tag: ['@GiftCardPayment', '@register'] }, async () => {
        const GiftCardID = `GIFT-${await POS.FakeData.getZipcode()}-465`;
        //  Activate GiftCard With Mock API
        await injectActivateGiftCard({ code: GiftCardID.toString(), initial_balance: 2000, expires_at: null });
        // Add GiftCard Item to Items Mock API
        await injectGiftCardItemIntoItemsMock(Initializer.GetPage());
        // Login the POS Application
        await POS.Login.In();
        // Click on the Others button to open the Gift Card options
        await POS.Register.OthersButton.Click();
        await POS.Dialog.OthersButton.ActivateGiftCardbutton.Click();
        await POS.Dialog.ActivateGiftCard.GiftcardCode.setText({ value: GiftCardID.toString() });
        await POS.Dialog.ActivateGiftCard.Amount.setText({ value: "2000" });
        await POS.Dialog.ActivateGiftCard.Expiration.SelectOption({ byText: "Never" });
        await POS.Dialog.ActivateGiftCard.ActivateButton.Click();
        //Verify Giftcard Activated Successfully
        expect(await POS.Dialog.GiftcardAdded.Message.GetLabel()).toContain(`Gift card ${GiftCardID} has been added to cart. Complete the payment to activate it.`);
        //Click OK Button
        await POS.Dialog.GiftcardAdded.OK.Click();
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Complete the payment using Cash
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        //vErify Transaction Completed Successfully
        await POS.Dialog.CheckoutComplete.No.Click();
        //Ring up the item to redeem the gift card balance
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Do partial payment with Cash first
        await POS.Dialog.Checkout.Tendered.setText({ value: "10.99" });
        //Click Cash Payment Button
        await POS.Dialog.Checkout.Cash.Click();
        const remainvalue = await POS.Dialog.Checkout.Balance.getText();
        // Get the amount due for redemption
        const amountDuetotal = parseFloat(remainvalue.replace('$', '').replace(',', ''));
        // Above amountdue divie by two to setup the mock for partial redemption
        // Setup redemption mock - card Activated  $2000, will redeem the amount due
        await injectRedeemGiftCardMock({ code: GiftCardID.toString(), currentBalance: "2000.00", amountDue: amountDuetotal });
        //Select Gift Card as the tender type
        await POS.Dialog.Checkout.GiftCard.Click();
        //Scan the GiftCard to redeem the balance
        await POS.Dialog.ScanGiftCard.GiftCardCode.setText({ value: GiftCardID.toString() });
        //Click Save button
        await POS.Dialog.ScanGiftCard.Save.Click();
        //Click Yes Button to apply the gift card balance to the transaction
        await POS.Dialog.RedeemGiftCardAmount.Yes.Click();
        //Verify the transaction is completed successfully
        await POS.Dialog.CheckoutComplete.No.Click();

    });


    test('[C5607] Ensure the amount deducted from a Gift Card after doing a transaction is correct', async ({ }) => {
        const GiftCardID = `GIFT-${await POS.FakeData.getZipcode()}-090`;
        //  Activate GiftCard With Mock API
        //await injectActivateGiftCard({ code: GiftCardID.toString(), initial_balance: 2000, expires_at: null });
        // Add GiftCard Item to Items Mock API
        await injectGiftCardItemIntoItemsMock(Initializer.GetPage());
        //Check Gift Card Balance Mock API
        await injectInternalGiftCardBalanceMock({ code: GiftCardID.toString(), balance: "2000.00" });
        // Login the POS Application
        await POS.Login.In();
        // Click on the Others button to open the Gift Card options
        await POS.Register.OthersButton.Click();
        //Click the Check Gift Card Balance button
        await POS.Dialog.OthersButton.CheckGiftCardBalance.Click();
        //Enter the Gift Card code to check the balance
        await POS.Dialog.CheckGiftCardBalance.GiftCardCode.setText({ value: GiftCardID.toString() });
        //Click Check Balance Button
        await POS.Dialog.CheckGiftCardBalance.CheckBalance.Click();
        const beforebalanceMessage = await POS.Dialog.GiftCardBalance.GetMessage();
        const beforenumericBalance = parseFloat((beforebalanceMessage ?? '').replace(/[^0-9.-]+/g, ''));
        //Click OK Button
        await POS.Dialog.GiftCardBalance.OK.Click();
        //Close the Others Button dialog
        await POS.Dialog.OthersButton.Close();
        //Ring up the item to redeem the gift card balance
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click Pay Button
        await POS.Register.PayButton.Click();
        //Get the amount due for the transaction
        const cashTotalValue = await POS.Dialog.Checkout.CashTotal.getText();
        const amountDue = parseFloat(cashTotalValue.replace('$', '').replace(',', ''));
        // Setup redemption mock - card Activated  $2000, will redeem the amount due
        await injectRedeemGiftCardMock({ code: GiftCardID.toString(), currentBalance: "2000.00", amountDue: amountDue });
        //Select Gift Card as the tender type
        await POS.Dialog.Checkout.GiftCard.Click();
        //Scan the GiftCard to redeem the balance
        await POS.Dialog.ScanGiftCard.GiftCardCode.setText({ value: GiftCardID.toString() });
        //Click Save button
        await POS.Dialog.ScanGiftCard.Save.Click();
        //Click Yes Button to apply the gift card balance to the transaction
        await POS.Dialog.RedeemGiftCardAmount.Yes.Click();
        //Verify the transaction is completed successfully
        await POS.Dialog.CheckoutComplete.No.Click();
        //Click the Check Gift Card Balance button again to verify the remaining balance on the gift card after the transaction
        await POS.Register.OthersButton.Click();
        await POS.Dialog.OthersButton.CheckGiftCardBalance.Click();
        await POS.Dialog.CheckGiftCardBalance.GiftCardCode.setText({ value: GiftCardID.toString() });
        await POS.Dialog.CheckGiftCardBalance.CheckBalance.Click();
        //Verify the remaining balance is correct
        const balanceMessage = await POS.Dialog.GiftCardBalance.GetMessage();
        const numericBalance = parseFloat((balanceMessage ?? '').replace(/[^0-9.-]+/g, ''));
        expect(beforenumericBalance).toBeGreaterThan(numericBalance);

    });

    test('[C5608] Gift Card: C5608 select the Check Gift Card Balance I can close the dialog box if there is no Gift Card to check', { tag: ['@CheckGiftCardBalance', '@register'] }, async () => {
        //Login to POS
        await POS.Login.In();
        //cate the others button on the bottom right and select it
        await POS.Register.OthersButton.Click();
        //A new dialog box should open up with the options and select Check Gift Card Balance
        await POS.Dialog.OthersButton.CheckGiftCardBalance.Click();
        //Dialog bos should appear with the title "Check Gift Card Balance"
        expect(await POS.Dialog.CheckGiftCardBalance.IsVisible()).toBeTruthy();
        //Click the Cancel button to close the dialog box
        await POS.Dialog.CheckGiftCardBalance.Cancel.Click();
        //Others Button dialog should still be open
        expect(await POS.Dialog.OthersButton.IsVisible()).toBeTruthy();

    });

    test('[C5581] Gift Card: Check Gift Card Balance field', { tag: ['@CheckGiftCardBalance', '@register'] }, async () => {
        const GiftCardID = `GIFT-${await POS.FakeData.getZipcode()}-123`;
        //  Activate Gift Card with Mock API
        await injectActivateGiftCard({ code: GiftCardID.toString(), initial_balance: 2000, expires_at: null });
        await injectGiftCardItemIntoItemsMock(Initializer.GetPage());
        //  Add Mock for Check Gift Card Balance API
        await injectInternalGiftCardBalanceMock(Initializer.GetPage(), { code: GiftCardID, balance: "2000.00" });
        //  Login to POS Application
        await POS.Login.In();
        // Click Others Button and Open Gift Card screen
        await POS.Register.OthersButton.Click();
        await POS.Dialog.OthersButton.CheckGiftCardBalance.Click();
        //Enter in a valid gift card and click Check Balance
        await POS.Dialog.CheckGiftCardBalance.GiftCardCode.setText({ value: GiftCardID.toString() });
        //Click Check Balance Button
        await POS.Dialog.CheckGiftCardBalance.CheckBalance.Click();
        const balanceMessage = await POS.Dialog.GiftCardBalance.GetMessage();
        //Verify the balance is correct based on the mock data (normalize and compare numeric value)
        const numericBalance = parseFloat((balanceMessage ?? '').replace(/[^0-9.-]+/g, ''));
        expect(numericBalance).toBeCloseTo(2000.00, 2);

    });


});