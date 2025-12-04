# Test info

- Name: TestRail POS Test Cases Tax Reports >> [C6223] Verify card transaction with multiple exclusive tax reflected correctly in Reports
- Location: D:\bottlepos_webautomation\tests\desktop\regression\POS\tax_reports.spec.ts:204:9

# Error details

```
Error: Error: Tax mismatch! Register=4.86, Report=2.18, Raw spans=["$2.18"]

expect(received).toBeCloseTo(expected, precision)

Expected: 4.86
Received: 2.18

Expected precision:    2
Expected difference: < 0.005
Received difference:   2.68
    at D:\bottlepos_webautomation\tests\desktop\regression\POS\tax_reports.spec.ts:274:131
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
- text: "Global Ref Lookup: Reference:"
- textbox "Reference:"
- button "Go"
- text: "Status:"
- combobox "Status:":
  - option "All" [selected]
  - option "Order"
  - option "Complete"
  - option "Refunded"
  - option "Void"
  - option "Declined"
  - option "Canceled"
  - option "No Sale"
- button "View Order"
- text: Search
- textbox "Search"
- text: Show
- combobox "Show":
  - option "10" [selected]
  - option "25"
  - option "50"
  - option "100"
- text: Entries
- table:
  - rowgroup:
    - 'row "GID Ref Device / Location Customer Name Mobile #items Total Sale Time Status"':
      - cell "GID":
        - text: GID
        - img
      - cell "Ref":
        - text: Ref
        - img
      - cell "Device / Location":
        - text: Device / Location
        - img
      - cell "Customer Name":
        - text: Customer Name
        - img
      - cell "Mobile":
        - text: Mobile
        - img
      - cell "#items":
        - text: "#items"
        - img
      - cell "Total":
        - text: Total
        - img
      - cell "Sale Time":
        - text: Sale Time
        - img
      - cell "Status":
        - text: Status
        - img
      - cell
  - rowgroup:
    - row "Synced 44 69 Register1 / Inventory UNKNOWN N/A 1 $31.35 12/04/25 01:25:27 Complete ":
      - cell "Synced 44"
      - cell "69"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$31.35"
      - cell "12/04/25 01:25:27"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 43 3426 Register1 / Inventory UNKNOWN N/A 1 $31.35 12/04/25 01:25:02 Complete ":
      - cell "Synced 43"
      - cell "3426"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$31.35"
      - cell "12/04/25 01:25:02"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 42 9453 Register1 / Inventory UNKNOWN N/A 1 $31.35 12/04/25 01:24:42 Complete ":
      - cell "Synced 42"
      - cell "9453"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$31.35"
      - cell "12/04/25 01:24:42"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 41 691 Register1 / Inventory UNKNOWN N/A 2 $56.73 12/04/25 01:24:10 Complete ":
      - cell "Synced 41"
      - cell "691"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "2"
      - cell "$56.73"
      - cell "12/04/25 01:24:10"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 40 3156 Register1 / Inventory UNKNOWN N/A 1 $5.67 12/04/25 01:23:00 Complete ":
      - cell "Synced 40"
      - cell "3156"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$5.67"
      - cell "12/04/25 01:23:00"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 39 2676 Register1 / Inventory UNKNOWN N/A 1 $5.67 12/04/25 01:22:33 Complete ":
      - cell "Synced 39"
      - cell "2676"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$5.67"
      - cell "12/04/25 01:22:33"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 38 1052 Register1 / Inventory UNKNOWN N/A 1 $10.00 12/04/25 01:21:58 Complete ":
      - cell "Synced 38"
      - cell "1052"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$10.00"
      - cell "12/04/25 01:21:58"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 37 1171 Register1 / Inventory UNKNOWN N/A 1 $11.12 12/04/25 01:21:42 Complete ":
      - cell "Synced 37"
      - cell "1171"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$11.12"
      - cell "12/04/25 01:21:42"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 36 9395 Register1 / Inventory UNKNOWN N/A 1 $10.00 12/04/25 01:21:28 Complete ":
      - cell "Synced 36"
      - cell "9395"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$10.00"
      - cell "12/04/25 01:21:28"
      - cell "Complete"
      - cell "":
        - button ""
    - row "Synced 35 7112 Register1 / Inventory UNKNOWN N/A 1 $10.00 12/04/25 01:21:14 Complete ":
      - cell "Synced 35"
      - cell "7112"
      - cell "Register1 / Inventory"
      - cell "UNKNOWN"
      - cell "N/A"
      - cell "1"
      - cell "$10.00"
      - cell "12/04/25 01:21:14"
      - cell "Complete"
      - cell "":
        - button ""
- text: Showing 1 to 10 of 44 entries
- button "Previous" [disabled]
- button "1"
- button "2"
- button "3"
- button "4"
- button "5"
- button "Next"
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
  174 |             { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] }
  175 |         );
  176 |
  177 |         await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})
  178 |         // await ADMIN.Dialog.ReportTransaction.TransactionTable.SortByColumn({
  179 |         //     columnTitle: "Time",
  180 |         //     sortOrder: "descending"
  181 |         // });
  182 |
  183 |         await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
  184 |             { clickOn: "Details" },
  185 |             { rowIndex: 1 }
  186 |         );
  187 |
  188 |         const taxes = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
  189 |         const taxValues = taxes.map(Reports.parseCurrency);
  190 |         
  191 |         const totalTax = taxValues.reduce((a, b) => a + b, 0);
  192 |         
  193 |
  194 |         expect(totalTax, `Error: Tax mismatch! 
  195 |         From Transaction Details: ${totalTax} 
  196 |         From Register: ${TaxApplied} 
  197 |         Raw spans: ${JSON.stringify(taxes)}`).toBeCloseTo(
  198 |             TaxApplied,2
  199 |         );
  200 |
  201 |     });
  202 |
  203 |    
  204 |     test('[C6223] Verify card transaction with multiple exclusive tax reflected correctly in Reports', { tag: ['@Tax','@nonparallelizable'] }, async () => {
  205 |         // --- Step 1: Login & Ring Item ---
  206 |         await POS.Login.In();
  207 |         await POS.Register.Click();
  208 |
  209 |         // Ring item with multiple exclusive tax
  210 |         await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE }); // or any item
  211 |         await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "MultiExclisiveTax" });
  212 |
  213 |         // Capture subtotal from POS register
  214 |         const registerSubtotal = Reports.parseCurrency(
  215 |             await POS.Register.Subtotal.GetLabel()
  216 |         );
  217 |
  218 |         // Capture Total from POS register
  219 |         const registerTotal = Reports.parseCurrency(
  220 |             await POS.Register.Total.GetLabel()
  221 |         );
  222 |         const registerTaxLabel = await POS.Register.ItemLines.GetTax({ row: 1 });
  223 |         expect(registerTaxLabel).toContain("MultiExclisiveTax");
  224 |
  225 |         const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
  226 |
  227 |         // --- Step 2: Checkout using Card ---
  228 |         await POS.Register.PayButton.Click();
  229 |         await payfac.Read({ amount: registerTotal });
  230 |         await POS.Dialog.Checkout.Card.Click();
  231 |
  232 |         expect(await POS.Dialog.Success.IsVisible(), "Error: Payfac transaction was not approved").toBeTruthy();
  233 |
  234 |         await POS.Dialog.Success.Close.Click();
  235 |          await POS.Sales.Click();
  236 |         await POS.Register.Click();
  237 |         await POS.Sales.Click();
  238 |         const posref=await POS.Sales.transactions.Table.GetRefNumber(1);
  239 |
  240 |         // --- Step 3: Reports → Filter for Card transactions ---
  241 |         await POS.Admin.Click();
  242 |         await ADMIN.Menu.Reports.GoTo();
  243 |
  244 |         // Filter to "Card" in Summary Report
  245 |         await ADMIN.Reports.SummaryReportTable.ClickCell(
  246 |             { clickOn: "# Sales" },
  247 |             { rowQuery: [{ rowColumn: "label", rowValue: "Card" }] }
  248 |         );
  249 |
  250 |        await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})
  251 |
  252 |         // --- Step 4: Open Details for latest transaction ---
  253 |         await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
  254 |             { clickOn: "Details" },
  255 |             { rowIndex: 1 }
  256 |         );
  257 |
  258 |         // --- Step 5: Validate Taxes & Totals ---
  259 |         const taxes = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
  260 |         const taxValues = taxes.map(Reports.parseCurrency);
  261 |         const reportTax = taxValues.reduce((a, b) => a + b, 0);
  262 |
  263 |         const reportSubtotal = Reports.parseCurrency(
  264 |             await ADMIN.Dialog.TransactionDetails.Subtotal.getText()
  265 |         );
  266 |         const reportTotal = Reports.parseCurrency(
  267 |             await ADMIN.Dialog.TransactionDetails.Total.getText()
  268 |         );
  269 |
  270 |
  271 |         expect(reportSubtotal, `Error: Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`).toBeCloseTo(registerSubtotal,2);
  272 |
  273 |         
> 274 |         expect(reportTax,`Error: Tax mismatch! Register=${registerTax}, Report=${reportTax}, Raw spans=${JSON.stringify(taxes)}`).toBeCloseTo(registerTax, 2);
      |                                                                                                                                   ^ Error: Error: Tax mismatch! Register=4.86, Report=2.18, Raw spans=["$2.18"]
  275 |
  276 |         expect(reportTotal, `Error:Total mismatch! Expected ${reportTotal}, got ${reportTotal}`).toBeCloseTo(registerTotal,2);
  277 |
  278 |     });
  279 |
  280 |
  281 |    
  282 |     test(' [C6225] Verify transaction details show accurate tax (0) when No Tax is applied and payment is made in cash', { tag: ['@Tax'] }, async () => {
  283 |         // --- Step 1: Login & Ring Item ---
  284 |         await POS.Login.In();
  285 |         await POS.Register.Click();
  286 |
  287 |         // Ring item with No Tax
  288 |         await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE }); // $10 item
  289 |         await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "NoTax" });
  290 |
  291 |         // Capture Subtotal & Total from POS register
  292 |         const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
  293 |         const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
  294 |         const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
  295 |
  296 |         console.log('registerSubtotal', registerSubtotal);
  297 |         console.log('registerTotal', registerTotal);
  298 |         console.log('registerTax', registerTax);
  299 |
  300 |         expect(registerTax, "Error: Tax should be 0 for No Tax item").toEqual(0);
  301 |
  302 |         // --- Step 2: Checkout using Cash ---
  303 |         await POS.Register.PayButton.Click();
  304 |         await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
  305 |         await POS.Dialog.CheckoutComplete.No.Click();
  306 |         await POS.Sales.Click();
  307 |         await POS.Register.Click();
  308 |         await POS.Sales.Click();
  309 |         const posref=await POS.Sales.transactions.Table.GetRefNumber(1);
  310 |
  311 |
  312 |         // --- Step 3: Reports → Filter for Cash transactions ---
  313 |         await POS.Admin.Click();
  314 |         await ADMIN.Menu.Reports.GoTo();
  315 |
  316 |         await ADMIN.Reports.SummaryReportTable.ClickCell(
  317 |             { clickOn: "# Sales" },
  318 |             { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] }
  319 |         );
  320 |
  321 |       await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})
  322 |
  323 |         // --- Step 4: Open Details for latest transaction ---
  324 |         await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
  325 |             { clickOn: "Details" },
  326 |             { rowIndex: 1 }
  327 |         );
  328 |
  329 |         // --- Step 5: Validate Transaction Details ---
  330 |         const reportSubtotal = Reports.parseCurrency(
  331 |             await ADMIN.Dialog.TransactionDetails.Subtotal.getText()
  332 |         );
  333 |         const reportTaxValues = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
  334 |         const reportTax = reportTaxValues.map(Reports.parseCurrency).reduce((a, b) => a + b, 0);
  335 |
  336 |         const reportTotal = Reports.parseCurrency(
  337 |             await ADMIN.Dialog.TransactionDetails.Total.getText()
  338 |         );
  339 |
  340 |         console.log('reportSubtotal', reportSubtotal);
  341 |         console.log('reportTaxValues', reportTaxValues);
  342 |         console.log('reportTax', reportTax);
  343 |
  344 |         // --- Assertions ---
  345 |         expect(reportSubtotal, `Error:Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`)
  346 |             .toEqual(registerSubtotal);
  347 |
  348 |         expect(reportTax, `Error: Tax mismatch! Expected 0, got ${reportTax}, Raw spans=${JSON.stringify(reportTaxValues)}`)
  349 |             .toEqual(0);
  350 |
  351 |         expect(reportTotal, `Error: Total mismatch! Register=${registerTotal}, Report=${reportTotal}`).toEqual(registerTotal);
  352 |
  353 |     });
  354 |
  355 |    
  356 |     test('[C6226] Verify card transaction with No Tax reflected correctly in Reports', { tag: ['@Tax'] }, async () => {
  357 |         // --- Step 1: Login & Ring Item ---
  358 |         await POS.Login.In();
  359 |         await POS.Register.Click();
  360 |
  361 |         // Ring item with No Tax
  362 |         await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE }); // $10 item
  363 |         await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "NoTax" });
  364 |
  365 |         // Capture Subtotal, Tax & Total from POS register
  366 |         const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
  367 |         const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
  368 |         const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
  369 |
  370 |         expect(registerTax, "Error: Tax should be 0 for No Tax item").toEqual(0);
  371 |
  372 |         // --- Step 2: Checkout using Card ---
  373 |         await POS.Register.PayButton.Click();
  374 |         await payfac.Read({ amount: registerTotal });
```