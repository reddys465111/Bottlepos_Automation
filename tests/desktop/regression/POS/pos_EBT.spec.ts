import { test, expect } from "playwright/test";
import { Initializer, ITEMS, payfac } from "../../../../src/utils";
import { POS } from "../../../../src/section/POS";
import { NonCashAdj_DualPrincingType } from "../../../../src/API/useCases/ADMIN";
import { Reports } from "../../../../src/section/POS/pages/reports/reports";

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
    await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {

    await Initializer.LoadScenario({
        Admin: {
            Settings: {
                GeneralSettings: {
                    CreditCard: {
                        PayFac: {
                            EbtSales: false,
                            EbtCash: false,
                        },
                    },
                },
                AccountingSettings: {
                    DefaultEBTTax_Enable: true,
                    DefaultEBTTax:"NoTax",
                    NonCashAdj_DualPricing: {
                        Type: NonCashAdj_DualPrincingType.Select,
                    },
                    
                },
            },
        },
    });
    await Initializer.Finalize(page, testInfo);
});

test.describe("TestRail POS EBT SALES", { tag: ['@EBT ', '@POS', '@regression', '@nonparallelizable'] }, () => {

    test('[C2066] Verify EBT Sale disabled when not enabled', async ({ page }) => {
        //Precondition: EBT Sale disabled in Back Office
        await Initializer.LoadScenario({
            Admin: {
                Settings: {

                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: false,
                                EbtCash: false,
                            },
                        },
                    }
                },
            },
        });
        //Login to POS
        await POS.Login.In();
        //Click on Others button
        await POS.Register.OthersButton.Click();
        //The dialog window opened and the "Check EBT Sale Balance” option is not present
        expect(await POS.Dialog.OthersButton.EBTSalebalance.IsVisible()).toBeFalsy();

    });

    test('[C2064] Verify EBT Sale Balance option is visible when EBT Sales is enabled', { tag: ['@EBT', '@POS', '@OthersMenu'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale in Back Office ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Click on "Others" button ---
        await POS.Register.OthersButton.Click();

        // --- Step 4: Verify "Check EBT Sale Balance" option is visible in the dialog ---
        expect(
            await POS.Dialog.OthersButton.EBTSalebalance.IsVisible(),
            'Error: "Check EBT Sale Balance" option should be visible when EBT Sales is enabled in Admin settings.'
        ).toBeTruthy();

    });

    test('[C2082] Verify EBT Balance buttons are not visible when EBT options are disabled on Mobile Register', { tag: ['@EBT', '@Mobile', '@POS', '@OthersMenu'] }, async ({ page }) => {

        // --- Step 0: Precondition - Disable EBT Sale & EBT Cash in Back Office ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: false,
                                EbtCash: false,
                            },
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS (Mobile) ---
        await POS.Login.In();


        // --- Step 2: Click "Others" button ---
        await POS.Register.OthersButton.Click();

        // --- Step 3: Verify "Check EBT Sale Balance" and "Check EBT Cash Balance" are NOT visible ---
        const isEbtSaleVisible = await POS.Dialog.OthersButton.EBTSalebalance.IsVisible();
        const isEbtCashVisible = await POS.Dialog.OthersButton.EBTCashbalance.IsVisible();

        expect(
            isEbtSaleVisible,
            'Error: "Check EBT Sale Balance" button should NOT be visible when EBT Sales are disabled in Admin settings.'
        ).toBeFalsy();

        expect(
            isEbtCashVisible,
            'Error: "Check EBT Cash Balance" button should NOT be visible when EBT Sales are disabled in Admin settings.'
        ).toBeFalsy();

        // --- Step 4: Close dialog ---
        await POS.Dialog.OthersButton.CloseButton.Click();

    });

    
    test.skip('[C2085] Verify EBT Sale remains enabled after partial EBT Cash payment', { tag: ['@EBT', '@POS', '@Payment', '@Functional'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale & EBT Cash in Admin Settings ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                    AccountingSettings: {
                    DefaultEBTTax_Enable: true,
                    
                },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT-enabled Item to Cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });
        const itemName = await POS.Register.ItemLines.GetItemName({ row: 1 });
        console.log(`EBT Item Added: ${itemName}`);

        // Click Pay Button ---
        await POS.Register.PayButton.Click();

        // Verify EBT Sale & EBT Cash buttons are visible ---
        expect(
            await POS.Dialog.Checkout.EBTSale.IsVisible(),
            'Error: EBT Sale button should be visible when EBT Sales are enabled.'
        ).toBeTruthy();

        expect(
            await POS.Dialog.Checkout.EBTCash.IsVisible(),
            'Error: EBT Cash button should be visible when EBT Sales are enabled.'
        ).toBeTruthy();

        // --- Step 5: Perform Partial Payment with Cash ---

        await POS.Dialog.Checkout.Tendered.setText({ value: '4.20' });

        const partialPayment = Number(await POS.Dialog.Checkout.Tendered.getText());
        console.log(`Performing partial payment of: ${partialPayment}`);
        await page.waitForTimeout(2000);

        // --- Step 6: Perform Partial Payment with EBT Cash ---
        await payfac.Read({ amount: partialPayment });
        ``
        await POS.Dialog.Checkout.EBTCash.Click();

        await POS.Dialog.PartialApproval.Yes.Click();
        


        // --- Step 9: Verify EBT Sale is still enabled after partial EBT Cash payment ---
        expect(
            await POS.Dialog.Checkout.EBTSale.IsEnabled(),
            'Error: EBT Sale should remain enabled after partial payment using EBT Cash.'
        ).toBeTruthy();

        // --- Step 10: Close checkout dialog ---
        await POS.Dialog.Checkout.Cancel.Click();

    });

    test('[C2087] Verify EBT Sale partial payment completion', async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale in Back Office ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT item to cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Click Pay button ---
        await POS.Register.PayButton.Click();

        // --- Step 4: Enter partial payment amount ---
        const partialPayment = 2.00;
        await POS.Dialog.Checkout.Tendered.setText({ value: partialPayment.toString() });

        // Optional small wait to allow total recalculation
        await page.waitForTimeout(1000);

        // --- Step 5: Process partial payment with PayFac ---
        await payfac.Read({ amount: partialPayment });
        await page.waitForTimeout(1500);

        // --- Step 6: Select EBT Cash payment method ---
        await POS.Dialog.Checkout.EBTCash.Click();

        // --- Step 7: Handle Partial Approval Dialog ---
        expect(POS.Dialog.PartialApproval.IsVisible()).toBeTruthy();

        await POS.Dialog.PartialApproval.Yes.Click();

        // --- Step 8: Finish remaining balance with Cash ---
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });

        // --- Step 9: Skip print confirmation ---
        await POS.Dialog.CheckoutComplete.No.Click();

    });



    test('[C2170] Verify EBT Sale full payment', { tag: ['@EBT', '@POS', '@Payment', '@Regression'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale (Disable EBT Cash) ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        DefaultEBTTax_Enable: true,
                    },
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: false,
                            },
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT-enabled item to cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Proceed to payment screen ---
        await POS.Register.PayButton.Click();

        // --- Step 4: Capture total sale amount ---
        const totalStr = await POS.Dialog.Checkout.EBTTotal.getText();
        const totalAmount = Reports.parseCurrency(totalStr);

        // --- Step 5: Process full payment via PayFac ---
        await payfac.Read({ amount: totalAmount });

        // --- Step 6: Select EBT Sale as payment method ---
        await POS.Dialog.Checkout.EBTSale.Click();


        // --- Step 7: Skip print confirmation ---
        await POS.Dialog.Success.Close.Click();

        // --- Step 8: Open Sales tab ---
        await POS.Sales.Click();


        // --- Step 9: View latest transaction details ---
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });

        // --- Step 10: Go to “Payments” tab and verify method ---
        await POS.Dialog.TransactionDetails.ClickTab('Payments');
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();

        expect(paymentMethod.toLowerCase()).toBe('ebt');


        // --- Step 11: Close Transaction Details Dialog ---
        await POS.Dialog.TransactionDetails.Close();
    });


    test('[C2171] Verify EBT item with Card payment applies Dual Pricing', { tag: ['@EBT', '@POS', '@DualPrice', '@Regression'] }, async ({ page }) => {

        // --- Step 0: Enable EBT Sale in General Settings ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        DefaultEBTTax_Enable: true,
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.DualPricing,
                            Percentage: "2",
                            ShowCashRegularPriceOnPayButton: true,
                        },
                    },
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: false,
                            },
                        },
                    },
                },
            },
        });



        // --- Step 2: Login to POS ---
        await POS.Login.In();

        // --- Step 3: Add EBT-enabled item to cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 4: Proceed with Dual Pay ---
        await POS.Register.PayButton.Click();

        // --- Step 5: Capture Regular Total ---
        const totalStr = await POS.Dialog.Checkout.EBTTotal.getText();
        const totalAmount = Reports.parseCurrency(totalStr);

        // --- Step 6: Process Card Payment via PayFac ---
        await payfac.Read({ amount: totalAmount });


        // --- Step 7: Click Card button ---
        await POS.Dialog.Checkout.Card.Click();

        // --- Step 8: Close success dialog ---
        await POS.Dialog.Success.Close.Click();

        // --- Step 9: Navigate to Sales tab ---
        await POS.Sales.Click();


        // --- Step 10: View latest transaction details ---
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });

        // --- Step 11: Get transaction status ---
        const statusText = await POS.Dialog.TransactionDetails.Status.getText();

        // --- Step 12: Verify payment method = Card ---
        await POS.Dialog.TransactionDetails.ClickTab('Payments');
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();
        expect(paymentMethod.toLowerCase()).toBe('card');

        // --- Step 13: Verify Sale status = Complete ---
        expect(statusText).toBe('Complete');

        await POS.Dialog.TransactionDetails.Close();


    });



    test('[C2172] Verify EBT item with Cash payment applies Dual Pricing', { tag: ['@EBT', '@POS', '@DualPrice', '@Regression'] }, async ({ page }) => {

        // --- Step 0: Enable EBT Sale in General Settings ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.DualPricing,
                            Percentage: "2",
                            ShowCashRegularPriceOnPayButton: true,
                        },
                    },
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                            },
                        },
                    },
                },
            },
        });


        // --- Step 2: Login to POS ---
        await POS.Login.In();

        // --- Step 3: Add EBT-enabled item to the cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 4: Proceed with Dual Pay ---
        await POS.Register.PayButton.Click();


        // --- Step 5: Pay using Cash ---
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });


        // --- Step 6: Skip print confirmation ---
        await POS.Dialog.CheckoutComplete.No.Click();

        // --- Step 7: Navigate to Sales tab ---
        await POS.Sales.Click();


        // --- Step 8: Open the most recent transaction ---
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });

        // --- Step 9: Fetch and log transaction status ---
        const statusText = await POS.Dialog.TransactionDetails.Status.getText();

        // --- Step 10: Verify payment method = Cash ---
        await POS.Dialog.TransactionDetails.ClickTab('Payments');
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();

        expect(paymentMethod.toLowerCase()).toBe('cash');

        // --- Step 11: Verify transaction status = Complete ---
        expect(statusText).toBe('Complete');

        // --- Step 12: Close the transaction details dialog ---
        await POS.Dialog.TransactionDetails.Close();

    });

    // Skipped because partial EBT Sale is not currently working in the react POS
    test('[C2162] Verify partial EBT Sale payment followed by Card payment applies Dual Pricing correctly', { tag: ['@EBT', '@POS', '@DualPrice', '@Smoke', '@Payment'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale and Dual Pricing (not applied on EBT) ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: false,
                            },
                        },
                    },
                    AccountingSettings: {
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.DualPricing,
                            Percentage: "3",
                            ShowCashRegularPriceOnPayButton: true,
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT-enabled item to the cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Open Pay modal ---
        await POS.Register.PayButton.Click();
        expect(await POS.Dialog.Checkout.IsVisible(), 'Error: Checkout modal did not open.').toBeTruthy();

        // --- Step 4: Capture total amount ---
        await POS.Dialog.Checkout.Tendered.setText({ value: '5.00' });

        const partialPayment = Number(await POS.Dialog.Checkout.Tendered.getText());
        await payfac.Read({ amount: partialPayment });

        await POS.Dialog.Checkout.EBTSale.Click();
        await page.waitForTimeout(2000);

        // Handle partial approval dialog
        if (await POS.Dialog.PartialApproval.IsVisible()) {
            await POS.Dialog.PartialApproval.Yes.Click();
        }

        // Wait for success dialog and close
        if (await POS.Dialog.Success.IsVisible()) {
            await POS.Dialog.Success.Close.Click();
        }


        // --- Step 7: Capture remaining balance ---
        const remainingStr = await POS.Dialog.Checkout.Cashbalance.getText();
        const remainingBalance = Reports.parseCurrency(remainingStr);

        // --- Step 8: Pay remaining balance with Card (DP should apply here) ---
        await payfac.Read({ amount: remainingBalance });
        await POS.Dialog.Checkout.Card.Click();

        if (await POS.Dialog.Success.IsVisible()) {
            await POS.Dialog.Success.Close.Click();
        }

        // --- Step 9: Verify transaction recorded correctly ---
        await POS.Sales.Click();
        await page.waitForTimeout(2000);

        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.ClickTab('Payments');

        //  Verify EBT row (first row using helper)
        const firstPayment = await POS.Dialog.TransactionDetails.payments.method.getText();
        expect(firstPayment).toContain('ebt');
        console.log("First payment method:", firstPayment);

        //  Verify Card row (second row using helper)
        const card = await POS.Dialog.TransactionDetails.GetPaymentRow(1);
        expect(card.method).toContain('card');
        console.log("Second payment method:", card.method);

        // --- Step 10: Verify final status = Complete ---
        const statusText = await POS.Dialog.TransactionDetails.Status.getText();
        expect(statusText).toBe('Complete');


        await POS.Dialog.TransactionDetails.Close();
    });

    test('[C2163] Verify EBT Sale payment does not apply Dual Pricing', { tag: ['@EBT', '@POS', '@DualPrice', '@Smoke', '@Payment'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale and Dual Pricing (not applied to EBT) ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                    AccountingSettings: {
                        DefaultEBTTax_Enable: true,
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.DualPricing,
                            Percentage: "3",
                            ShowCashRegularPriceOnPayButton: true,
                            EBT: false,
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT-enabled item to the cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Open Pay modal ---
        await POS.Register.PayButton.Click();
        expect(await POS.Dialog.Checkout.IsVisible(), 'Error: Checkout modal did not open.').toBeTruthy();

        // --- Step 4: Capture Dual Pricing and Regular Totals ---
        const dualPriceStr = await POS.Dialog.Checkout.RegularTotal.getText();
        const dualPriceAmount = Reports.parseCurrency(dualPriceStr);
        const totalStr = await POS.Dialog.Checkout.EBTTotal.getText();
        const totalAmount = Reports.parseCurrency(totalStr);

        // --- Step 5: Perform EBT Sale payment (full amount) ---
        await payfac.Read({ amount: totalAmount });
        await POS.Dialog.Checkout.EBTSale.Click();

        // --- Step 6: Handle Success Dialog ---
        await POS.Dialog.Success.Close.Click();

        // --- Step 7: Navigate to Sales History ---
        await POS.Sales.Click();

        // --- Step 8: Open last transaction details ---
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.ClickTab('Payments');

        // --- Step 9: Verify Payment Method = EBT ---
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();
        expect(paymentMethod.toLowerCase()).toBe('ebt');

        // --- Step 10: Verify Total Paid does NOT include Dual Pricing ---
        const totalPaidStr = await POS.Dialog.TransactionDetails.payments.Tendered.getText();
        const totalPaid = Reports.parseCurrency(totalPaidStr);

        expect(totalPaid.toFixed(2), `Error: EBT Sale total (${totalPaid}) should NOT include Dual Pricing (${dualPriceAmount}).`
        ).not.toBe(dualPriceAmount.toFixed(2));


        // --- Step 11: Verify Sale Status ---
        const statusText = await POS.Dialog.TransactionDetails.Status.getText();
        expect(statusText).toBe('Complete');

        // --- Step 12: Close Transaction Details ---
        await POS.Dialog.TransactionDetails.Close();
    });

    // Skipped because partial EBT Sale is not currently working in the react POS
    test('[C2164] Verify partial EBT Sale + Cash payment does NOT apply Dual Pricing', { tag: ['@EBT', '@POS', '@DualPrice', '@Smoke', '@Payment'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale and Dual Pricing (not applied to EBT) ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                    AccountingSettings: {
                        DefaultEBTTax_Enable: true,
                        DefaultEBTTax:"Tax",
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.DualPricing,
                            Percentage: "3",
                            ShowCashRegularPriceOnPayButton: true,
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT-enabled item to the cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Open Pay modal ---
        await POS.Register.PayButton.Click();
        expect(await POS.Dialog.Checkout.IsVisible(), 'Error: Checkout modal did not open.').toBeTruthy();

        // --- Step 4: Capture Dual Pricing and Regular Totals ---
        const dualPriceStr = await POS.Dialog.Checkout.RegularTotal.getText();
        const dualPriceAmount = Reports.parseCurrency(dualPriceStr);
        const totalStr = await POS.Dialog.Checkout.EBTTotal.getText();
        const totalAmount = Reports.parseCurrency(totalStr);

        // --- Step 5: Enter partial amount for EBT Sale ---
        const partialPayment = Number((totalAmount / 2).toFixed(2));
        await POS.Dialog.Checkout.Tendered.setText({ value: partialPayment.toString() });

        // --- Step 6: Perform Partial Payment using EBT Sale ---
        await payfac.Read({ amount: partialPayment });
        await POS.Dialog.Checkout.EBTSale.Click();
        await POS.Dialog.PartialApproval.Yes.Click();

        // --- Step 7: Verify Remaining Balance is correct ---
        const remainingStr = await POS.Dialog.Checkout.Cashbalance.getText();
        const remainingBalance = Reports.parseCurrency(remainingStr);
        const expectedRemaining = totalAmount - partialPayment;

        expect(
            remainingBalance.toFixed(2),
            `Error: Remaining balance (${remainingBalance}) did not match expected (${expectedRemaining}).`
        ).toBe(expectedRemaining.toFixed(2));

        // --- Step 8: Finish remaining balance with Cash ---
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();

        // --- Step 9: Navigate to Sales History ---
        await POS.Sales.Click();

        // --- Step 10: Open last transaction details ---
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.ClickTab('Payments');

        // --- Step 11: Verify both EBT and Cash payments exist ---
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();
        expect(paymentMethod.toLowerCase()).toContain('ebt');
        console.log("Payment Method Text:", paymentMethod);

        const secondPaymentMethod = await POS.Dialog.TransactionDetails.GetPaymentRow(1);
        console.log("Second Payment Method Text:", secondPaymentMethod.method ?? null);
        // Use optional chaining to avoid calling toLowerCase() on a possibly null value.
        expect(secondPaymentMethod.method?.toLowerCase()).toContain('cash');

        // --- Step 12: Verify total paid does NOT include Dual Pricing ---
        const totalPaidStr = await POS.Dialog.TransactionDetails.payments.Tendered.getText();
        const totalPaid = Reports.parseCurrency(totalPaidStr);

        expect(
            totalPaid.toFixed(2),
            `Error: Total Paid (${totalPaid}) should NOT include Dual Pricing (${dualPriceAmount}).`
        ).not.toBe(dualPriceAmount.toFixed(2));

        // --- Step 13: Verify Sale Status ---
        const statusText = await POS.Dialog.TransactionDetails.Status.getText();
        expect(statusText).toBe('Complete');

        // --- Step 14: Close Transaction Details ---
        await POS.Dialog.TransactionDetails.Close();

    });

    test('[C2166] Verify EBT Sale payment applies Dual Pricing when enabled', { tag: ['@EBT', '@POS', '@DualPrice', '@Smoke', '@Payment'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale and Dual Pricing (applies to EBT) ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                    AccountingSettings: {
                        DefaultEBTTax_Enable: true,
                        DefaultEBTTax:"Tax",
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.DualPricing,
                            Percentage: "3",
                            ShowCashRegularPriceOnPayButton: true,
                            EBT: true,
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT-enabled item to the cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Open Pay modal ---
        await POS.Register.PayButton.Click();
        expect(await POS.Dialog.Checkout.IsVisible(), 'Error: Checkout modal did not open.').toBeTruthy();

        // --- Step 4: Capture Dual Pricing Regular Totals ---
        const dualPriceStr = await POS.Dialog.Checkout.RegularTotal.getText();
        const dualPriceAmount = Reports.parseCurrency(dualPriceStr);
        const totalStr = await POS.Dialog.Checkout.EBTTotal.getText();
        const totalAmount = Reports.parseCurrency(totalStr);


        // --- Step 5: Perform EBT Sale payment for the full (DP) amount ---
        await payfac.Read({ amount: totalAmount });
        await POS.Dialog.Checkout.EBTSale.Click();

        // --- Step 6: Handle Success Dialog ---
        await POS.Dialog.Success.Close.Click();

        // --- Step 7: Navigate to Sales History ---
        await POS.Sales.Click();

        // --- Step 8: Open last transaction details ---
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.ClickTab('Payments');

        // --- Step 9: Verify Payment Method = EBT ---
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();
        expect(paymentMethod.toLowerCase()).toBe('ebt');

        // --- Step 10: Verify Total Paid includes Dual Pricing ---
        const totalPaidStr = await POS.Dialog.TransactionDetails.payments.Tendered.getText();
        const totalPaid = Reports.parseCurrency(totalPaidStr);

        expect(
            totalPaid.toFixed(2),
            `Error: EBT Sale total (${totalPaid}) should include Dual Pricing (${dualPriceAmount}).`
        ).toBe(dualPriceAmount.toFixed(2));

        // --- Step 11: Verify Sale Status ---
        const statusText = await POS.Dialog.TransactionDetails.Status.getText();
        expect(statusText).toBe('Complete');

        // --- Step 12: Close Transaction Details ---
        await POS.Dialog.TransactionDetails.Close();

       
    });


    test('[C2167] Verify EBT Sale Balance deduction after transaction', { tag: ['@EBT', '@POS', '@Functional', '@Critical', '@Payment', '@Balance'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale in Admin Settings ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        DefaultEBTTax_Enable: true,
                    },
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add an EBT-enabled item to the sale ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Open Pay modal ---
        await POS.Register.PayButton.Click();
        expect(await POS.Dialog.Checkout.IsVisible(), 'Payment modal did not open.').toBeTruthy();

        // --- Step 4: Capture Total before payment ---
        const totalStr = await POS.Dialog.Checkout.EBTTotal.getText();
        const totalAmount = Reports.parseCurrency(totalStr);

        // --- Step 5: Complete payment using EBT Sale ---
        await payfac.Read({ amount: totalAmount });
        await POS.Dialog.Checkout.EBTSale.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 6: Validate Sale completion ---
        await POS.Sales.Click();
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        const status = await POS.Dialog.TransactionDetails.Status.getText();
        expect(status).toBe('Complete');
        await POS.Dialog.TransactionDetails.Close();


        // --- Step 7: Open "Others" menu ---
        await POS.Register.Click();
        await POS.Register.OthersButton.Click();
        // --- Step 9: Check EBT Sale Balance ---
        await POS.Dialog.OthersButton.EBTSalebalance.Click();
        // need to implement assertion for balance
    });


    test('[C2173] Verify EBT Sale does not apply NCA', { tag: ['@EBT', '@POS', '@NCA', '@Smoke', '@Payment', '@Critical'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale and NCA (but not for EBT) ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                    AccountingSettings: {
                        DefaultEBTTax_Enable: true,
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.NonCashAdj,
                            Percentage: "3", // 3% NCA
                            EBT: false, // critical: EBT excluded from NCA
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT-enabled item to the cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Open Pay modal ---
        await POS.Register.NCApay.Click();
        expect(await POS.Dialog.Checkout.IsVisible(), 'Payment modal did not open.').toBeTruthy();

        // --- Step 4: Capture Regular and NCA Totals ---
        const ebtTotalStr = await POS.Dialog.Checkout.EBTTotal.getText();
        const ebtTotal = Reports.parseCurrency(ebtTotalStr);

        const ncaTotalStr = await POS.Dialog.Checkout.NCATotal.getText();
        const ncaTotal = Reports.parseCurrency(ncaTotalStr);

        // --- Step 5: Perform EBT Sale payment (should not apply NCA) ---
        await payfac.Read({ amount: ebtTotal });
        await POS.Dialog.Checkout.EBTSale.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 6: Navigate to Sales History ---
        await POS.Sales.Click();
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.ClickTab('Payments');

        // --- Step 7: Verify Payment Method = EBT ---
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();
        expect(paymentMethod.toLowerCase()).toBe('ebt');

        // --- Step 8: Verify Total Paid = regular total (not NCA total) ---
        const totalPaidStr = await POS.Dialog.TransactionDetails.payments.Tendered.getText();
        const totalPaid = Reports.parseCurrency(totalPaidStr);

        expect(
            totalPaid.toFixed(2),
            `Error: EBT Sale total (${totalPaid}) should NOT include NCA (${ncaTotal}).`
        ).not.toBe(ncaTotal.toFixed(2));

        // --- Step 9: Verify Sale Status ---
        const statusText = await POS.Dialog.TransactionDetails.Status.getText();
        expect(statusText).toBe('Complete');

        // --- Step 10: Cleanup - Disable NCA & EBT Sale ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: false,
                                EbtCash: false,
                            },
                        },
                    },
                    AccountingSettings: {
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.Select,
                        },
                    },
                },
            },
        });
    });

    // skipped because enable  EBT Sale is not currently working for nca in the react POS while working correctly in legacy
    test('[C2174] Verify EBT Sale apply NCA', { tag: ['@EBT', '@POS', '@NCA', '@Smoke', '@Payment', '@Critical'] }, async ({ page }) => {

        // --- Step 0: Precondition - Enable EBT Sale and NCA (but not for EBT) ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: true,
                                EbtCash: true,
                            },
                        },
                    },
                    AccountingSettings: {
                        DefaultEBTTax_Enable: true,
                       DefaultEBTTax: "Tax",
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.NonCashAdj,
                            Percentage: "3",
                            EBT: true,
                        },
                    },
                },
            },
        });

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add EBT-enabled item to the cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });

        // --- Step 3: Open Pay modal ---
        await POS.Register.NCApay.Click();
        expect(await POS.Dialog.Checkout.IsVisible(), 'Payment modal did not open.').toBeTruthy();

        // --- Step 4: Capture EBt and NCA Totals ---
        const ebtTotalStr = await POS.Dialog.Checkout.EBTTotal.getText();
        const ebtTotal = Reports.parseCurrency(ebtTotalStr);

        const ncaTotalStr = await POS.Dialog.Checkout.NCATotal.getText();
        const ncaTotal = Reports.parseCurrency(ncaTotalStr);

        // --- Step 5: Perform EBT Sale payment (should not apply NCA) ---
        await payfac.Read({ amount: ebtTotal });
        await POS.Dialog.Checkout.EBTSale.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 6: Navigate to Sales History ---
        await POS.Sales.Click();
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.ClickTab('Payments');

        // --- Step 7: Verify Payment Method = EBT ---
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();
        expect(paymentMethod.toLowerCase()).toBe('ebt');

        // --- Step 8: Verify Total Paid = regular total (not NCA total) ---
        const totalPaidStr = await POS.Dialog.TransactionDetails.payments.Tendered.getText();
        const totalPaid = Reports.parseCurrency(totalPaidStr);

        expect(
            totalPaid.toFixed(2),
            `Error: EBT Sale total (${totalPaid}) should include NCA (${ncaTotal}).`
        ).toBe(ncaTotal.toFixed(2));

        // --- Step 9: Verify Sale Status ---
        const statusText = await POS.Dialog.TransactionDetails.Status.getText();
        expect(statusText).toBe('Complete');

        // --- Step 10: Cleanup - Disable NCA & EBT Sale ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: false,
                                EbtCash: false,
                            },
                        },
                    },
                    AccountingSettings: {
                        NonCashAdj_DualPricing: {
                            Type: NonCashAdj_DualPrincingType.Select,
                        },
                    },
                },
            },
        });
    });

    test('[C2086]Verify EBT Cash full payment', { tag: ['@EBT', '@POS', '@Cash', '@Regression'] }, async ({ page }) => {
        // --- Step 0: Precondition - Enable EBT Cash ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtCash: true,
                            },
                        },
                    },
                },
            },
        });
        // --- Step 1: Login to POS ---
        await POS.Login.In();
        // --- Step 2: Add EBT-enabled item to cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });
        // --- Step 3: Proceed to payment screen ---
        await POS.Register.PayButton.Click();
        // --- Step 4: Capture total sale amount ---
        const totalStr = await POS.Dialog.Checkout.CashTotal.getText();
        const totalAmount = Reports.parseCurrency(totalStr);
        //Complete Sale with EBT Cash
        await payfac.Read({ amount: totalAmount });
        await page.waitForTimeout(1500);
        await POS.Dialog.Checkout.EBTCash.Click();
        // --- Step 7: Skip print confirmation ---
        await POS.Dialog.Success.Close.Click();
        // --- Step 8: Open Sales tab ---
        await POS.Sales.Click();
        // --- Step 9: View latest transaction details ---
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        // --- Step 10: Go to “Payments” tab and verify method ---
        await POS.Dialog.TransactionDetails.ClickTab('Payments');
        const paymentMethod = await POS.Dialog.TransactionDetails.payments.method.getText();
        expect(paymentMethod.toLowerCase()).toBe('ebt cash');
        // --- Step 11: Close Transaction Details Dialog ---
        await POS.Dialog.TransactionDetails.Close();

    });

    test('[C2065]Verify EBT Cash balance check', { tag: ['@EBTcash Balance', '@POS', '@Othersbutton', '@Regression'] }, async ({ page }) => {
        // --- Step 0: Precondition - Enable EBT Sale in Back Office ---
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtCash: true,
                            },
                        },
                    },
                },
            },
        });
        // --- Step 1: Login to POS ---
        await POS.Login.In();
        // --- Step 2: Click on "Others" button ---
        await POS.Register.OthersButton.Click();
        // --- Step 4: Verify "Check EBT Cash Balance" option is visible in the dialog ---
        expect(
            await POS.Dialog.OthersButton.EBTCashbalance.IsVisible(),
            'Error: "Check EBT Cash Balance" option should be visible when EBT Cash is enabled in Admin settings.'
        ).toBeTruthy();

    });


    test('[C2067 Verify EBT Cash button not present on Others if diasbled in genral Settings', { tag: ['@EBT', '@POS', '@Cash', '@Regression'] }, async ({ page }) => {

        //Precondition: EBT Cash disabled in Back Office
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                EbtSales: false,
                                EbtCash: false,
                            },
                        },
                    }
                },
            },
        });
        //Login to POS
        await POS.Login.In();
        //Click on Others button
        await POS.Register.OthersButton.Click();
        //The dialog window opened and the "Check EBT Cash Balance” option is not present
        expect(await POS.Dialog.OthersButton.EBTCashbalance.IsVisible()).toBeFalsy();
    })

});
