# Test info

- Name: Tax Items >> [C4176] Verify taxable additional fees in reports
- Location: D:\bottlepos_webautomation\tests\desktop\regression\POS\tax_items.spec.ts:60:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0.25
Received: NaN
    at D:\bottlepos_webautomation\tests\desktop\regression\POS\tax_items.spec.ts:114:40
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
- text: Current Shift Report 12/04/25 00:00:00 To 12/04/25 11:52:35 - Playwright Automation - admin
- table:
  - rowgroup:
    - row "# Sales Total":
      - cell
      - cell "# Sales"
      - cell "Total"
  - rowgroup:
    - row "Gross Sales 39 $900.56":
      - cell "Gross Sales"
      - cell "39"
      - cell "$900.56"
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
    - row "Refunds 3 $98.28":
      - cell "Refunds"
      - cell "3"
      - cell "$98.28"
    - row "Voids 0 $0.00":
      - cell "Voids"
      - cell "0"
      - cell "$0.00"
    - row "Sales Tax 34 $56.26":
      - cell "Sales Tax"
      - cell "34"
      - cell "$56.26"
    - row "Bottle Deposit 22 $10.00":
      - cell "Bottle Deposit"
      - cell "22"
      - cell "$10.00"
    - row "Deposit Return 0 $0.00":
      - cell "Deposit Return"
      - cell "0"
      - cell "$0.00"
    - row "Card Fee Additional Fee 7 $7.25":
      - cell "Card Fee Additional Fee"
      - cell "7"
      - cell "$7.25"
    - row "TAXABLE ADDITIONAL FEE Additional Fee 1 $0.25":
      - cell "TAXABLE ADDITIONAL FEE Additional Fee"
      - cell "1"
      - cell "$0.25"
    - row "Tips Amount 0 $0.00":
      - cell "Tips Amount"
      - cell "0"
      - cell "$0.00"
    - row "Total Discount 0 $0.00":
      - cell "Total Discount"
      - cell "0"
      - cell "$0.00"
    - row "Non Taxable 7 $40.00":
      - cell "Non Taxable"
      - cell "7"
      - cell "$40.00"
    - row "Net Sales 36 $735.77":
      - cell "Net Sales"
      - cell "36"
      - cell "$735.77"
    - row "Lotto Payout 0 $0.00":
      - cell "Lotto Payout"
      - cell "0"
      - cell "$0.00"
    - row "Online Payout 0 $0.00":
      - cell "Online Payout"
      - cell "0"
      - cell "$0.00"
    - row "Coupon Sale ($) 2 -$10.00":
      - cell "Coupon Sale ($)"
      - cell "2"
      - cell "-$10.00"
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
    - row "card 10 $226.79":
      - cell "card"
      - cell "10"
      - cell "$226.79"
    - row "cash 22 $502.71":
      - cell "cash"
      - cell "22"
      - cell "$502.71"
    - row "ebt 8 $72.64":
      - cell "ebt"
      - cell "8"
      - cell "$72.64"
    - row "ebt cash 2 $12.80":
      - cell "ebt cash"
      - cell "2"
      - cell "$12.80"
    - row "Expected Cash $502.71":
      - cell "Expected Cash"
      - cell
      - cell "$502.71"
    - row "Cash Counted $0.00":
      - cell "Cash Counted"
      - cell
      - cell "$0.00"
- text: Today's Takings  39 Sales $908.79   3 Refunds $99.58   0 Voids $0.00   $809.21 Takings
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
- text: "Balance: -$502.71"
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
   14 |           DefaultEBTTax: 'NoTax',
   15 |           DefaultEBTTax_Enable: true,
   16 |         },
   17 |         GeneralSettings: {
   18 |           CreditCard: {
   19 |             PayFac: {
   20 |               EbtSales: true,
   21 |               EbtCash: true,
   22 |             }
   23 |           }
   24 |         }
   25 |       }
   26 |     }
   27 |   }});
   28 | });
   29 |
   30 | //This block runs after each test
   31 | test.afterEach(async ({ page }, testInfo) => {
   32 |   //reset the scenario to the default
   33 |   await Initializer.LoadScenario({
   34 |     Admin: {
   35 |       Settings: {
   36 |         AccountingSettings: {
   37 |           DefaultEBTTax: 'NoTax',
   38 |           DefaultEBTTax_Enable: false,
   39 |           AdditionalFees_Enable: false,
   40 |           NonCashAdj_DualPricing: {
   41 |             Type: NonCashAdj_DualPrincingType.Select,
   42 |             Percentage: '0'
   43 |           }
   44 |         },
   45 |         GeneralSettings: {
   46 |           CreditCard: {
   47 |             PayFac: {
   48 |               EbtSales: false,
   49 |               EbtCash: false,
   50 |             }
   51 |           }
   52 |         }
   53 |       }
   54 |     }
   55 |   });
   56 |   await Initializer.Finalize(page, testInfo);
   57 | });
   58 |
   59 | test.describe("Tax Items", { tag: ['@regression'] }, async () => {
   60 |     test('[C4176] Verify taxable additional fees in reports', { tag: ['@additionalfee', '@nonparallelizable'] }, async () => {
   61 |       await Initializer.LoadScenario({
   62 |         Admin: {
   63 |             Settings: {
   64 |                 AccountingSettings: {
   65 |                     AdditionalFees_Enable: true,
   66 |                 }
   67 |             },
   68 |         }
   69 |       })
   70 |       // Login to POS
   71 |       await POS.Login.In();
   72 |       await POS.Reports.Click();
   73 |       await POS.Reports.RegisterReport.Click();
   74 |       // Get the previous additional fee sales and total
   75 |       let prev_additionalFeeSales = 0;
   76 |       let prev_additionalFeeTotal = 0;
   77 |       if (await POS.Reports.RegisterReport.Table.RowExists({rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`})) {
   78 |         prev_additionalFeeSales = Number(await POS.Reports.RegisterReport.Table.GetCellValue({getValueFrom: '# Sales'}, {rowQuery: [{rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`}] }));
   79 |         prev_additionalFeeTotal = Number(await POS.Reports.RegisterReport.Table.GetCellValue({getValueFrom: 'Total'}, {rowQuery: [{rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`}] }));
   80 |       } else {
   81 |         prev_additionalFeeSales = 0;
   82 |         prev_additionalFeeTotal = 0;
   83 |       }
   84 |        
   85 |       // Go to register and add the taxable additional fee
   86 |       await POS.Register.Click();
   87 |       await POS.Register.AddItemByStockcode({ stockCode: ITEMS.TAXABLE_ADDITIONAL_FEE.BARCODE });
   88 |     
   89 |       // Calculate the price, additional fee, tax, and total
   90 |       const price = roundToDecimals(ITEMS.TAXABLE_ADDITIONAL_FEE.PRICE, 2);
   91 |       const additionalFee = roundToDecimals(price * ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Value / 100, 2);
   92 |       const tax = roundToDecimals((price + additionalFee) * TAXITEMS.Tax.Value! / 100, 2);
   93 |       const total = roundToDecimals(price + additionalFee + tax, 2);
   94 |    
   95 |       // Verify the price, additional fee, tax, and total
   96 |       expect(await POS.Register.Subtotal.getText()).toBe(`$${price.toFixed(2)}`);
   97 |       expect(await POS.Register.Additionalfees.getText()).toBe(`$${additionalFee.toFixed(2)}`);
   98 |       expect(await POS.Register.Tax.getText()).toBe(`$${tax.toFixed(2)}`);
   99 |       expect(await POS.Register.Total.getText()).toBe(`$${total.toFixed(2)}`);
  100 |
  101 |       // Pay the transaction and go to reports
  102 |       await POS.Register.PayButton.Click();
  103 |       await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
  104 |       await POS.Dialog.CheckoutComplete.No.Click();
  105 |       await POS.Reports.Click();
  106 |       await POS.Reports.RegisterReport.Click();
  107 |        
  108 |       // Get the next additional fee sales and total
  109 |        const next_additionalFeeSales = Number(await POS.Reports.RegisterReport.Table.GetCellValue({getValueFrom: '# Sales'}, {rowQuery: [{rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`}] }));
  110 |        const next_additionalFeeTotal = Number(await POS.Reports.RegisterReport.Table.GetCellValue({getValueFrom: 'Total'}, {rowQuery: [{rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`}] })  );
  111 |        
  112 |        // Verify the next additional fee sales and total
  113 |        expect(next_additionalFeeSales).toBe(prev_additionalFeeSales + 1);
> 114 |        expect(next_additionalFeeTotal).toBe(prev_additionalFeeTotal + additionalFee);
      |                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  115 |
  116 |     });
  117 |
  118 |     test('[C8256-1] Verify Item with default EBT Taxes', { tag: ['@ebt', '@item', '@nonparallelizable'] }, async () => {
  119 |       await POS.Login.In();
  120 |       await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });
  121 |       
  122 |       expect(await POS.Register.ItemLines.IsEBTChecked({row: 1}), 'EBT checkbox should be checked').toBe(true);
  123 |       expect(await POS.Register.EbtTotal.getText()).toEqual(`$${ITEMS.EBT_ELIGIBLE_ITEM.PRICE.toFixed(2)}`);
  124 |     
  125 |     });
  126 |
  127 |     test('[C8256-2] Verify Item with EBT category Tax', { tag: ['@ebt', '@category','@nonparallelizable'] }, async () => {
  128 |       await POS.Login.In();
  129 |       await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT_ELIGIBLE_CATEGORY.BARCODE });
  130 |       expect(await POS.Register.ItemLines.IsEBTChecked({row: 1}), 'EBT checkbox should be checked').toBe(true);
  131 |       expect(await POS.Register.EbtTotal.getText()).toEqual(`$${ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE.toFixed(2)}`);
  132 |      
  133 |     });
  134 |     test('[C8256-3] Verify multiple EBT items and regular items', { tag: ['@ebt', '@multiple', '@nonparallelizable'] }, async () => {
  135 |     
  136 |       await POS.Login.In();
  137 |       await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });
  138 |       await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT_ELIGIBLE_CATEGORY.BARCODE });
  139 |       await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
  140 |     
  141 |       expect(await POS.Register.ItemLines.IsEBTChecked({ row: 1 })).toBe(true);
  142 |       expect(await POS.Register.ItemLines.IsEBTChecked({ row: 2 })).toBe(true);
  143 |       expect(await POS.Register.ItemLines.IsEBTNotChecked({ row: 3 })).toBe(false);
  144 |     
  145 |       // STEP 1: Initial EBT total calculation
  146 |       let ebtCalc = Number(ITEMS.EBT_ELIGIBLE_ITEM.PRICE.toFixed(2)) +
  147 |                     Number(ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE.toFixed(2));
  148 |     
  149 |       // STEP 2: Make row 3 EBT eligible
  150 |       await POS.Register.ItemLines.CheckEBT({ row: 3 });
  151 |       expect(await POS.Register.ItemLines.IsEBTChecked({ row: 3 })).toBe(true);
  152 |     
  153 |       // STEP 3: Add 3rd item price
  154 |       let newBtCalc = ebtCalc + Number(ITEMS.JACK.PRICE.toFixed(2));
  155 |     
  156 |       // STEP 4: Add Deposit if applicable
  157 |       let depositText = await POS.Register.Deposit.getText();      
  158 |       let deposit = Number(depositText.replace(/[^0-9.]/g, ""));    
  159 |     
  160 |       let finalEbtCalc = Number((newBtCalc + deposit).toFixed(2));  
  161 |      
  162 |       await POS.Sales.Click();
  163 |       await POS.Register.Click();
  164 |     
  165 |       // STEP 5: Verify final displayed EBT total
  166 |       const ebtTotalText  = await POS.Register.EbtTotal.getText();
  167 |       let ebtTotal = Number(ebtTotalText.replace(/[^0-9.]/g, ""));
  168 |       
  169 |     
  170 |     expect(ebtTotal).toBe(Number(finalEbtCalc.toFixed(2)));
  171 |     
  172 |     });
  173 |  
  174 |
  175 |     test('[C8256-4] Verify Item with EBT and dual pricing', { tag: ['@ebt', '@category','@nonparallelizable'] }, async () => {
  176 |       const percentage = 1;
  177 |       await Initializer.LoadScenario({
  178 |         Admin: {
  179 |           Settings: {
  180 |               AccountingSettings: {
  181 |                 NonCashAdj_DualPricing: {
  182 |                   Type: NonCashAdj_DualPrincingType.DualPricing,
  183 |                   Percentage: `${percentage}`,
  184 |                   EBT: true,
  185 |               },
  186 |             },
  187 |           }
  188 |         },
  189 |       }); 
  190 |
  191 |       await POS.Login.In();
  192 |       await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT_ELIGIBLE_CATEGORY.BARCODE });
  193 |       expect(await POS.Register.ItemLines.IsEBTChecked({row: 1}), 'EBT checkbox should be checked').toBe(true);
  194 |       let ebtTotal = Number(ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE.toFixed(2)) + (percentage/100 * Number(ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE.toFixed(2)));
  195 |       expect(await POS.Register.EbtTotal.getText()).toEqual(`$${ebtTotal.toFixed(2)}`);
  196 |     });
  197 |   });
  198 |
```