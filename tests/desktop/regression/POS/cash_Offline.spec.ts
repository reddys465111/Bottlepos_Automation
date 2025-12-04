import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, Offline, isOffline, ITEMS, isOnline } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                    AccountingSettings: {
                        DefaultEBTTax_Enable: false,
                    },
                    POSSettings: {
                        SaleOptions: {
                            AllowChangingStoredItemPrices: 'Always'
                        }
                    }
                }
            }
        }
    });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Tests related to offline cash sales', { tag: ['@cash', '@offline', '@regression'] }, () => {

   test('[C3811] Verify offline cash sales', { tag: ['@reconect'] }, async ({ page }) => {

    // Login
    await POS.Login.In();

    // Enable offline mode
    await Offline(true);
    await POS.waitForTimeout(8000);
    expect(await isOffline(), 'The POS is still online').toBe(true);

    // Add item with Age Verification
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
    await POS.Dialog.AgeVerification.Yes.Click();

    // Checkout with cash
    await POS.Register.PayButton.Click();
    await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    await POS.Dialog.CheckoutComplete.No.Click();

    // Navigate to sales
    await POS.Sales.Click();
    await POS.Register.Click();
    await POS.Sales.Click();

    // Verify transaction is offline
    const gidValue = await POS.Sales.transactions.Table.GetCellValue(
        { getValueFrom: 'GID' },
        { rowIndex: 1 }
    );
    expect(gidValue).toBe('Offline');

    // Reconnect POS
    await Offline(false);
    await POS.waitForTimeout(2000);

    // Verify POS is online
    expect(await isOnline(), 'The POS is still offline').toBe(true);

    // Open transaction details
    await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });

    // Verify transaction is complete
    expect(await POS.Dialog.TransactionDetails.Status.getText()).toBe('Complete');
});


    test('[CNAN-5]Verify transaction status in offline mode', { tag: ['@status','@nonparallelizable'] }, async ({ }) => {
        //Login to the POS application
        await POS.Login.In();
        // add items to the register
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE });
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        await POS.Dialog.AgeVerification.Yes.Click();
        // pay for the items
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();

        // turn off the POS connection
        await Offline(true);
        // refund the transaction
        await POS.Sales.Click();
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.Refund.Click();
        await POS.Dialog.RefundTransaction.Cash.Click();
        await POS.Dialog.Confirmation.Yes.Click();
        await POS.Dialog.Confirmation.No.Click();
        

        //Verify the transaction status is partial
        expect(await POS.Sales.transactions.Table.GetGIDBadge({ byIndex: 1 }), 'The transaction status is not partial').toBe('Partial');
        // verify the transaction status is refunded
        expect(await POS.Sales.transactions.Table.GetStatusBadge({ byIndex: 1 }), 'The transaction status is not Refunded').toBe('Refunded');
        await POS.Dialog.TransactionDetails.Close()

        // turn on the POS connection
        await Offline(false);
        await POS.Register.Click();
        await POS.Sales.Click();
        // verify the transaction status is synced
        expect(await POS.Sales.transactions.Table.GetGIDBadge({ byIndex: 1 }), 'The transaction status is not partial').toBe('Synced');
        // verify the transaction status is refunded
        expect(await POS.Sales.transactions.Table.GetStatusBadge({ byIndex: 1 }), 'The transaction status is not Refunded').toBe('Refunded');
    });

    test('[CNAN]Verify Suspend and Recall with offline transactions', { tag: ['@suspend','@nonparallelizable'] }, async ({ }) => {
         await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    POSSettings: {
                        SaleOptions: {
                            AllowChangingStoredItemPrices: 'Always',
                            AllowChangingStoredItemTax:'Yes',
                        }
                    }
                    },
                },
        });
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await Offline(true);
        await POS.waitForTimeout(10000);
        expect(await isOffline(), 'The POS is still online').toBe(true);
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        await POS.Register.Suspend.Click();

        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        await POS.Register.ItemLines.EditPrice({ row: 1, price: 10 });
        
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();

        await Offline(false);
        await POS.Register.Recall.Click();
        await POS.Dialog.TransactionDetails.Complete.Click();
        expect(await POS.Register.TotalItems.getText()).toBe('1');
        expect(await POS.Register.ItemLines.GetItemName({ row: 1 })).toBe(ITEMS.CROWN.TITLE);
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();

        
        expect(await POS.Sales.transactions.Table.GetCellValue({ getValueFrom: 'Status' }, { rowIndex: 1 })).toBe('Complete');
    });
});
