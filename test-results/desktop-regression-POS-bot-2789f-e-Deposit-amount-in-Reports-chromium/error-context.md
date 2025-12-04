# Test info

- Name: POS- Bottle Deposit >> [C4175] Verify Bottle Deposit amount in Reports
- Location: D:\bottlepos_webautomation\tests\desktop\regression\POS\bottleDeposit.spec.ts:47:9

# Error details

```
Error: Error: Bottle Deposit did not update. Old=$0.00, New=$0.00

expect(received).not.toEqual(expected) // deep equality

Expected: not "$0.00"

    at D:\bottlepos_webautomation\tests\desktop\regression\POS\bottleDeposit.spec.ts:85:127
```

# Page snapshot

```yaml
- button "React":
  - img
  - text: React
- navigation:
  - link "Register":
    - /url: /
  - link "Sales":
    - /url: /sales
  - link "Reports":
    - /url: /reports
  - link "Settings":
    - /url: /settings
  - button "Task List":
    - img: 
    - text: Task List
  - button "Fullscreen":
    - img: 
    - text: Fullscreen
  - button "Customer Screen":
    - img: 
    - text: Customer Screen
  - button "Clock In/Out":
    - img: 
    - text: Clock In/Out
  - button "Admin":
    - link "Admin":
      - /url: /admin/
      - img: 
      - text: Admin
  - button:
    - img: 
  - button "Logout"
- text: Reports
- button "Takings Count"
- button "What's Selling"
- button "Seller Report"
- button "Register Report"
- button "Day Report"
- button "Print":
  - img: 
  - text: Print
- text: Current Shift Report 12/04/25 00:00:00 To 12/04/25 11:38:47 - Playwright Automation - admin
- table:
  - rowgroup:
    - row "# Sales Total":
      - cell
      - cell "# Sales"
      - cell "Total"
  - rowgroup:
    - row "Gross Sales 1 $28.07":
      - cell "Gross Sales"
      - cell "1"
      - cell "$28.07"
    - row "Lotto Sales 0 $0.00":
      - cell "Lotto Sales"
      - cell "0"
      - cell "$0.00"
    - row "Online Lottery 0 $0.00":
      - cell "Online Lottery"
      - cell "0"
      - cell "$0.00"
    - row "Fee Sales 0 $0.00":
      - cell "Fee Sales"
      - cell "0"
      - cell "$0.00"
    - row "House Account Pay 0 $0.00":
      - cell "House Account Pay"
      - cell "0"
      - cell "$0.00"
    - row "Refunds 0 $0.00":
      - cell "Refunds"
      - cell "0"
      - cell "$0.00"
    - row "Voids 0 $0.00":
      - cell "Voids"
      - cell "0"
      - cell "$0.00"
    - row "Sales Tax 1 $2.08":
      - cell "Sales Tax"
      - cell "1"
      - cell "$2.08"
    - row "Bottle Deposit 0 $0.00":
      - cell "Bottle Deposit"
      - cell "0"
      - cell "$0.00"
    - row "Deposit Return 0 $0.00":
      - cell "Deposit Return"
      - cell "0"
      - cell "$0.00"
    - row "Tips Amount 0 $0.00":
      - cell "Tips Amount"
      - cell "0"
      - cell "$0.00"
    - row "Total Discount 0 $0.00":
      - cell "Total Discount"
      - cell "0"
      - cell "$0.00"
    - row "Non Taxable 0 $0.00":
      - cell "Non Taxable"
      - cell "0"
      - cell "$0.00"
    - row "Net Sales 1 $25.99":
      - cell "Net Sales"
      - cell "1"
      - cell "$25.99"
    - row "Lotto Payout 0 $0.00":
      - cell "Lotto Payout"
      - cell "0"
      - cell "$0.00"
    - row "Online Payout 0 $0.00":
      - cell "Online Payout"
      - cell "0"
      - cell "$0.00"
    - row "Coupon Sale ($) 0 $0.00":
      - cell "Coupon Sale ($)"
      - cell "0"
      - cell "$0.00"
    - row "Coupon Sale (%) 0 $0.00":
      - cell "Coupon Sale (%)"
      - cell "0"
      - cell "$0.00"
    - row "Promo Coupons 0 $0.00":
      - cell "Promo Coupons"
      - cell "0"
      - cell "$0.00"
    - row "Canceled Sale 0 $0.00":
      - cell "Canceled Sale"
      - cell "0"
      - cell "$0.00"
    - row "cash 1 $28.07":
      - cell "cash"
      - cell "1"
      - cell "$28.07"
    - row "Expected Cash $28.07":
      - cell "Expected Cash"
      - cell
      - cell "$28.07"
    - row "Cash Counted $0.00":
      - cell "Cash Counted"
      - cell
      - cell "$0.00"
- text: Today's Takings  1 Sales $28.07   0 Refunds $0.00   0 Voids $0.00   $28.07 Takings
- button ""
- text: "Cash Reconciliation Starting Cash:"
- textbox: "0.00"
- text: $100
- textbox: "0"
- text: $50
- textbox: "0"
- text: $20
- textbox: "0"
- text: $10
- textbox: "0"
- text: $5
- textbox: "0"
- text: $2
- textbox: "0"
- text: $1
- textbox: "0"
- text: 50¢
- textbox: "0"
- text: 25¢
- textbox: "0"
- text: 10¢
- textbox: "0"
- text: 5¢
- textbox: "0"
- text: 1¢
- textbox: "0"
- text: "Total:"
- textbox "Total:": "0"
- text: "Balance: -$28.07"
- button "Close Register"
- text: "Customer #: --- --- ---- | Support #: +1 (844) 919-2017 Playwright Automation - Register1 - Inventory - admin POS is Online "
- region "Notifications Alt+T"
- status
- status
- status
- status
- status
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { POS } from '../../../../src/section/POS';
   3 | import { Initializer, ITEMS, KEY, payfac, Session } from '../../../../src/utils';
   4 | import { Reports } from '../../../../src/section/POS/pages/reports/reports';
   5 |
   6 |
   7 |  
   8 | test.beforeEach(async ({ page }) => {
   9 |   await Initializer.Init(page);
  10 |   await payfac.Init(page);
  11 | });
  12 |  
  13 | test.afterEach(async ({ page }, testInfo) => {
  14 |     await Initializer.Finalize(page, testInfo);
  15 | });
  16 |  
  17 | test.describe("POS- Bottle Deposit", {tag: ['@pos', '@bottleDeposit']}, () => {   
  18 |     test('[C4038] Verify Bottle Deposit is included in Total calculation',{ tag: ['@bottle', '@deposit'] },async () => {
  19 |         // --- Step 1: Login & Ring Item ---
  20 |         await POS.Login.In();
  21 |         await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
  22 |
  23 |         // Step 2: Open Options tab (opens Edit Item dialog)
  24 |         await POS.Register.ItemLines.OpenOptions({ row: 1 });
  25 |         expect(await POS.Dialog.EditItem.IsVisible()).toBeTruthy();
  26 |
  27 |         await POS.Dialog.EditItem.ClickTab('Options');
  28 |
  29 |         // Step 3: Choose bottle deposit
  30 |         await POS.Dialog.EditItem.Options.BottleDeposit.SelectOption({byText:'1PK'});
  31 |         await POS.Dialog.EditItem.Update.Click();
  32 |         await POS.Dialog.Success.Ok.Click();
  33 |         
  34 |         // --- Step 2: Capture Register Values ---
  35 |         const subtotal = Reports.parseCurrency(await POS.Register.Subtotal.getText());
  36 |         const tax = Reports.parseCurrency(await POS.Register.Tax.getText());
  37 |         const deposit = Reports.parseCurrency(await POS.Register.Deposit.getText());
  38 |         const total = Reports.parseCurrency(await POS.Register.Total.getText());
  39 |
  40 |         console.log(`Subtotal=${subtotal}, Tax=${tax}, Deposit=${deposit}, Total=${total}`);
  41 |
  42 |         // --- Step 3: Validate Total Calculation ---
  43 |         expect(total,` Error: Total mismatch! Expected ${subtotal + tax + deposit}, got ${total}`)
  44 |         .toEqual(subtotal + tax + deposit);
  45 |     });
  46 |
  47 |     test('[C4175] Verify Bottle Deposit amount in Reports',{ tag: ['@bottle', '@nonparallelizable','@deposit', '@reports'] },async () => {
  48 |         // --- Step 1: Login to POS Application ---
  49 |         await POS.Login.In();
  50 |         
  51 |         
  52 |         // --- Step 2: Capture current Bottle Deposit value from Register Report ---
  53 |         await POS.Reports.Click();
  54 |         
  55 |        
  56 |         await POS.Reports.RegisterReport.Click();
  57 |         const oldBottleDeposit = await POS.Reports.RegisterReport.Table.GetCellValueByRowLabel("Bottle Deposit", 3);
  58 |         // --- Step 3: Ring an item and add Bottle Deposit ---
  59 |         await POS.Register.Click();
  60 |         await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
  61 |
  62 |         await POS.Register.ItemLines.OpenOptions({ row: 1 });
  63 |         expect(await POS.Dialog.EditItem.IsVisible(), "Error: Edit Item dialog did not open").toBeTruthy();
  64 |
  65 |         await POS.Dialog.EditItem.ClickTab('Options');
  66 |         await POS.Dialog.EditItem.Options.BottleDeposit.SelectOption({ byText: '10PK' });
  67 |         await POS.Dialog.EditItem.Update.Click();
  68 |         await POS.Dialog.Success.Ok.Click();
  69 |
  70 |         // --- Step 4: Complete the Sale (Cash Payment) ---
  71 |         await POS.Register.PayButton.Click();
  72 |         await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
  73 |         await POS.Dialog.CheckoutComplete.No.Click();
  74 |
  75 |         // --- Step 5: Re-check Bottle Deposit value in Register Report ---
  76 |         await POS.Reports.Click();
  77 |       
  78 |         await POS.Reports.RegisterReport.Click();
  79 |         await POS.waitForTimeout(1000);
  80 |
  81 |         expect(await POS.Reports.RegisterReport.Table.IsNotEmpty(),'Error: Register Report table should not be empty').toBeTruthy();
  82 |
  83 |         const newBottleDeposit = await POS.Reports.RegisterReport.Table.GetCellValueByRowLabel("Bottle Deposit", 3);
  84 |
> 85 |         expect(oldBottleDeposit,`Error: Bottle Deposit did not update. Old=${oldBottleDeposit}, New=${newBottleDeposit}`).not.toEqual(newBottleDeposit);
     |                                                                                                                               ^ Error: Error: Bottle Deposit did not update. Old=$0.00, New=$0.00
  86 |
  87 |     });
  88 |
  89 | });
```