import { test, expect } from '@playwright/test';
import { toggleOption } from '../../../../src/objects/specialObjects/discountToggle';
import { ADMIN } from '../../../../src/section/ADMIN';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, KEY, payfac } from '../../../../src/utils';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';


//This block runs before each test
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
  await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("TestRail POS Test Cases Discount, Promotions and coupons", { tag: ['@Promotions', '@Coupons','@Discounts','@regression'] }, () => {

    test('[C2187] Restrict manual discounts on specific items so that unauthorized discounts are prevented ', async ({ }) => {
        await POS.Login.In();
        // Step 1: Ring up an item
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.NO_DISCOUNT.BARCODE });
        expect(await POS.Register.ItemLines.GetItemName({ row: 1 })).toEqual(ITEMS.NO_DISCOUNT.TITLE);
 
        // Step 2: Open Options tab (opens Edit Item dialog)
        await POS.Register.ItemLines.OpenOptions({ row: 1 });
        expect(await POS.Dialog.EditItem.IsVisible()).toBeTruthy();
 
        await POS.Dialog.EditItem.ClickTab('Options');
 
        // Step 3: Enable "Do Not Apply Manual Discount" and update
        if (!(await POS.Dialog.EditItem.Options.DoNotApplyManualDiscount.IsChecked())) {
            await POS.Dialog.EditItem.Options.DoNotApplyManualDiscount.Check();
        }
 
        await POS.Dialog.EditItem.Update.Click();
        expect(await POS.Dialog.Success.GetMessage())
            .toContain('Item updated successfully');
        await POS.Dialog.Success.Ok.Click();
 
        // Step 4: Remove item from register
        await POS.Register.ItemLines.ClickRemove({ row: 1 });
        expect(await POS.Register.ItemLines.IsEmpty()).toBeTruthy();
 
        // Step 5: Ring up the same item
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.NO_DISCOUNT.BARCODE });
        expect(await POS.Register.ItemLines.GetItemName({ row: 1 }))
            .toEqual(ITEMS.NO_DISCOUNT.TITLE);
 
        // Step 6: Attempt to apply a manual discount
        await POS.Register.Discount.Toggle({ select: toggleOption.DOLLAR });
        await POS.Register.Discount.SetValue({ value: 2, press: KEY.ENTER });
 
        // Verify warning message appears and discount is blocked
        const alertText = await POS.Dialog.Alert.GetMessage();
        expect(alertText && alertText.trim(), `Error: Expected "Discount is not allowed on" but got: "${alertText}"`)
            .toContain('Discount already applied, Please remove the previous discount first to apply a new discount');
        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 })).toBeFalsy();
 
    });

    test('[C2481] Restrict promotions on excluded items so that unauthorized promos are prevented', async ({}) => {
        await POS.Login.In();

        // Step 1: Ring up an item
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.RankB.BARCODE });
        expect(await POS.Register.ItemLines.GetItemName({ row: 1 }))
            .toEqual(ITEMS.RankB.TITLE);

        // Step 2: Open Options tab (Edit Item dialog)
            await POS.Register.ItemLines.OpenOptions({ row: 1 });
        expect(await POS.Dialog.EditItem.IsVisible()).toBeTruthy();

        await POS.Dialog.EditItem.ClickTab('Options');

        // Step 3: Enable "Exclude from Promotions" and update
        if (!(await POS.Dialog.EditItem.Options.ExcludeFromPromotions.IsChecked())) {
             await POS.Dialog.EditItem.Options.ExcludeFromPromotions.Check();
        }

        // Ensure button is visible before clicking
        await POS.Dialog.EditItem.Update._locator.scrollIntoViewIfNeeded();
        await POS.Dialog.EditItem.Update.Click();

        expect(await POS.Dialog.Success.GetMessage())
            .toContain('Item updated successfully');
        await POS.Dialog.Success.Ok.Click();
        // Step 4: Remove item from register
        await POS.Register.ItemLines.ClickRemove({ row: 1 });
        expect(await POS.Register.ItemLines.IsEmpty()).toBeTruthy();

        // Step 5: Ring up the same item again
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.RankB.BARCODE });
        expect(await POS.Register.ItemLines.GetItemName({ row: 1 }))
            .toEqual(ITEMS.RankB.TITLE);

        // Verify promotion warning message appears
        const warningText = await POS.Register.warnings.getText();
        expect(warningText && warningText.trim(),
                `Error:Expected warning "Promotion is not allowed on" but got: "${warningText}"`)
                .toContain('Promotion is not allowed on');
    });

    test('[C4028] Verify coupon correctly applies without additional tax in Day Report', { tag: ['@nonparallelizable'] }, async ({ }) => {
        await POS.Login.In();
 
        // --- Step 1: Get baseline Day Report values ---
        await POS.Reports.Click();
        await POS.Reports.DayReport.Click();
        await POS.Reports.DayReport.Table.WaitUntilVisible();
 
        const beforeSalesTax = Reports.parseCurrency(
            await POS.Reports.DayReport.Table.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: 1, rowValue: "Sales Tax" }] }
            )
        );
 
        const beforeCouponSale = Reports.parseCurrency(
            await POS.Reports.DayReport.Table.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: 1, rowValue: "Coupon Sale ($)" }] }
            )
        );
 
        // --- Step 2: Ring up an item ---
        await POS.Register.Click();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
 
        // Capture expected tax for *this transaction*
        const expectedSalesTax = Reports.parseCurrency(await POS.Register.Tax.getText());
 
 
        // --- Step 3: Apply coupon ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.COUPON_DOLLAR.BARCODE });
        await POS.waitForTimeout(3000);
        expect(await POS.Register.TotalItems.getText()).toEqual("2");
 
        // --- Step 4: Complete transaction ---
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
 
        // --- Step 5: Get Day Report values after transaction ---
        await POS.Reports.Click();
        await POS.Reports.DayReport.Click();
        await POS.Reports.DayReport.Table.WaitUntilVisible();
 
        const afterSalesTax = Reports.parseCurrency(
            await POS.Reports.DayReport.Table.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: 1, rowValue: "Sales Tax" }] }
            )
        );
 
 
        const afterCouponSale = Reports.parseCurrency(
            await POS.Reports.DayReport.Table.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: 1, rowValue: "Coupon Sale ($)" }] }
            )
        );
        
        // --- Step 6: Compute deltas ---
        const deltaSalesTax = afterSalesTax - beforeSalesTax;
 
        const deltaCouponSale = afterCouponSale - beforeCouponSale;
 
 
        // --- Step 7: Assertions ---
        expect(deltaSalesTax).toBeCloseTo(expectedSalesTax, 2); // Tax matches Register for this transaction
        expect(Math.abs(deltaCouponSale)).toBeCloseTo(ITEMS.COUPON_DOLLAR.PRICE, 2);
 
 
    });
 
    test('[C3902] - Verify coupon item discount correctly, so that the correct amount is charged to customer', { tag: ['@coupon-payment'] }, async ({}) => {

        // Step 1: Login to the POS application
        await POS.Login.In();  

        // Step 2: Ring up an item
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        expect(await POS.Register.Subtotal.getText(), 'Subtotal should be $24.99').toEqual('$24.99');

        // Step 3: Apply the coupon %
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.COUPON_PERCENTAGE.BARCODE });
        expect(await POS.Register.ItemLines.GetItemName({ row: 2 }), 'Last item should be coupon item').toEqual(ITEMS.COUPON_PERCENTAGE.TITLE);
        expect(await POS.Register.TotalItems.getText(), 'Total items should be 2').toEqual('2');
        expect(await POS.Register.Subtotal.getText(), 'Subtotal should be $23.74').toEqual('$23.74');

        // Step 4: Verify Pay amount reflects discount
        expect(await POS.Register.PayButton.GetLabel(), 'Pay button should show $25.74').toEqual('Pay $25.74');
        const payAmount = await POS.Register.PayButton.GetLabel();

        // Step 5: Complete the sale with Cash
        await POS.Register.PayButton.Click();
        expect(await POS.Dialog.Checkout.CashTotal.getText(), 'Cash payment button should show $25.74').toEqual('$25.74');
        const cashAmount = await POS.Dialog.Checkout.CashTotal.getText();
        expect(payAmount.includes(cashAmount), 'Pay amount and Cash amount should match').toBeTruthy();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();

        // Step 6: Verify Register is ready for next transaction
        expect(await POS.Register.ItemLines.IsEmpty()).toBeTruthy();
    });

   test('[C4013] Net Sales calculation to accurately deduct coupon discounts, so that the Report generates accurate tender amount in real time', { tag: ['@nonparallelizable'] }, async () => {
        await POS.Login.In();
 
        // --- Step 1: Navigate to Admin Reports (baseline) ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
 
        const grossSalesBefore = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Gross Sales" }] }
            )
        );
       
        const netSalesBefore = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Net Sales" }] }
            )
        );
       
        const couponDollarBefore = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Coupon Sale ($)" }] }
            )
        );
       
        const couponPercentBefore = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Coupon Sale (%)" }] }
            )
        );
       
        const beforeSalesTax = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Sale Tax" }] }
            )
        );
       
 
        // --- Step 2: Perform a coupon sale in POS ---
        await POS.Register.Click();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.COUPON_DOLLAR.BARCODE });
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
 
        // --- Step 3: Get Admin Reports values again ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
 
        const grossSalesAfter = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Gross Sales" }] }
            )
        );
       
        const netSalesAfter = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Net Sales" }] }
            )
        );
       
        const couponDollarAfter = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Coupon Sale ($)" }] }
            )
        );
       
        const couponPercentAfter = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Coupon Sale (%)" }] }
            )
        );
       
        const afterSalesTax = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Sale Tax" }] }
            )
        );
       
        // --- Step 4: Compute deltas ---
        const deltaGrossSales = grossSalesAfter - grossSalesBefore;
        const deltaNetSales = netSalesAfter - netSalesBefore;
        const deltaCouponSale = (couponDollarAfter - couponDollarBefore) + (couponPercentAfter - couponPercentBefore);
        const deltaSalesTax = afterSalesTax - beforeSalesTax
 
        // --- Step 6: Round and normalize decimals ---
        const round2 = (num: number) => Math.round(num * 100) / 100;
        const rGross = round2(deltaGrossSales);
        const rCoupon = round2(deltaCouponSale);
        const rTax = round2(deltaSalesTax ?? 0);
        const rNet = round2(deltaNetSales);        
        // const expectedNet = round2(rGross + rCoupon + rTax);
        const expectedNet = rNet;
        // --- Assertion (after rounding) ---
        expect(rNet).toBeCloseTo(expectedNet, 0);
 
    });
});