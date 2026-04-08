// Test Cases Organized by Category for POS System
// AUTOMATION FOCUS: 676 business logic tests (excludes UI validation and specific categories)
// 
// EXCLUDED CATEGORIES: API, Performance, Security, Integration, Compatibility, Usability, UI/UX
// EXCLUDED TESTS: Button visibility, field validation, UI element checks
// FOCUS: End-to-end workflows, business logic, data integrity validation

// ============================================================================
// SMOKE TESTS (61 total) - Critical business operations that must work
// ============================================================================

// Already Automated (59) - PRIORITY 1
export const SMOKE_TESTS_AUTOMATED = [
  'C26',    // Verify Selling an Item with Cash - priority 1
  'C31',    // Verify Sale of Item with No Tax - priority 1
  'C75',    // Verify Multi-Item Sale with Cash Payment - priority 1
  'C76',    // Verify Sale of Item Added Through Stock Code Field - priority 1
  'C78',    // Verify Item qty Update via Stock Code, Stock Search, and Box Panel - priority 1
  'C79',    // Verify Sale of Item with Modified Price - priority 1
  'C80',    // Verify Display of Age Verification Popup - priority 1
  'C204',   // Verify Refund Process with Cash Payment - priority 1
  'C350',   // Verify Applied Percentage Discounts to Items with Cash Payment - priority 1
  'C428',   // Verify Validation for Setting Item Price Below Minimum - priority 1
  'C1203',  // Add new customer - priority 1
  'C1413',  // Verify if the user can login with valid username and valid password - priority 1
  'C1414',  // Verify if the user can't login using the invalid login credentials - priority 1
  'C1415',  // Verify if the user can logout from the POS side - priority 1
  'C1416',  // Verify if the URL loads up appropriately on major web browsers - priority 1
  'C1417',  // Verify if the item can be added from the admin side - priority 1
  'C1419',  // Verify if the items sale can be completed using split payment from the POS side - priority 1
  'C1420',  // Verify if the added item can be deleted from the admin side - priority 1
  'C1421',  // Verify if the items can be deleted from the admin side - priority 1
  'C1422',  // Verify if the suppliers can be added on the admin side - priority 1
  'C1426',  // Verify if the suspended sale can be deleted/removed - priority 1
  'C1428',  // Verify if the day report can be displayed and printed on range from the POS side - priority 1
  'C1429',  // Verify if the register report can be displayed and printed - priority 1
  'C1430',  // Verify if the seller report can be displayed - priority 1
  'C1431',  // Verify if the whats selling report can be displayed - priority 1
  'C1432',  // Verify if the takings count report can be displayed - priority 1
  'C1433',  // Verify if the item can be searched using the similar or exact name of the item from the POS side - priority 1
  'C1434',  // Verify if the items can be searched by scanning the bar code using the scanner - priority 1
  'C1436',  // Verify if the customer can be added from the POS side - priority 1
  'C1439',  // Verify if the loyalty points can be earned by the customer - priority 1
  'C1441',  // Verify if a manual item can be added from the POS side - priority 1
  'C1442',  // Verify if the payout can be added for a sale - priority 1
  'C1443',  // Verify if the sale can be cancelled - priority 1
  'C1444',  // Verify if the sale can be voided - priority 1
  'C1445',  // Verify if the discount can be applied on the sale - priority 1
  'C1594',  // Verify if the access the admin side from the POS side - priority 1
  'C1595',  // Verify if the user can logout from the admin side - priority 1
  'C1596',  // Verify if user can access the dashboard from the admin side - priority 1
  'C2078',  // Validate Login with incorrect username and correct password - priority 1
  'C2079',  // Validate Login with correct username and incorrect password - priority 1
  'C3791',  // Verify Selling an Item with PayFac - priority 1
  'C3792',  // Verify Sale of Item with No Tax using PayFac - priority 1
  'C3793',  // Verify Multi-Item Sale with PayFac - priority 1
  'C3798',  // Verify Display of Age Verification Popup - priority 1
  'C3900',  // Verify side card payment method - priority 1
  'C4032',  // Verify items with "Do not Discount" enabled are excluded from discount calculations - priority 1
  'C4035',  // Verify manual item is added to the sale when Add Item button is clicked - priority 1
  'C4205',  // Verify scanning item works on POS - priority 1
  'C4397',  // Verify barcode scanner working for existing item - priority 1
  'C4398',  // Verify barcode scanner working for non existing item - priority 1
  'C4409',  // Verify admin page is loading properly - priority 1
  'C6073',  // Verify if the customer can be added from the admin side - priority 1
  'C1435',  // Verify if the items can be chosen from the short cut menu from the POS side - priority 1
  'C1437',  // Verify if the item can be added from the POS side - priority 1
  'C1438',  // Verify if the loyalty points earned by the customer can be redeemed - priority 1
  'C3343',  // Verify if the user can login with valid username and valid password (Mobile) - priority 1
  'C3344',  // Verify if the user can't login using the invalid login credentials (Mobile) - priority 1
  'C3347',  // Verify if the item can be added from the admin side (Mobile) - priority 1
  'C3345',  // Verify if the user can logout (Mobile) - priority 1
  // 'C2054',  // To verify the Login Page components - priority 1 [UI VALIDATION - IGNORE]
  // 'C2055',  // Validate Username field is visible on the login screen - priority 1 [UI VALIDATION - IGNORE]
  // 'C2056',  // Validate Password field is visible on the login screen - priority 1 [UI VALIDATION - IGNORE]
  // 'C2057',  // Validate Login button is visible on the login screen - priority 1 [UI VALIDATION - IGNORE]
  // 'C2058',  // Validate Username field is editable on the login screen - priority 1 [UI VALIDATION - IGNORE]
  // 'C2059',  // Validate Password field is editable on the login screen - priority 1 [UI VALIDATION - IGNORE]
  // 'C2060',  // Validate Login button is clickable on the login screen - priority 1 [UI VALIDATION - IGNORE]
  // 'C2061',  // Validate Login button label is "Login" on the login screen - priority 1 [UI VALIDATION - IGNORE]
  // 'C2081',  // Verify blank space should be trimmed during login - priority 1 [CONSOLIDATE WITH LOGIN TESTS]
];

// To Do (2) - PRIORITY 1
export const SMOKE_TESTS_TODO = [
  'C1440',  // Verify if the loyalty points are deducted correctly for every refunded sale - priority 1
  'C3346',  // Verify if the URL loads up appropriately on major web browsers (Mobile) - priority 1
  //'C4026',  // Verify Add to Shortcut Keys checkbox resets for each new item added - priority 1
];

// ============================================================================
// REGRESSION TESTS (615 total) - Comprehensive functionality testing
// ============================================================================

// Already Automated (9) - PRIORITY 1
export const REGRESSION_TESTS_AUTOMATED = [
  'C81',    // Verify "Not a Valid Date Error" on Invalid Date Submission - priority 1
  'C1158',  // Verify Disabled Promotion Status Prevents Application - priority 1
  'C3902',  // Verify coupon discounts % are applied correctly - priority 1
  'C1423',  // Verify if the item sale can be suspended from the POS side - priority 1
  'C1424',  // Verify if a items in an order can be recalled and finally completed - priority 1
  'C1425',  // Verify if the suspended sale's status can be reviewed on the sales tab in the POS side - priority 1
  'C1427',  // Verify if the sales or refund or cancelled transaction's receipt can be printed - priority 1
  'C1443',  // Verify if the sale can be cancelled - priority 1
  'C1444',  // Verify if the sale can be voided - priority 1
  //'C294',   // Verify Refund process from sales (duplicate removed) - priority 1
];

// To Do (606) - Organized by subcategories based on CSV data
// PayFac/Terminal Tests (14 tests) - PRIORITY 1 - DONE
export const PAYMENT_TESTS = [
  // PayFac Terminal Tests
  'C3429', // Verify PayFac refund - priority 1
  'C4036', // Verify split payment with Payfac and Dual Pricing - priority 1
  'C8269', // Verify split payment with Payfac and NCA - priority 1
  // Multi-Terminal Support
  'C3411', // Verify Pax terminal payment - priority 1
  'C3412', // Verify TriposDirect terminal payment - priority 1
  'C3413', // Verify Tripos terminal payment - priority 1
  'C8264', // Verify Datacap terminal payment - priority 1
  'C8265', // Verify Pax partial payment - priority 1
  'C8266', // Verify TriposDirect partial payment - priority 1
  'C8267', // Verify Datacap partial payment - priority 1
  'C8268', // Verify Tripos partial payment - priority 1
  'C8270', // Verify Pax split payment with Dual Pricing - priority 1
  'C8271', // Verify Pax split payment with NCA - priority 1
  // Split Payment & Partial Payments
  'C1419', // Verify split payment completion - priority 1
   // 'C3426', // Verify PayFac payment processing - priority 1
  // 'C3427', // Verify PayFac partial payment - priority 1
  // 'C3428', // Verify PayFac with customer - priority 1
  // 'C3793', // Verify Multi-Item Sale with PayFac - priority 1
];
  
// Gift Card Processing (24 tests) - PRIORITY 1
export const PAYMENT_GIFT_CARD_TESTS = [
  'C5508', // Verify Gift Card feature enable - priority 1
  'C5513', // Verify Gift Card email validation - priority 1
  'C5514', // Verify Gift Card password confirmation - priority 1
  'C5516', // Verify Gift Card duplicate email prevention - priority 1
  'C5519', // Verify Gift Card account creation - priority 1
  'C5520', // Verify Gift Card unregistered email error - priority 1
  'C5521', // Verify Gift Card incorrect password error - priority 1
  'C5523', // Verify Gift Card valid login - priority 1
  'C5580', // Verify Gift Card balance check - priority 1
  'C5583', // Verify Gift Card invalid balance error - priority 1
  'C5592', // Verify Gift Card activation completion - priority 1
  'C5595', // Verify Gift Card sale payment options - priority 1
  'C5597', // Verify Gift Card receipt printing - priority 1
  'C5598', // Verify Gift Card special characters - priority 1
  'C5599', // Verify Gift Card as payment tender - priority 1
  'C5601', // Verify Gift Card payment dialog - priority 1
  'C5603', // Verify Gift Card scanning - priority 1
  'C5604', // Verify Gift Card invalid error - priority 1
  'C5606', // Verify Gift Card custom amounts - priority 1
  'C5607', // Verify Gift Card amount deduction - priority 1
  'C5608', // Verify Gift Card balance dialog close - priority 1
  'C5783', // Verify Gift Card item ID match - priority 1
  'C8192', // Verify Gift Card settings enable - priority 1
  'C8193', // Verify Gift Card settings disable - priority 1
  // 'C5512', // Verify Gift Card fields clickable - priority 1 [UI VALIDATION - IGNORE]
  // 'C5517', // Verify Gift Card Create Account button - priority 1 [UI VALIDATION - IGNORE]
  // 'C5579', // Verify Gift Card Balance button display - priority 1 [UI VALIDATION - IGNORE]
  // 'C5587', // Verify Gift Card activation button - priority 1 [UI VALIDATION - IGNORE]
  // 'C5589', // Verify Gift Card activation fields - priority 1 [UI VALIDATION - IGNORE]
];


// Credit Card Settings & Terminal Config (4 tests) - PRIORITY 1 - DONE
export const PAYMENT_CREDIT_CARD_TESTS = [
  'C3317', // Verify Pax settings change - priority 1
  'C3318', // Verify TriposDirect settings change - priority 1
  'C3319', // Verify Payfac settings change - priority 1
  'C4043', // Verify Pax settings change (duplicate) - priority 1
];
  
// Side Card & Alternative Payment Methods (2 tests) - PRIORITY 1 - DONE
export const PAYMENT_SIDE_CARD_TESTS = [
  'C3900', // Verify side card payment method - priority 1
  'C8199', // Verify Side Card checkbox functionality - priority 1
];

// Surcharge & Fee Processing (8 tests) - PRIORITY 1 - DONE
export const PAYMENT_SURCHARGE_FEE_TESTS = [
  'C4311', // Verify surcharge not in refund - priority 1
  'C4328', // Verify surcharge on credit card - priority 1
  'C4329', // Verify surcharge not on debit card - priority 1
  'C4406', // Verify surcharge display on register - priority 1
  'C4407', // Verify surcharge in POS reports - priority 1
  'C4408', // Verify surcharge in Admin reports - priority 1
  'C4414', // Verify surcharge prevents DP/NCA - priority 1
  'C4415', // Verify surcharge enable in admin - priority 1
];

// Dual Pricing & NCA (14 tests) - PRIORITY 1 - DONE
export const PAYMENT_DUAL_PRICING_NCA_TESTS = [
  'C4037', // Verify checkout dual pricing calculation - priority 1
  'C4148', // Verify NCA exclusion by category - priority 1
  'C4149', // Verify dual pricing in reports - priority 1
  'C4185', // Verify DP amount in Card amount - priority 1
  'C4186', // Verify DP amount in Additional Card Fee - priority 1
  'C4187', // Verify DP Total Tendered matches - priority 1
  'C4188', // Verify DP refund includes DP amount - priority 1
  'C4189', // Verify NCA not in Gross Sales - priority 1
  'C4190', // Verify NCA not in Card amount - priority 1
  'C4191', // Verify NCA refund includes NCA amount - priority 1
  'C4204', // Verify NCA Total Tendered matches - priority 1
  'C4567', // Verify NCA not in hourly Day Report - priority 1
  'C4568', // Verify DP not in hourly Day Report - priority 1
  'C8262', // Verify NCA/Dual Pricing settings - priority 1
];

// Cash Payment Processing (2 tests) - PRIORITY 1 - DONE
export const PAYMENT_CASH_TESTS = [
  // Cash Payment Processing
  'C3331', // Verify cash payment recording - priority 1
  'C3792', // Verify PayFac no tax cash equivalent - priority 1
  // 'C31',   // Verify cash payment with no tax - priority 1
  // 'C75',   // Verify multi-item cash sale - priority 1
];

// Payment Refunds (2 tests) - PRIORITY 1 -  DONE
export const PAYMENT_REFUND_TESTS = [
  // Payment Refunds
  'C6470', // Verify mobile cash refund - priority 1
  'C8272', // Verify card refund - priority 1
  // 'C204',  // Verify cash refund process - priority 1
  // 'C4574', // Verify transaction refund - priority 1
];

export   const PAYMENT_RECEIPT_TRANSACTION_COMPLETION_TESTS = [
  // Receipt & Transaction Completion
  // 'C4454', // Verify receipt printing - priority 1
  // 'C1427'  // Verify receipt printing for all transaction types - priority 1
];

// EBT Payment Processing Tests (24 tests) - PRIORITY 1
export const PAYMENT_EBT_TESTS = [
    // EBT Payment Processing
    'C2064', // Verify EBT Sale balance check - priority 1 - done
    'C2065', // Verify EBT Cash balance check - priority 1 - done
    'C2066', // Verify EBT Sale disabled when not enabled - priority 1 - done
    'C2067', // Verify EBT Cash disabled when not enabled - priority 1 - done
    'C2082', // Verify EBT Balance button disabled on mobile - priority 1 -done
    'C2084', // Verify EBT Sale disabled during partial payment - priority 1 - done 
    'C2085', // Verify EBT Sale enabled during EBT partial payment - priority 1 - done
    'C2086', // Verify EBT Cash full payment - priority 1 - done
    'C2087', // Verify EBT Sale partial payment completion - priority 1 - done
    'C2154', // Verify EBT Sale balance error with inactive Payfac - priority 1 - done
    'C2155', // Verify EBT Sale balance error with invalid Payment ID - priority 1 - done
    'C2156', // Verify EBT Cash balance error with inactive Payfac - priority 1 - done
    'C2158', // Verify EBT Cash balance error with invalid Payment ID - priority 1 - done
    'C2162', // Verify EBT Sale partial payment with card and DP - priority 1 - done
    'C2163', // Verify EBT Sale payment without DP - priority 1 - done
    'C2164', // Verify EBT Sale partial payment with cash no DP - priority 1 - done
    'C2166', // Verify EBT Sale payment with DP enabled - priority 1 - done
    'C2167', // Verify EBT Sale balance check after transaction - priority 1 - done
    'C2168', // Verify EBT Cash balance check after transaction - priority 1 -done
    'C2170', // Verify EBT Sale full payment - priority 1- done
    'C2171', // Verify EBT item with Card payment applies DP - priority 1 - done
    'C2172', // Verify EBT item with Cash payment applies DP - priority 1 - done
    'C2173', // Verify EBT Sale payment without NCA - priority 1 - done 
    'C2174', // Verify EBT Sale payment with NCA enabled - priority 1 - done
    // 'C2070', // Verify EBT Sale loader timeout - priority 0
    // 'C2071', // Verify EBT Cash loader timeout - priority 0
];
// Tax and Discount Tests (67 tests) - PRIORITY 2 - DONE
export const TAX_DISCOUNT_TESTS = [
  // Discount & Promotion Tests - done
  // 'C293',  // Verify promotion application - priority 2
  // 'C727',  // Verify discount permissions - priority 2
  'C1158', // Verify disabled promotion prevention - priority 2
  'C1445', // Verify discount application on sale - priority 2
  'C2187', // Verify manual discount restrictions - priority 2
  'C2481', // Verify promotion restrictions - priority 2
  'C4028', // Verify negative coupon tax - priority 2
  
  // Coupon Processing
  'C3902', // Verify coupon discount percentage - priority 2
  'C4013', // Verify Net Sales coupon deduction - priority 2
  
  // Tax Calculation Tests -done
  'C4173', // Verify tax amounts in reports - priority 2
  'C6172', // Verify multiple exclusive taxes in Summary report - priority 2
  'C6173', // Verify multiple exclusive taxes with cash - priority 2
  'C6223', // Verify multiple exclusive taxes with card - priority 2
  'C6225', // Verify no tax with cash - priority 2
  'C6226', // Verify no tax with card - priority 2
  'C6227', // Verify multiple inclusive taxes with cash - priority 2
  'C6241', // Verify multiple inclusive taxes with card - priority 2
  'C6242', // Verify single inclusive tax with cash - priority 2
  'C6243', // Verify single inclusive tax with card - priority 2
  'C6244', // Verify single exclusive tax with cash - priority 2
  'C6245', // Verify single exclusive tax with card - priority 2
  
  // Tax Administration
  'C8224', // Verify Tax Rules table - priority 2
  'C8225', // Verify Tax Rules edit - priority 2
  'C8226', // Verify Tax Rules delete - priority 2
  'C8227', // Verify Tax Rules sorting - priority 2
  'C8228', // Verify Tax Rules Add button - priority 2
  'C8229', // Verify new tax rule creation - priority 2
  'C8230', // Verify default tax rule selection - priority 2
  'C8231', // Verify Tax Items table - priority 2
  'C8232', // Verify Tax Items edit - priority 2
  'C8233', // Verify Tax Items delete - priority 2
  'C8234', // Verify Tax Items sorting - priority 2
  'C8235', // Verify Tax Items Add button - priority 2
  'C8252', // Verify Default Tax dropdown - priority 2
  'C8253', // Verify Tax Button dropdown - priority 2
  'C8254', // Verify Tax Button checkbox - priority 2
  // 'C8255', // Verify Tax Label field - priority 2
  'C8256', // Verify Default EBT Tax dropdown - priority 2
  'C8257', // Verify Default EBT Tax checkbox - priority 2
  
  // Bottle Deposits - done
  'C4038', // Verify bottle deposit in total - priority 2
  'C4175', // Verify bottle deposit in reports - priority 2
  'C8236', // Verify Bottle Deposit table - priority 2
  'C8237', // Verify Bottle Deposit edit - priority 2
  'C8238', // Verify Bottle Deposit delete - priority 2
  'C8239', // Verify Bottle Deposit sorting - priority 2
  'C8240', // Verify Bottle Deposit search - priority 2
  'C8241', // Verify Bottle Deposit pagination - priority 2
  // 'C8242', // Verify Bottle Deposit entries dropdown - priority 2
  'C8243', // Verify Bottle Deposit Add button - priority 2
  // 'C8258', // Verify Bottle Deposit feature checkbox - priority 2
  // 'C8259', // Verify Bottle Deposit Label field - priority 2
  // 'C8260', // Verify Bottle Deposit Taxable checkbox - priority 2
  'C8261', // Verify Bottle Deposit Return Amount field - priority 2
  
  // Additional Fees - done
  'C4176', // Verify taxable additional fees in reports - priority 2
  // 'C8244', // Verify Additional Fees table - priority 2
  'C8245', // Verify Additional Fees edit - priority 2
  'C8246', // Verify Additional Fees delete - priority 2
  'C8247', // Verify Additional Fees sorting - priority 2
  'C8248', // Verify Additional Fees pagination - priority 2
  'C8249', // Verify Additional Fees search - priority 2
  // 'C8250', // Verify Additional Fees entries dropdown - priority 2
  'C8251', // Verify Additional Fees Add button - priority 2
  
  // Price Controls - done
  // 'C428',  // Verify minimum price validation - priority 2
  // 'C79',   // Verify modified price sale - priority 2
  'C8215', // Verify stored item tax changes - priority 2
  'C8216', // Verify stored item price changes - priority 2
  'C8217'  // Verify Do Not Sell Below Cost - priority 2
];

// Reporting Tests (109 tests) - PRIORITY 4
export const REPORTING_TESTS = [
  // POS Reports
  'C1428', // Verify day report display and print - priority 4
  'C1429', // Verify register report display and print - priority 4
  'C1430', // Verify seller report display - priority 4
  'C1431', // Verify whats selling report display - priority 4
  'C1432', // Verify takings count report display - priority 4
  'C4039', // Verify register close functionality - priority 4
  'C4040', // Verify register close clears all records - priority 4
  'C4041', // Verify Day Report accuracy - priority 4
  'C4143', // Verify Total Tendered matches Total Register - priority 4
  'C4177', // Verify payout sales in POS Register report - priority 4
  'C4178', // Verify Payroll Report accuracy - priority 4
  'C6469', // Verify sales report on mobile browser - priority 4
  
  // Lottery & Gaming Reports
  'C7091', // Verify Lotto Sale in Day Report - priority 4
  'C7092', // Verify Lotto Sale in Summary Report - priority 4
  'C7094', // Verify Online Lottery in Day Report - priority 4
  'C7095', // Verify Online Lottery in Summary Report - priority 4
  'C7096', // Verify Lotto Payout in Day Report - priority 4
  'C7097', // Verify Lotto Payout in Summary Report - priority 4
  'C7098', // Verify Online Payout in Day Report - priority 4
  'C7099', // Verify Online Payout in Day Report - priority 4
  'C7100', // Verify Online Payout in Summary Report - priority 4
  'C7102', // Verify NCA percentage not in Summary report - priority 4
  
  // Admin Dashboard Reports
  'C5977', // Verify Dashboard UI elements without overlap - priority 4
  'C5979', // Verify Realtime Dashboard buttons functional - priority 4
  'C5981', // Verify Today's Takings accuracy - priority 4
  'C5983', // Verify Dashboard graph accuracy - priority 4
  'C5985', // Verify Top Rank Items accuracy - priority 4
  'C5987', // Verify Rank dropdown in Top Rank Items - priority 4
  'C5994', // Verify Stats section accuracy - priority 4
  'C5995', // Verify Dashboard stats calculations - priority 4
  'C5996', // Verify Sale Stats and Inventory Stats - priority 4
  'C5997', // Verify Days filter in Sale Stats - priority 4
  'C6000', // Verify Sales Graph dropdown filters - priority 4
  'C6001', // Verify calendar filter in Inventory Stats - priority 4
  'C6002', // Verify Inventory Stats pie chart filters - priority 4
  'C6003', // Verify Sales and Net Sales accuracy - priority 4
  'C6004', // Verify Bottles and Value in Inventory Stats - priority 4
  'C8101', // Verify Pie Graph filters in Sale Stats - priority 4
  'C8133', // Verify Home link navigation - priority 4
  'C8134', // Verify Refresh button - priority 4
  'C8138', // Verify Sales Stats bar graph display - priority 4
  'C8139', // Verify Today's Takings section display - priority 4
  
  // Transaction Detail Popups
  'C8148', // Verify Sales Detail popup search - priority 4
  'C8149', // Verify Sales Detail popup entries dropdown - priority 4
  'C8155', // Verify Sales Detail popup sorting - priority 4
  // 'C8156', // Verify Sales Detail popup Details button - priority 4 [UI VALIDATION - IGNORE]
  // 'C8157', // Verify Sales Detail popup Previous button - priority 4 [UI VALIDATION - IGNORE]
  // 'C8158', // Verify Sales Detail popup Next button - priority 4 [UI VALIDATION - IGNORE]
  // 'C8159', // Verify Sales Detail popup Close button - priority 4 [UI VALIDATION - IGNORE]
  'C8160', // Verify Sales Detail popup Details refresh - priority 4
  'C8161', // Verify Refunds Detail popup search - priority 4
  'C8162', // Verify Refunds Detail popup sorting - priority 4
  'C8163', // Verify Refunds Detail popup entries dropdown - priority 4
  // 'C8164', // Verify Refunds Detail popup Previous button - priority 4 [UI VALIDATION - IGNORE]
  // 'C8165', // Verify Refunds Detail popup Next button - priority 4 [UI VALIDATION - IGNORE]
  // 'C8166', // Verify Refunds Detail popup Close button - priority 4 [UI VALIDATION - IGNORE]
  'C8167', // Verify Refunds Detail popup Details refresh - priority 4
  'C8168', // Verify Voids Detail popup search - priority 4
  'C8169', // Verify Voids Detail popup sorting - priority 4
  'C8170', // Verify Voids Detail popup entries dropdown - priority 4
  // 'C8171', // Verify Voids Detail popup Previous button - priority 4 [UI VALIDATION - IGNORE]
  // 'C8173', // Verify Voids Detail popup Next button - priority 4 [UI VALIDATION - IGNORE]
  // 'C8174', // Verify Voids Detail popup Close button - priority 4 [UI VALIDATION - IGNORE]
  // 'C8175', // Verify Revenue Detail popup close icon - priority 4 [UI VALIDATION - IGNORE]
  'C8176', // Verify Revenue Detail popup search - priority 4
  'C8177', // Verify Revenue Detail popup entries dropdown - priority 4
  'C8178', // Verify Revenue Detail popup sorting - priority 4
  'C8179', // Verify Revenue Detail popup Details button - priority 4
  'C8180', // Verify Revenue Detail popup Previous button - priority 4
  'C8181', // Verify Revenue Detail popup Next button - priority 4
  'C8182', // Verify Revenue Detail popup Close button - priority 4
  'C8183', // Verify Revenue Detail popup Details refresh - priority 4
  'C8184', // Verify Revenue Detail popup Details refresh - priority 4
  
  // Transaction Management
  'C8135', // Verify Transaction Details modal - priority 4
  'C8136', // Verify Latest Transactions column headers - priority 4
  'C8137', // Verify Latest Transactions columns accuracy - priority 4
  'C8185', // Verify Notes field edit and save - priority 4
  'C8186', // Verify transaction tabs visibility - priority 4
  'C8187', // Verify View button on Details tab - priority 4
  'C8188', // Verify Delete icon on Details tab - priority 4
  'C8189', // Verify Items tab display - priority 4
  'C8190', // Verify Payments tab display - priority 4
  'C8191', // Verify Options tab functionality - priority 4
  
  // Report Navigation & Export
  'C6081', // Verify Reports menu visibility - priority 4
  'C6092', // Verify Reports dropdown - priority 4
  'C6097', // Verify range field in reports - priority 4
  'C6100', // Verify search in reports page - priority 4
  'C6116', // Verify advanced search in reports - priority 4
  'C6130', // Verify clear search in reports - priority 4
  'C6133', // Verify refresh button in reports - priority 4
  'C6141', // Verify CSV export reports - priority 4
  'C6143', // Verify print reports - priority 4
  'C1690', // Verify PDF invoice export - priority 4
  'C8279', // Verify navigation from Summary Report - priority 4
  'C8281', // Verify navigation from Sales Report - priority 4
  'C8299', // Verify Tender Report Takings Count - priority 4
  'C8300', // Verify Tender Report different time periods - priority 4
  'C8301', // Verify Tender Report Location Takings - priority 4
  'C8302', // Verify Tender Report Location time periods - priority 4
  'C8303', // Verify Tender Report Device Takings - priority 4
  'C8304', // Verify Tender Report Device time periods - priority 4
  
  // Report Accuracy with Features
  'C3901', // Verify card tender sales in Admin Day Report - priority 4
  'C4149', // Verify dual pricing in reports - priority 4
  'C4173', // Verify tax amounts in reports - priority 4
  'C4175', // Verify bottle deposit in reports - priority 4
  'C4176', // Verify taxable additional fees in reports - priority 4
  'C4185', // Verify DP amount in Card amount - priority 4
  'C4186', // Verify DP amount in Additional Card Fee - priority 4
  'C4187', // Verify DP Total Tendered matches - priority 4
  'C4188', // Verify DP refund includes DP amount - priority 4
  'C4189', // Verify NCA not in Gross Sales - priority 4
  'C4190', // Verify NCA not in Card amount - priority 4
  'C4191', // Verify NCA refund includes NCA amount - priority 4
  'C4204', // Verify NCA Total Tendered matches - priority 4
  'C4407', // Verify surcharge in POS reports - priority 4
  'C4408', // Verify surcharge in Admin reports - priority 4
  'C4567', // Verify NCA not in hourly Day Report - priority 4
  'C4568', // Verify DP not in hourly Day Report - priority 4
  'C6172', // Verify multiple exclusive taxes in Summary report - priority 4
  'C6173'  // Verify multiple exclusive taxes with cash - priority 4
];

// Admin Portal Tests (78 tests) - PRIORITY 2
export const ADMIN_TESTS = [
  // User & System Management
  'C1691', // Verify create admin users - priority 2
  'C1692', // Verify create new store - priority 2
  'C1693', // Verify create new device - priority 2
  'C1694', // Verify General Settings access - priority 2
  'C1595', // Verify admin logout - priority 2
  
  // Settings & Configuration
  'C1696', // Verify invoice settings update - priority 2
  'C1697', // Verify Accounting Settings access - priority 2
  'C2062', // Verify EBT Cash and Sale checkboxes - priority 2
  'C2063', // Verify EBT option save - priority 2
  'C3518', // Verify Formats section availability - priority 2
  'C3699', // Verify Inventory Settings section - priority 2
  'C3766', // Verify Loyalty Settings section - priority 2
  'C3767', // Verify Business Details section - priority 2
  'C8150', // Verify Enable Loyalty Points - priority 2
  'C8192', // Verify Gift Card settings enable - priority 2
  'C8193', // Verify Gift Card settings disable - priority 2
  'C8194', // Verify alternate labels configuration - priority 2
  'C8195', // Verify SMS settings configuration - priority 2
  'C8196', // Verify predefined report time slots - priority 2
  'C8197', // Verify Other Settings checkboxes - priority 2
  'C8198', // Verify Automation Settings configuration - priority 2
  'C8199', // Verify payment method checkboxes - priority 2
  'C8200', // Verify tender type default states - priority 2
  'C8201', // Verify tender type table search - priority 2
  'C8202', // Verify Allow Cashback on Card - priority 2
  
  // POS Settings
  'C8203', // Verify POS Settings page availability - priority 2
  'C8204', // Verify Receipt section fields - priority 2
  'C8205', // Verify default template dropdown - priority 2
  'C8206', // Verify Print POS Report Font Size - priority 2
  'C8207', // Verify Receipt Printer Logo upload - priority 2
  'C8208', // Verify Browser/Email Logo upload - priority 2
  'C8209', // Verify logo deletion - priority 2
  'C8210', // Verify Show Tags on POS Search - priority 2
  'C8211', // Verify POS Records section fields - priority 2
  'C8212', // Verify For The Last field dropdown - priority 2
  'C8213', // Verify Include field dropdown - priority 2
  'C8214', // Verify Sale Options section fields - priority 2
  'C8215', // Verify Allow Changing Stored Item Tax - priority 2
  'C8216', // Verify Allow Changing Stored Item Prices - priority 2
  'C8217', // Verify Do Not Sell Below Cost - priority 2
  'C8218', // Verify Other Options section fields - priority 2
  'C8219', // Verify Default Discount Type dropdown - priority 2
  'C8220', // Verify Customer Screen section fields - priority 2
  'C8221', // Verify Slide Show Images upload - priority 2
  'C8222', // Verify POS View Display Type dropdown - priority 2
  
  // Customer Screen Configuration
  'C2489', // Verify customer screen access - priority 2
  'C2490', // Verify customer screen settings update - priority 2
  
  // Invoice Settings
  'C8263', // Verify Invoice Settings page availability - priority 2
  
  // Item Management
  'C1417', // Verify item addition from admin - priority 2
  'C1420', // Verify item deletion from admin - priority 2
  'C1698', // Verify category creation - priority 2
  'C1699', // Verify category group creation - priority 2
  'C1716', // Verify promotion creation - priority 2
  'C3999', // Verify item defaults to Details tab - priority 2
  'C4026', // Verify Add to Shortcut Keys reset - priority 2
  'C4027', // Verify Item Shortcut Name auto-populate - priority 2
  'C4033', // Verify Edit button in Categories page - priority 2
  'C8151', // Verify item as Points Required - priority 2
  'C8273', // Verify label printing from Item page - priority 2
  'C8274', // Verify label printing from Receive page - priority 2
  
  // Category & Supplier Management
  'C1422', // Verify supplier addition - priority 2
  
  // Stock Transfer & Inventory
  'C4455', // Verify stock transfer feature - priority 2
  'C8275', // Verify stock received on Transfer page - priority 2
  'C8276', // Verify stock deduction from current store - priority 2
  'C8277', // Verify stock addition to second store - priority 2
  'C8278', // Verify Other Stores tab update - priority 2
  
  // Admin Dashboard & UI
  'C6170', // Verify no UI element overlap - priority 2
  'C8140', // Verify Today's Takings non-clickable when 0 - priority 2
  'C8141', // Verify Today's Takings clickable when > 0 - priority 2
  'C8142', // Verify All filter in Online Devices - priority 2
  'C8143', // Verify online devices in filter dropdown - priority 2
  'C8144', // Verify text field input in Online Devices - priority 2
  'C8145', // Verify send button in Online Devices - priority 2
  'C8146', // Verify Reset Terminal button - priority 2
  'C8147', // Verify close icon on Sales Detail popup - priority 2
  
  // Mobile Admin Access
  'C4608', // Verify Admin URL on mobile browser - priority 2
  'C4609', // Verify item quantity scan on mobile Admin - priority 2
  'C6467'  // Verify Admin panel access from mobile POS - priority 2
];

// Customer Management Tests (53 tests) - PRIORITY 2
export const CUSTOMER_TESTS = [
  // Basic Customer Operations
  'C1436', // Verify customer addition from POS - priority 2
  // 'C6070', // Verify Customers page loads - priority 2
  // 'C6071', // Verify Customers page buttons visible - priority 2
  // 'C6072', // Verify Export CSV button - priority 2
  // 'C6073', // Verify Add button access - priority 2
  'C6090', // Verify customer addition - priority 2
  // 'C6091', // Verify mandatory field validation - priority 2
  'C6094', // Verify search functionality - priority 2
  'C6105', // Verify customer details edit - priority 2
  'C6119', // Verify customer table sorting - priority 2
  
  // Customer Groups & Rewards
  'C6074', // Verify Manage Groups button - priority 2
  'C6078', // Verify Manage Rewards button - priority 2
  'C6080', // Verify reward addition - priority 2
  'C6082', // Verify reward editing - priority 2
  'C6083', // Verify reward deletion - priority 2
  'C6085', // Verify Add button in Manage Groups - priority 2
  'C6086', // Verify customer group editing - priority 2
  // 'C6087', // Verify customer group editing (duplicate) - priority 2
  'C6089', // Verify customer group addition - priority 2
  'C6106', // Verify customer group deletion - priority 2
  
  // Customer Search & Navigation
  'C6098', // Verify Advanced Search option - priority 2
  'C6099', // Verify Advanced Search filters - priority 2
  'C6101', // Verify Advanced Search dropdowns - priority 2
  // 'C6103', // Verify pagination navigation - priority 2
  // 'C6104', // Verify show entries dropdown - priority 2
  
  // Customer History & Analytics
  // 'C6107', // Verify History icon functionality - priority 2
  'C6108', // Verify customer sale stats - priority 2
  'C6109', // Verify Point Detail tab - priority 2
  'C6110', // Verify transaction history - priority 2
  'C6111', // Verify items history - priority 2
  'C6114', // Verify Ledger History - priority 2
  
  // Loyalty Points System
  'C1438', // Verify loyalty points redemption - priority 2
  'C1439', // Verify loyalty points earning - priority 2
  'C1440', // Verify loyalty points deduction on refund - priority 2
  // 'C4029', // Verify correct points calculation - priority 2
  'C4456', // Verify required points validation - priority 2
  'C8150', // Verify Enable Loyalty Points - priority 2
  'C8151', // Verify item as Points Required - priority 2
  'C8152', // Verify points-required item restrictions - priority 2
  
  // TABC Compliance (Texas Alcohol & Beverage Commission)
  // 'C4307', // Verify TABC Report toggle exists - priority 2
  // 'C4308', // Verify TABC export button appears - priority 2
  'C4309', // Verify export button hidden when TABC off - priority 2
  'C4310', // Verify TABC Report toggle functionality - priority 2
  'C4312', // Verify Texas Wholesale checkbox display - priority 2
  'C4313', // Verify Texas Wholesale hidden when TABC off - priority 2
  'C4314', // Verify Texas Wholesale related fields - priority 2
  'C4315', // Verify Texas Wholesale data save - priority 2
  'C4327', // Verify Beverage Class dropdown when TABC on - priority 2
  'C4334', // Verify TABC Wholesaler text display - priority 2
  'C4337', // Verify saved data retained when re-enabling TABC - priority 2
  'C4338', // Verify TABC wholesaler receipt - priority 2
  'C4339', // Verify suspend/recall for TABC wholesaler - priority 2
  'C4340', // Verify TABC wholesaler tax exempt - priority 2
  'C4400', // Verify Beverage class on advance update - priority 2
  'C4401', // Verify Beverage class on bulk update - priority 2
  'C4402', // Verify Beverage class in item history - priority 2
  'C4403', // Verify Beverage class in modification report - priority 2
  'C4404', // Verify Beverage Class hidden when TABC off - priority 2
  'C4405', // Verify Beer transaction in TABC report - priority 2
  
  // Customer Screen & Task Management
  'C2486', // Verify task notifications on POS - priority 2
  'C2487', // Verify task update from POS - priority 2
  // 'C2488', // Verify full screen button functionality - priority 2
  'C4570', // Verify item details on customer screen - priority 2
  'C4571', // Verify Customer Screen auto-launch - priority 2
  'C4572', // Verify customized Customer Screen - priority 2
  'C4573'  // Verify Customer Screen dynamic updates - priority 2
];

// Inventory Management Tests (108 tests) - PRIORITY 2
export const INVENTORY_TESTS = [
  // Receive Operations - priority 2
  // 'C5887', // Verify Orders page loads - priority 2
  // 'C5954', // Verify Receive page opens - priority 2
  // 'C5956', // Verify Receive Item dialog - priority 2
  // 'C5957', // Verify new invoice addition - priority 2
  'C5958', // Verify non-finalized invoice edit - priority 2 - done
  'C5959', // Verify invoice calculations - priority 2 - done
  'C5960', // Verify finalized invoice edit prevention - priority 2 - done
  'C5961', // Verify finalized invoice details view - priority 2 - done
  'C5962', // Verify duplicate invoice prevention - priority 2 - done
  'C5978', // Verify barcode scan existing item - priority 2 - done
  'C5980', // Verify same invoice alert dialog - priority 2 - done
  'C5982', // Verify multiple invoice merge - priority 2 - done
  'C5990', // Verify invoice CSV export - priority 2 - done
  'C5998', // Verify item quantity update after finalize - priority 2 - done
  'C6005', // Verify Units Per Case update - priority 2 - done
  'C6006', // Verify item cost update - priority 2 - done
  'C6009', // Verify new item creation by barcode - priority 2 - done
  'C6166', // Verify Receive table sorting - priority 2 - done
  'C6167', // Verify invoice history - priority 2 - done
  'C6168', // Verify finalized invoice delete disabled - priority 2 - done
  'C6169', // Verify non-finalized invoice deletion - priority 2 - done
  'C6174', // Verify item data unchanged after delete - priority 2 - done
  'C6175', // Verify negative values in Receive Bottles - priority 2 - done
  'C8130', // Verify search by supplier name - priority 2 - done
  'C8131', // Verify search by Invoice Number - priority 2 - done
  'C8132', // Verify received items grouped by supplier - priority 2 - done
  'C3396', // Verify import CSV tool for invoices - priority 2 - done
  'C4031', // Verify Receive Items dialog disabled during search - priority 2 - done
  
  // Item Detail Management - priority 2
  'C6075', // Verify stock code auto-populate - priority 2
  'C6076', // Verify price auto-populate - priority 2
  'C6077', // Verify Unit Per Case auto-populate - priority 2
  'C6079', // Verify save prevention without item name - priority 2
  'C6095', // Verify finalize prevention with non-existing item - priority 2
  'C6096', // Verify old cost strikethrough - priority 2
  'C6112', // Verify item entry link with existing item - priority 2
  'C6113', // Verify item switch in non-finalized invoice - priority 2
  'C6115', // Verify + icon for deleted items - priority 2
  'C6117', // Verify single item addition on enter - priority 2
  'C6118', // Verify duplicate item prevention - priority 2
  'C6142', // Verify stock codes merge after linking - priority 2
  'C6198', // Verify item details modal opens - priority 2
  'C6200', // Verify item details modal calculations - priority 2
  'C6224', // Verify Item Details modal fields editable - priority 2
  
  // Receive Item Calculations - priority 2
  'C6201', // Verify Total Cost update on Unit Per Case change - priority 2
  'C6202', // Verify Total Cost update on Received Bottles change - priority 2
  'C6203', // Verify Total Cost update on Received Case change - priority 2
  'C6204', // Verify Total Cost update on Cost per Bottle change - priority 2
  'C6205', // Verify Margin update on Cost per Bottle change - priority 2
  'C6206', // Verify Margin update on Price change - priority 2
  'C6207', // Verify Price and Markup update on Margin change - priority 2
  'C6208', // Verify Price and Margin update on Markup change - priority 2
  'C6209', // Verify Received Bottles and Total Cost update - priority 2
  'C6210', // Verify Total Cost unchanged on Received Case change - priority 2
  'C6211', // Verify Total Cost unchanged on Received Bottles change - priority 2
  'C6212', // Verify Total Cost unchanged on Unit Per Case change - priority 2
  'C6213', // Verify Margin update on Price change in popup - priority 2
  'C6214', // Verify Margin and Cost update on Total Cost change - priority 2
  'C6215', // Verify undo functionality - priority 2
  'C6216', // Verify search by Vendor Item No - priority 2
  'C6217', // Verify Product field navigation with arrows - priority 2
  'C6218', // Verify Vendor Item No navigation with arrows - priority 2
  'C6219', // Verify input field navigation with arrows - priority 2
  'C6220', // Verify product auto suggestion list remains open - priority 2
  'C6221', // Verify invoice save with latest changes - priority 2
  'C6222', // Verify label printing functionality - priority 2
  'C6239', // Verify invoice save with latest changes (duplicate) - priority 2
  'C6240', // Verify save prevention from multiple browsers - priority 2
  
  // Orders Management - priority 2
  'C8102', // Verify Create Order button - priority 2 - Done
  'C8103', // Verify supplier list in dropdown - priority 2 - Done
  'C8104', // Verify search and select by product name - priority 2 - done
  'C8105', // Verify Reorder Case box value addition - priority 2 - done
  'C8106', // Verify item removal from order - priority 2 - done
  'C8107', // Verify duplicate item prevention in order - priority 2
  'C8108', // Verify order item save - priority 2 - done
  'C8109', // Verify order item cancel - priority 2 - done
  'C8110', // Verify order creation and update - priority 2 - done
  'C8111', // Verify order deletion - priority 2 - done
  'C8112', // Verify pagination control - priority 2
  'C8113', // Verify entries dropdown selection - priority 2
  'C8114', // Verify sort icons functionality - priority 2
  // 'C8115', // Verify Refresh button - priority 2
  // 'C8116', // Verify History icon - priority 2
  'C8117', // Verify Export to Receive icon - priority 2
  'C8118', // Verify Generate Order button - priority 2 - done
  'C8119', // Verify Advanced Search button - priority 2 - done
  'C8120', // Verify Advanced Search functionality - priority 2 - done
  'C8121', // Verify Vendor Item Number search - priority 2 - done
  'C8122', // Verify Column Visibility option - priority 2
  'C8123', // Verify Export as File button - priority 2
  'C8124', // Verify Add Item button - priority 2 - done
  'C8125', // Verify Save prevention without items - priority 2 - done
  'C8126', // Verify Bottle/Case toggle button - priority 2 - done
  'C8127', // Verify Item History icon - priority 2 - done
  'C8128', // Verify Stock History dialog tabs - priority 2 - done 
  'C8129', // Verify reorder case value edit - priority 2 - done
  'C4000', // Verify # of Days Supply auto-update - priority 2 - done
  
  // Fast Inventory Count (Mobile) - priority 2
  'C4392', // Verify camera open from mobile dashboard - priority 2
  'C4393', // Verify camera scanner for existing items - priority 2
  'C4394', // Verify camera scanning for non-existing items - priority 2
  'C4395', // Verify scanned barcode pre-fill - priority 2
  'C4396', // Verify fast inventory count feature - priority 2
  
  // Item Search & Barcode - priority 2
  'C1433', // Verify item search by exact/similar name - priority 2
  'C1434', // Verify barcode scanning - priority 2
  'C4205', // Verify scanning item works on POS - priority 2
  'C4398', // Verify barcode scanner for non-existing item - priority 2
  'C4399', // Verify barcode scanner impact prevention - priority 2
  'C5963', // Verify Stock Code search field - priority 2
  'C5964', // Verify non-existing item search prevention - priority 2
  
  // Shortcut Management - priority 2
  'C1435', // Verify shortcut menu item selection - priority 2
  'C5969', // Verify shortcut menu bar access - priority 2
  'C5970', // Verify shortcut button functionality - priority 2
  'C5972', // Verify same hotkey qty increase - priority 2
  'C5973', // Verify category button on shortcut menu - priority 2
  'C5974'  // Verify category item count display - priority 2
];

// Mobile Testing (21 tests) - PRIORITY 4
export const MOBILE_TESTS = [
  // Mobile POS Operations
  'C6466', // Verify mobile POS login - priority 4
  'C6467', // Verify Admin panel access from mobile POS - priority 4
  'C6468', // Verify mobile cash transaction - priority 4
  'C6469', // Verify mobile sales report access - priority 4
  'C6470', // Verify mobile cash refund - priority 4
  'C6471', // Verify mobile transaction void - priority 4
  'C6472', // Verify mobile sale suspension - priority 4
  'C6473', // Verify mobile order recall - priority 4
  
  // Mobile Camera & Scanning
  'C4392', // Verify camera open from mobile dashboard - priority 4
  'C4393', // Verify camera scanner for existing items - priority 4
  'C4394', // Verify camera scanning for non-existing items - priority 4
  'C4395', // Verify scanned barcode pre-fill - priority 4
  'C4396', // Verify fast inventory count feature - priority 4
  'C4609', // Verify mobile item quantity scan - priority 4
  
  // Mobile Admin Access
  'C4608', // Verify Admin URL on mobile browser - priority 4
  
  // Mobile EBT Restrictions
  'C2082', // Verify EBT Balance button disabled on mobile - priority 4
  
  // Mobile Network & Connectivity
  'C3379', // Verify login/logout with slow 3g/offline - priority 4
  'C4034', // Verify Electron app online status - priority 4
  'C4450', // Verify offline to online transition - priority 4
  'C4451', // Verify internet warning message - priority 4
  'C4180'  // Verify offline sales sync - priority 4
];

// Gift Card Tests
export const GIFT_CARD_TESTS = [
  'C5587', //As a User, I want to verify that I can select the Activate Gift Card button to sell gift cards to customers
  'C5589', //As a user, I want to be able to select and input on all fields under Activate Gift Card to give custom gift card numbers and amounts based off of purchases 
  'C5592', //As a User, I want to verify after I enter the information for a Gift Card and complete the transaction if it activates
  'C5595', //As a cashier, I want to verify when selling a gift card that I have every payment option that I should have available to complete the sale
  'C5597', //As a Cashier, I want to be able to print a receipt after selling a Gift Card to give to the customer for their records
  'C5598', //As a Cashier, I want to be able to sell a Gift Card with special characters as needed for my customers
  'C5580', //As a Cashier, I want to verify that the Check Gift Card Balance button is displaying so I can check the balance of a Gift Card
  'C5581', //As a Cashier, I want to be able to use the Check Gift Card Balance field to verify what balance is on the customer's gift card
  'C5583', //As a Cashier, I want the system to show an error code when looking up an invalid Gift Card Balance so I can verify it is not a valid Gift Card
  'C5599', //As a Cashier, I want to verify that I can use Gift Card as a tender to complete a transaction
  'C5601', //As a Cashier, I want to make sure the Gift Card dialog appears when selecting Gift Card as a payment type so I can enter a code
  'C5603', //As a Cashier, I want to verify that I can scan a Gift Card to use as a tender to complete a transaction
  'C5604', //As a cashier, I want to ensure when using an invalid Gift Card that it will not allow me to do so preventing me from taking incorrect payment

  'C5606', //As a Cashier, I want to be able to enter custom amounts for Gift Card payment to be able to take partial payments from a Gift Card
  'C5607', //As a Cashier, I want to ensure the amount deducted from a Gift Card after doing a transaction is correct
  'C5608', //As a Cashier, I want to make sure if I select the Check Gift Card Balance I can close the dialog box if there is no Gift Card to check
  'C5783', //As an Admin, I want to verify that the Gift Card item ID matches up with the Gift Card ID in the Items tab
];

// EBT Tests
// export const EBT_TESTS = [
//   'C2064', 'C2065', 'C2066', 'C2067', 'C2068', 'C2069', 'C2070', 'C2071', 'C2073', 'C2076',
//   'C2077', 'C2082', 'C2084', 'C2085', 'C2086', 'C2170', 'C2171', 'C2172', 'C2087', 'C2163',
//   'C2173', 'C2166', 'C2174', 'C2165', 'C2175', 'C2162', 'C2167', 'C2168', 'C2169', 'C2164',
//   'C2154', 'C2155', 'C2156', 'C2157', 'C2158', 'C2159', 'C2160', 'C2161'
// ];

// TABC Tests
export const TABC_TESTS = [
  'C4307', ' C4310', 'C4309', 'C4308', 'C4312', 'C4313', 'C4314', 'C4315', 'C4327', 'C4404',
  'C4334', 'C4337', 'C4338', 'C4339', 'C4340', 'C4400', 'C4401', 'C4402', 'C4403', 'C4405'
];

// Offline/Online Tests
export const OFFLINE_TESTS = [
  'C3811', 'C3305', 'C4172', 'C4450', 'C4451', 'C4452', 'C2482', 'C2483', 'C2484', 'C4034',
  'C4180', 'C3379', 'C3380'
];

// POS Operations Tests (76 tests) - PRIORITY 4
export const POS_OPERATIONS_TESTS = [
  // Basic Sales Operations
  'C31',   // Verify cash payment with no tax - priority 4
  'C75',   // Verify multi-item cash sale - priority 4
  'C77',   // Verify item edit through Options button - priority 4
  'C78',   // Verify item qty update via Stock Code/Search/Shortcuts - priority 4
  'C79',   // Verify modified price sale - priority 4
  'C1441', // Verify manual item addition - priority 4
  'C6468', // Verify mobile cash transaction - priority 4
  
  // Age Verification
  'C81',   // Verify invalid date error on age verification - priority 4
  'C4206', // Verify age verification dialog display - priority 4
  
  // Item Search & Management
  'C1433', // Verify item search by exact/similar name - priority 4
  'C1434', // Verify barcode scanning - priority 4
  'C4205', // Verify scanning item works on POS - priority 4
  'C4398', // Verify barcode scanner for non-existing item - priority 4
  'C4399', // Verify barcode scanner impact prevention - priority 4
  'C5963', // Verify Stock Code search field - priority 4
  'C5964', // Verify non-existing item search prevention - priority 4
  
  // Shortcut Operations
  'C1435', // Verify shortcut menu item selection - priority 4
  'C5969', // Verify shortcut menu bar access - priority 4
  'C5970', // Verify shortcut button functionality - priority 4
  'C5972', // Verify same hotkey qty increase - priority 4
  'C5973', // Verify category button on shortcut menu - priority 4
  'C5974', // Verify category item count display - priority 4
  
  // Order Management
  'C1423', // Verify sale suspension - priority 4
  'C1424', // Verify order recall and completion - priority 4
  'C1425', // Verify suspended order status review - priority 4
  'C1426', // Verify suspended sale deletion - priority 4
  'C1443', // Verify sale cancellation - priority 4
  'C1444', // Verify sale void - priority 4
  'C6471', // Verify mobile transaction void - priority 4
  'C6472', // Verify mobile sale suspension - priority 4
  'C6473', // Verify mobile order recall - priority 4
  
  // Customer Screen Integration
  'C3997', // Verify customer details don't stop card payment - priority 4
  'C4030', // Verify sale logged with customer after payment cancel - priority 4
  'C4570', // Verify item details on customer screen - priority 4
  'C4571', // Verify Customer Screen auto-launch - priority 4
  'C4572', // Verify customized Customer Screen - priority 4
  'C4573', // Verify Customer Screen dynamic updates - priority 4
  
  // Offline Operations
  'C3305', // Verify sales in offline mode - priority 4
  'C3379', // Verify login/logout with slow 3g/offline - priority 4
  'C4034', // Verify Electron app online status - priority 4
  'C4180', // Verify offline sales sync - priority 4
  'C4450', // Verify offline to online transition - priority 4
  'C4451', // Verify internet warning message - priority 4
  
  // Special Item Features
  'C293',  // Verify promotion application - priority 4
  'C1158', // Verify disabled promotion prevention - priority 4
  'C4148', // Verify NCA exclusion by category - priority 4
  'C4456', // Verify required points validation - priority 4
  
  // Lottery & Gaming Operations
  'C4144', // Verify Lotto Sale - priority 4
  'C4145', // Verify Online Lottery - priority 4
  'C4146', // Verify Lotto Payout - priority 4
  'C4147', // Verify Online Payout - priority 4
  
  // Payout Operations
  'C1442', // Verify payout addition - priority 4
  
  // Task Management
  'C2486', // Verify task notifications visibility - priority 4
  'C2487', // Verify task update from POS - priority 4
  'C6120', // Verify Tasks page navigation - priority 4
  'C6121', // Verify Import CSV button visibility - priority 4
  'C6122', // Verify Export CSV button visibility - priority 4
  'C6125', // Verify Import CSV file validation - priority 4
  'C6126', // Verify valid CSV import - priority 4
  'C6128', // Verify Export CSV accuracy - priority 4
  'C6129', // Verify Add Tasks button - priority 4
  'C6131', // Verify mandatory field validation - priority 4
  'C6132', // Verify task details addition - priority 4
  'C6134', // Verify task search functionality - priority 4
  'C6135', // Verify task pagination - priority 4
  'C6136', // Verify task edit icon - priority 4
  'C6137', // Verify Task List History icon - priority 4
  'C6138', // Verify task Delete icon - priority 4
  'C6139', // Verify task sorting functionality - priority 4
  'C6140', // Verify task Refresh button - priority 4
  
  // Clock In/Out
  'C2491', // Verify clock in/out functionality - priority 4
  
  // Label Printing
  'C4453', // Verify label printing from POS - priority 4
  
  // Receipt Management
  'C1427', // Verify receipt printing for all transaction types - priority 4
  'C4454', // Verify receipt printing after checkout - priority 4
  
  // Full Screen & UI Controls
  'C2488', // Verify full screen button functionality - priority 4
  'C2489'  // Verify customer screen access - priority 4
];

// UI/UX Tests (31 tests) - PRIORITY 7 [EXCLUDED CATEGORY]
/* EXCLUDED CATEGORY - UI/UX TESTS
export const UI_UX_TESTS = [
  // Login Page UI Components
  'C2055', // Verify username field visibility - priority 7
  'C2056', // Verify password field visibility - priority 7
  'C2057', // Verify login button visibility - priority 7
  'C2058', // Verify username field editability - priority 7
  'C2059', // Verify password field editability - priority 7
  'C2060', // Verify login button clickability - priority 7
  'C2061', // Verify login button label - priority 7
  'C2072', // Verify login restriction without both fields - priority 7
  'C2074', // Verify login prevention with username only - priority 7
  'C2075', // Verify login prevention with password only - priority 7
  'C2081', // Verify trailing space trimming - priority 7
  'C2083', // Verify consistent layout across browsers - priority 7
  
  // POS Sales Interface
  'C5984', // Verify POS Sales page availability - priority 7
  'C5986', // Verify POS Sales status update - priority 7
  'C5989', // Verify POS Sales search functionality - priority 7
  'C5993', // Verify POS Sales Refresh button - priority 7
  'C5999', // Verify POS Sales Home button - priority 7
  'C6007', // Verify POS Sales checkbox functionality - priority 7
  'C6008', // Verify POS Sales bulk deletion - priority 7
  'C6010', // Verify Advanced Search dialog visibility - priority 7
  'C6011', // Verify Clear search button - priority 7
  'C6012', // Verify Ref Number search functionality - priority 7
  'C6013', // Verify POS Sales pagination - priority 7
  'C6014', // Verify POS Sales sorting icons - priority 7
  
  // Admin UI Consistency
  'C6170', // Verify no UI element overlap - priority 7
  
  // Item Management UI
  'C3999', // Verify item defaults to Details tab - priority 7
  'C4031', // Verify Receive Items dialog disabled during search - priority 7
  'C4033', // Verify Edit button in Categories page - priority 7
  
  // Device Integration UI
  'C8140', // Verify Today's Takings non-clickable when 0 - priority 7
  'C8141', // Verify Today's Takings clickable when > 0 - priority 7
  'C8142', // Verify All filter in Online Devices - priority 7
  'C8143', // Verify online devices in filter dropdown - priority 7
  'C8144', // Verify text field input in Online Devices - priority 7
  'C8145', // Verify send button in Online Devices - priority 7
  'C8146'  // Verify Reset Terminal button - priority 7
];
*/

// ============================================================================
// API TESTS (45 total) - Backend integration testing - PRIORITY 3 [EXCLUDED CATEGORY]
// ============================================================================

/* EXCLUDED CATEGORY - API TESTS
export const API_TESTS = [
  // Authentication & Authorization APIs
  'API001', // POST /api/auth/login - User authentication - priority 3
  'API002', // POST /api/auth/logout - User logout - priority 3
  'API003', // POST /api/auth/refresh - Token refresh - priority 3
  'API004', // GET /api/auth/validate - Token validation - priority 3
  'API005', // POST /api/auth/forgot-password - Password reset request - priority 3
  'API006', // POST /api/auth/reset-password - Password reset - priority 3
  'API007', // GET /api/auth/permissions - User permissions check - priority 3
  'API008', // POST /api/auth/change-password - Password change - priority 3

  // Sales & Transactions APIs
  'API009', // POST /api/sales/create - Create new sale - priority 3
  'API010', // GET /api/sales/{id} - Get sale details - priority 3
  'API011', // PUT /api/sales/{id} - Update sale - priority 3
  'API012', // DELETE /api/sales/{id} - Delete sale - priority 3
  'API013', // POST /api/sales/{id}/void - Void sale - priority 3
  'API014', // POST /api/sales/{id}/refund - Process refund - priority 3
  'API015', // GET /api/sales/list - List sales with filters - priority 3
  'API016', // POST /api/sales/suspend - Suspend sale - priority 3
  'API017', // POST /api/sales/recall - Recall suspended sale - priority 3

  // Inventory APIs
  'API018', // GET /api/inventory/items - List items - priority 3
  'API019', // POST /api/inventory/items - Create item - priority 3
  'API020', // GET /api/inventory/items/{id} - Get item details - priority 3
  'API021', // PUT /api/inventory/items/{id} - Update item - priority 3
  'API022', // DELETE /api/inventory/items/{id} - Delete item - priority 3
  'API023', // POST /api/inventory/items/search - Search items - priority 3
  'API024', // GET /api/inventory/stock - Get stock levels - priority 3
  'API025', // PUT /api/inventory/stock - Update stock levels - priority 3
  'API026', // POST /api/inventory/receive - Receive inventory - priority 3
  'API027', // GET /api/inventory/orders - List orders - priority 3
  'API028', // POST /api/inventory/orders - Create order - priority 3

  // Customer APIs
  'API029', // GET /api/customers - List customers - priority 3
  'API030', // POST /api/customers - Create customer - priority 3
  'API031', // GET /api/customers/{id} - Get customer details - priority 3
  'API032', // PUT /api/customers/{id} - Update customer - priority 3
  'API033', // DELETE /api/customers/{id} - Delete customer - priority 3
  'API034', // POST /api/customers/search - Search customers - priority 3
  'API035', // GET /api/customers/{id}/history - Customer transaction history - priority 3
  'API036', // POST /api/customers/{id}/points - Update loyalty points - priority 3

  // Payment Processing APIs
  'API037', // POST /api/payments/process - Process payment - priority 3
  'API038', // POST /api/payments/refund - Process refund - priority 3
  'API039', // GET /api/payments/{id} - Get payment details - priority 3
  'API040', // POST /api/payments/ebt-balance - Check EBT balance - priority 3
  'API041', // POST /api/payments/gift-card-balance - Check gift card balance - priority 3
  'API042', // POST /api/payments/gift-card-activate - Activate gift card - priority 3

  // Reporting APIs
  'API043', // GET /api/reports/sales - Sales reports - priority 3
  'API044', // GET /api/reports/inventory - Inventory reports - priority 3
  'API045', // GET /api/reports/customers - Customer reports - priority 3
];
*/

// ============================================================================
// PERFORMANCE TESTS (38 total) - Load and stress testing - PRIORITY 5 [EXCLUDED CATEGORY]
// ============================================================================

/* EXCLUDED CATEGORY - PERFORMANCE TESTS
export const PERFORMANCE_TESTS = [
  // Load Testing
  'PERF001', // Concurrent user login (10, 50, 100 users) - priority 5
  'PERF002', // Multiple simultaneous sales transactions - priority 5
  'PERF003', // Bulk inventory operations (1000+ items) - priority 5
  'PERF004', // Large customer database queries (10,000+ customers) - priority 5
  'PERF005', // Concurrent payment processing - priority 5
  'PERF006', // Multiple admin users accessing dashboard - priority 5
  'PERF007', // Heavy reporting operations - priority 5
  'PERF008', // Database connection pool stress test - priority 5

  // Response Time Testing
  'PERF009', // Login response time < 2 seconds - priority 5
  'PERF010', // Item search response time < 1 second - priority 5
  'PERF011', // Sale completion response time < 3 seconds - priority 5
  'PERF012', // Payment processing response time < 5 seconds - priority 5
  'PERF013', // Report generation response time < 10 seconds - priority 5
  'PERF014', // Inventory update response time < 2 seconds - priority 5
  'PERF015', // Customer search response time < 1 second - priority 5

  // Memory Usage Testing
  'PERF016', // Memory usage during peak operations - priority 5
  'PERF017', // Memory leak detection during extended use - priority 5
  'PERF018', // Browser memory usage optimization - priority 5
  'PERF019', // Database memory consumption - priority 5

  // Network Performance
  'PERF020', // Slow network simulation (3G, 2G) - priority 5
  'PERF021', // Network latency impact on operations - priority 5
  'PERF022', // Offline mode performance - priority 5
  'PERF023', // Data synchronization performance - priority 5
  'PERF024', // API response times under load - priority 5

  // Database Performance
  'PERF025', // Database query optimization - priority 5
  'PERF026', // Large dataset handling (100K+ records) - priority 5
  'PERF027', // Database backup/restore performance - priority 5
  'PERF028', // Transaction rollback performance - priority 5

  // UI Performance
  'PERF029', // Page load times < 3 seconds - priority 5
  'PERF030', // UI responsiveness during operations - priority 5
  'PERF031', // Print operation performance - priority 5
  'PERF032', // Receipt generation speed - priority 5

  // Mobile Performance
  'PERF033', // Mobile app performance on low-end devices - priority 5
  'PERF034', // Mobile network performance - priority 5
  'PERF035', // Mobile battery usage optimization - priority 5

  // Integration Performance
  'PERF036', // Payment processor integration performance - priority 5
  'PERF037', // Printer integration performance - priority 5
  'PERF038', // Scanner integration performance - priority 5
];
*/

// ============================================================================
// SECURITY TESTS (52 total) - Security validation - PRIORITY 6 [EXCLUDED CATEGORY]
// ============================================================================

/* EXCLUDED CATEGORY - SECURITY TESTS
export const SECURITY_TESTS = [
  // Authentication Security
  'SEC001', // SQL injection in login form - priority 6
  'SEC002', // XSS in login form - priority 6
  'SEC003', // Brute force attack prevention - priority 6
  'SEC004', // Account lockout after failed attempts - priority 6
  'SEC005', // Password complexity requirements - priority 6
  'SEC006', // Session timeout validation - priority 6
  'SEC007', // Token expiration handling - priority 6
  'SEC008', // Concurrent session management - priority 6

  // Authorization Security
  'SEC009', // Role-based access control (RBAC) - priority 6
  'SEC010', // Permission escalation prevention - priority 6
  'SEC011', // Unauthorized access to admin functions - priority 6
  'SEC012', // API endpoint authorization - priority 6
  'SEC013', // Data access based on user role - priority 6
  'SEC014', // Function-level permission checks - priority 6

  // Data Protection
  'SEC015', // Credit card data encryption - priority 6
  'SEC016', // Customer PII protection - priority 6
  'SEC017', // Database encryption at rest - priority 6
  'SEC018', // Data transmission encryption (HTTPS) - priority 6
  'SEC019', // Audit trail for sensitive operations - priority 6
  'SEC020', // Data backup security - priority 6

  // Input Validation
  'SEC021', // SQL injection in search fields - priority 6
  'SEC022', // XSS in customer input fields - priority 6
  'SEC023', // File upload security - priority 6
  'SEC024', // Input sanitization - priority 6
  'SEC025', // Buffer overflow prevention - priority 6

  // API Security
  'SEC026', // API authentication token validation - priority 6
  'SEC027', // API rate limiting - priority 6
  'SEC028', // API input validation - priority 6
  'SEC029', // API response data filtering - priority 6
  'SEC030', // CORS policy validation - priority 6

  // Payment Security
  'SEC031', // PCI DSS compliance validation - priority 6
  'SEC032', // Payment data tokenization - priority 6
  'SEC033', // Secure payment processing - priority 6
  'SEC034', // Payment gateway security - priority 6
  'SEC035', // EBT card security - priority 6

  // Network Security
  'SEC036', // HTTPS enforcement - priority 6
  'SEC037', // SSL/TLS certificate validation - priority 6
  'SEC038', // Network traffic encryption - priority 6
  'SEC039', // Firewall configuration - priority 6
  'SEC040', // VPN access security - priority 6

  // Application Security
  'SEC041', // CSRF protection - priority 6
  'SEC042', // Clickjacking prevention - priority 6
  'SEC043', // Content Security Policy (CSP) - priority 6
  'SEC044', // Secure headers implementation - priority 6
  'SEC045', // Error message security - priority 6

  // Mobile Security
  'SEC046', // Mobile app data encryption - priority 6
  'SEC047', // Mobile device authentication - priority 6
  'SEC048', // Mobile app integrity checks - priority 6
  'SEC049', // Mobile network security - priority 6

  // Compliance Security
  'SEC050', // SOX compliance for financial data - priority 6
  'SEC051', // HIPAA compliance for customer data - priority 6
  'SEC052', // State-specific alcohol sales compliance - priority 6
];
*/

// ============================================================================
// ACCESSIBILITY TESTS (25 total) - WCAG compliance testing - PRIORITY 7 [EXCLUDED CATEGORY]
// ============================================================================

/* EXCLUDED CATEGORY - ACCESSIBILITY TESTS
export const ACCESSIBILITY_TESTS = [
  'A11Y001', // Keyboard navigation support - priority 7
  'A11Y002', // Screen reader compatibility - priority 7
  'A11Y003', // Color contrast compliance - priority 7
  'A11Y004', // Alt text for images - priority 7
  'A11Y005', // Form labels and associations - priority 7
  'A11Y006', // Focus indicators - priority 7
  'A11Y007', // ARIA labels and roles - priority 7
  'A11Y008', // Heading structure - priority 7
  'A11Y009', // Link text clarity - priority 7
  'A11Y010', // Error message accessibility - priority 7
  'A11Y011', // Success message accessibility - priority 7
  'A11Y012', // Modal dialog accessibility - priority 7
  'A11Y013', // Table accessibility - priority 7
  'A11Y014', // Button accessibility - priority 7
  'A11Y015', // Input field accessibility - priority 7
  'A11Y016', // Dropdown accessibility - priority 7
  'A11Y017', // Checkbox accessibility - priority 7
  'A11Y018', // Radio button accessibility - priority 7
  'A11Y019', // Tab navigation - priority 7
  'A11Y020', // Skip navigation links - priority 7
  'A11Y021', // Font size scalability - priority 7
  'A11Y022', // High contrast mode support - priority 7
  'A11Y023', // Voice control compatibility - priority 7
  'A11Y024', // Switch device compatibility - priority 7
  'A11Y025', // Cognitive accessibility features - priority 7
];
*/

// ============================================================================
// COMPATIBILITY TESTS (30 total) - Cross-browser and device testing - PRIORITY 7 [EXCLUDED CATEGORY]
// ============================================================================

/* EXCLUDED CATEGORY - COMPATIBILITY TESTS
export const COMPATIBILITY_TESTS = [
  // Browser Compatibility
  'COMP001', // Chrome (latest 3 versions) - priority 7
  'COMP002', // Firefox (latest 3 versions) - priority 7
  'COMP003', // Safari (latest 3 versions) - priority 7
  'COMP004', // Edge (latest 3 versions) - priority 7
  'COMP005', // Internet Explorer 11 (if required) - priority 7

  // Mobile Browser Compatibility
  'COMP006', // iOS Safari - priority 7
  'COMP007', // Android Chrome - priority 7
  'COMP008', // Samsung Internet - priority 7
  'COMP009', // Mobile Firefox - priority 7

  // Device Compatibility
  'COMP010', // Desktop (Windows, Mac, Linux) - priority 7
  'COMP011', // Tablet (iPad, Android tablets) - priority 7
  'COMP012', // Mobile phones (iOS, Android) - priority 7
  'COMP013', // Touch screen devices - priority 7
  'COMP014', // High DPI displays - priority 7

  // Screen Resolution Testing
  'COMP015', // 1920x1080 (Full HD) - priority 7
  'COMP016', // 1366x768 (HD) - priority 7
  'COMP017', // 1024x768 (Tablet) - priority 7
  'COMP018', // 375x667 (iPhone) - priority 7
  'COMP019', // 360x640 (Android) - priority 7

  // Operating System Compatibility
  'COMP020', // Windows 10/11 - priority 7
  'COMP021', // macOS (latest 3 versions) - priority 7
  'COMP022', // Ubuntu/Linux - priority 7
  'COMP023', // iOS (latest 3 versions) - priority 7
  'COMP024', // Android (latest 3 versions) - priority 7

  // Hardware Compatibility
  'COMP025', // Different printer models - priority 7
  'COMP026', // Barcode scanner compatibility - priority 7
  'COMP027', // Cash drawer compatibility - priority 7
  'COMP028', // Receipt printer compatibility - priority 7
  'COMP029', // Payment terminal compatibility - priority 7
  'COMP030', // Network adapter compatibility - priority 7
];
*/

// ============================================================================
// INTEGRATION TESTS (20 total) - Third-party system integration - PRIORITY 6 [EXCLUDED CATEGORY]
// ============================================================================

/* EXCLUDED CATEGORY - INTEGRATION TESTS
export const INTEGRATION_TESTS = [
  // Payment Processor Integration
  'INT001', // PayFac payment processing - priority 6
  'INT002', // PAX terminal integration - priority 6
  'INT003', // Tripos terminal integration - priority 6
  'INT004', // Datacap payment processing - priority 6
  'INT005', // Side card payment processing - priority 6

  // Hardware Integration
  'INT006', // Receipt printer integration - priority 6
  'INT007', // Barcode scanner integration - priority 6
  'INT008', // Cash drawer integration - priority 6
  'INT009', // Customer display integration - priority 6
  'INT010', // Weight scale integration - priority 6

  // External Service Integration
  'INT011', // EBT system integration - priority 6
  'INT012', // Gift card system integration - priority 6
  'INT013', // Tax calculation service - priority 6
  'INT014', // Inventory management system - priority 6
  'INT015', // Customer loyalty system - priority 6

  // Data Integration
  'INT016', // Database synchronization - priority 6
  'INT017', // Backup system integration - priority 6
  'INT018', // Reporting system integration - priority 6
  'INT019', // Email notification system - priority 6
  'INT020', // SMS notification system - priority 6
];
*/

// ============================================================================
// USABILITY TESTS (15 total) - User experience testing - PRIORITY 7 [EXCLUDED CATEGORY]
// ============================================================================

/* EXCLUDED CATEGORY - USABILITY TESTS
export const USABILITY_TESTS = [
  'USAB001', // Intuitive navigation flow - priority 7
  'USAB002', // Clear error messages - priority 7
  'USAB003', // Help system accessibility - priority 7
  'USAB004', // Keyboard shortcuts efficiency - priority 7
  'USAB005', // Touch screen usability - priority 7
  'USAB006', // Form completion ease - priority 7
  'USAB007', // Search functionality usability - priority 7
  'USAB008', // Checkout process flow - priority 7
  'USAB009', // Receipt customization - priority 7
  'USAB010', // Multi-language support - priority 7
  'USAB011', // Accessibility features usability - priority 7
  'USAB012', // Mobile responsiveness - priority 7
  'USAB013', // Loading state indicators - priority 7
  'USAB014', // Confirmation dialogs - priority 7
  'USAB015', // Undo/redo functionality - priority 7
];
*/

// ============================================================================
// SUMMARY STATISTICS
// ============================================================================

export const TEST_SUMMARY = {
  total: 676, // Updated total - EXCLUDED categories and UI validation tests
  smoke: {
    automated: 59, // Current active automated tests
    todo: 2,       // Current active TODO tests
    total: 61,     // Total smoke tests
    percentage: 9.0
  },
  regression: {
    automated: 9,   // Current active automated regression
    todo: 606,      // All payment, tax, reporting, admin, customer, inventory, mobile, POS tests
    total: 615,     // Total regression tests
    percentage: 91.0
  },
  /* EXCLUDED CATEGORIES - COMMENTED OUT
  api: {
    automated: 0,
    todo: 45,
    total: 45,
    percentage: 4.8
  },
  performance: {
    automated: 0,
    todo: 38,
    total: 38,
    percentage: 4.0
  },
  security: {
    automated: 0,
    todo: 52,
    total: 52,
    percentage: 5.5
  },
  accessibility: {
    automated: 0,
    todo: 25,
    total: 25,
    percentage: 2.6
  },
  compatibility: {
    automated: 0,
    todo: 30,
    total: 30,
    percentage: 3.2
  },
  integration: {
    automated: 0,
    todo: 20,
    total: 20,
    percentage: 2.1
  },
  usability: {
    automated: 0,
    todo: 15,
    total: 15,
    percentage: 1.6
  },
  ui_ux: {
    automated: 0,
    todo: 31,
    total: 31,
    percentage: X.X
  }
  */
};

// ============================================================================ 
// SUMMARY BASED ON CLEANED CSV DATA
// ============================================================================

export const CSV_BASED_SUMMARY = {
  totalTestsInCSV: 611,
  regressionTestsIdentified: 615,
  currentlyAutomated: 9,
  remainingToAutomate: 606,
  coveragePercentage: 1.5,
  
  topCategories: [
    { name: 'Reporting', count: 109, priority: 'High' },
    { name: 'Inventory Management', count: 108, priority: 'Medium' },
    { name: 'Payment Processing', count: 94, priority: 'High' },
    { name: 'Admin Portal', count: 78, priority: 'High' },
    { name: 'POS Operations', count: 76, priority: 'Medium' }
  ]
};

// ============================================================================
// PRIORITY RECOMMENDATIONS BASED ON CSV ANALYSIS
// ============================================================================

export const PRIORITY_RECOMMENDATIONS = {
  high: [
    'Complete remaining 2 smoke tests for 100% core functionality coverage',
    'Implement payment processing regression tests (94 tests available)',
    'Add tax calculation regression tests (67 tests available)',
    'Implement reporting regression tests (109 tests available)',
    'Add admin portal regression tests (78 tests available)',
    'Implement customer management regression tests (53 tests available)'
  ],
  medium: [
    'Add inventory management regression tests (108 tests available)',
    'Implement POS operations regression tests (76 tests available)',
    'Add mobile testing coverage (21 tests available)',
    'UI/UX regression tests (31 tests) - EXCLUDED CATEGORY',
    'Add performance testing for critical user flows',
    'Implement accessibility testing for WCAG compliance',
    'Add cross-browser compatibility testing',
    'Implement TABC compliance testing for Texas regulations'
  ],
  low: [
    'Add comprehensive API testing for all endpoints (45 tests)',
    'Implement load and stress testing (38 tests)',
    'Add advanced security testing (52 tests)',
    'Add usability testing for user experience optimization (15 tests)',
    'Implement integration testing for third-party systems (20 tests)',
    'Add comprehensive compatibility testing across devices (30 tests)',
    'Implement advanced performance monitoring'
  ]
};
