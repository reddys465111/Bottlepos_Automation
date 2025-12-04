# BottlePOS System Overview

This document provides a comprehensive overview of the BottlePOS application system, including all features, workflows, and capabilities. This is a **living document** that grows and evolves as new tests are automated and system coverage expands.

## 📊 **Document Status**
- **Last Updated**: October 21, 2025 - Updated with comprehensive Playwright test coverage
- **Test Coverage**: 58 automated test files covering all major system workflows
- **System Version**: v3.15
- **Automation Framework**: Playwright v1.45.1

## 🎯 **How This Document Grows**
This overview expands automatically as new areas are tested:
- ✅ **New Features Tested** → Added to system capabilities
- ✅ **New Workflows Automated** → Added to user journey maps
- ✅ **New Components Discovered** → Added to technical reference
- ✅ **Edge Cases Covered** → Added to scenario documentation

## 🎯 **Application Overview**

BottlePOS is a comprehensive Point of Sale system designed for retail operations, particularly for businesses handling age-restricted items like alcohol and tobacco. The system operates across multiple devices (Desktop/Mobile) and provides both POS and Administrative functionality.

---

## 🔐 **AUTHENTICATION FLOWS**

### **POS Login**
```
🎯 Entry Point: http://localhost:9000
├── Username Field Entry
├── Password Field Entry  
├── Login Button
└── Authentication Validation
    ├── ✅ Valid Credentials → Main POS Interface
    └── ❌ Invalid Credentials → Error Dialog
```

### **Admin Login**  
```
🎯 Entry Point: http://localhost:9000/admin
├── Admin Username Field
├── Admin Password Field
├── Admin Login Button
└── Authentication Validation
    ├── ✅ Valid Admin Credentials → Admin Dashboard
    └── ❌ Invalid Credentials → Error Dialog
```

---

## 🖥️ **POS SECTION - MAIN USER WORKFLOWS**

### **📦 REGISTER OPERATIONS**

#### **Item Management**
```
Register Page Actions:
├── 🔍 Item Search & Addition
│   ├── Manual Item Addition
│   │   ├── Add Item Button → Manual Price Entry
│   │   └── Price Editing for Manual Items
│   ├── Barcode Entry
│   │   ├── Stock Code Field → Enter Barcode → Add Item
│   │   └── Age Verification (if required)
│   │       ├── DOB Entry Dialog (MM/DD/YYYY)
│   │       ├── Yes/No Confirmation
│   │       └── Age Validation Logic
│   ├── Item Search
│   │   ├── Stock Search Field → Search by Name
│   │   ├── AutoComplete Selection
│   │   └── Add to Cart
│   └── Shortcuts Panel
│       ├── Open Shortcuts
│       ├── Browse Product Categories
│       └── Quick Item Selection
│
├── 🛒 Cart Management
│   ├── View Item Lines
│   ├── Edit Item Quantities (Including Negative for Refunds)
│   ├── Edit Item Prices
│   ├── Remove Items
│   └── View Totals (Subtotal, Tax, Total)
│
└── 💰 Pricing & Totals
    ├── Subtotal Calculation
    ├── Tax Calculation
    ├── Total Items Count
    └── Grand Total Display
```

#### **Customer Management**
```
Customer Operations:
├── 📱 Customer Lookup
│   ├── Mobile Number Entry
│   ├── Customer Search
│   └── Customer Selection
├── 👤 New Customer Creation
│   ├── Customer Not Found Dialog
│   ├── Create New Customer Button
│   └── Customer Details Form:
│       ├── Name Entry
│       ├── Mobile Number
│       ├── Email Address
│       ├── Date of Birth
│       ├── Address
│       ├── Zipcode
│       └── Save Customer
├── 🎁 Loyalty Points
│   ├── Points Balance Display
│   ├── Points-Required Items
│   ├── Insufficient Points Dialog
│   └── Points Usage/Redemption
└── 📋 Customer Information Display
    ├── Customer Details Dialog
    └── Customer History Access
```

#### **Discounts & Promotions**
```
Discount System:
├── 💲 Dollar Discounts
│   ├── Select Dollar Discount Option
│   ├── Enter Discount Amount
│   ├── Apply to Specific Items
│   └── Validate Discount Applied
├── 📊 Percentage Discounts  
│   ├── Select Percentage Option
│   ├── Enter Percentage Value
│   ├── Apply to Eligible Items
│   └── Calculate Discount Amount
├── 🎫 Coupon Processing
│   ├── Dollar Amount Coupons
│   ├── Percentage Coupons
│   └── Coupon Validation
└── 🚫 Discount Restrictions
    ├── Non-Discountable Items
    └── Discount Policies
```

### **💳 PAYMENT PROCESSING**

#### **Cash Payments**
```
Cash Payment Flow:
├── 💰 Pay Button → Checkout Dialog
├── 💵 Cash Payment Options
│   ├── Exact Change Buttons
│   ├── Quick Amount Buttons
│   └── Custom Amount Entry
├── 🧮 Change Calculation
│   ├── Amount Tendered
│   ├── Change Due Display
│   └── Change Verification
└── ✅ Transaction Completion
    ├── Checkout Complete Dialog
    ├── Print Receipt Option (Yes/No)
    └── Transaction Finalization
```

#### **Card Payments (PayFac)**
```
Card Payment Flow:
├── 💳 Card Payment Selection
├── 🔄 Payment Processor Integration
│   ├── PayFac Terminal Communication
│   ├── Payment Amount Transmission
│   └── Terminal Processing
├── ✅ Payment Approval
│   ├── Approved Transaction Dialog
│   ├── Payment Confirmation
│   └── Receipt Processing
├── 🔄 Post-Transaction Processing [ENHANCED]
│   ├── Cart State Reset
│   ├── Register Clearing
│   ├── Total Reset to $0.00
│   └── Ready State for Next Customer
└── ❌ Payment Decline Handling
    ├── Error Dialog Display
    └── Alternative Payment Options
```

### **📊 SALES MANAGEMENT**

#### **Sales History & Tracking**
```
Sales Operations:
├── 📈 Sales Tab Navigation
├── 🔍 Transaction Filtering
│   ├── Filter by Status (Complete, Refunded, Void)
│   ├── Date Range Selection
│   └── Transaction Type Filter
├── 📋 Transaction List
│   ├── Transaction Details View
│   ├── Transaction History
│   └── Customer Information
└── 🔄 Transaction Actions
    ├── View Transaction Details
    ├── Reprint Receipts  
    ├── Process Refunds
    └── Void Transactions
```

#### **Refund Processing**
```
Refund Workflows:
├── 🔄 Direct Refund (Negative Quantity)
│   ├── Add Item with Negative Quantity (-1)
│   ├── Age Verification (if required)
│   ├── Process Cash Payment
│   └── Change Calculation
├── 📋 Refund from Sales History
│   ├── Select Completed Transaction
│   ├── View Transaction Details
│   ├── Click Refund Button
│   ├── Choose Refund Method (Cash/Card)
│   ├── Confirmation Dialog
│   └── Update Transaction Status
└── ✅ Refund Completion
    ├── Print Confirmation Option
    └── Transaction Status Update
```

### **⚙️ ADDITIONAL POS FEATURES**

#### **Session Management**
```
Session Operations:
├── 🔄 Suspend/Recall Sales
│   ├── Suspend Current Transaction
│   ├── Recall Suspended Sales
│   └── Resume Transaction
├── 🚫 Cancel Orders
│   ├── Cancel Current Transaction
│   ├── Confirmation Dialog
│   └── Clear Register
└── 🔓 User Logout
    ├── Logout Button
    ├── Logout Confirmation
    └── Return to Login Screen
```

#### **Reports & Analytics**
```
POS Reporting:
├── 📊 Daily Reports
│   ├── Day Report Generation
│   ├── Date Range Selection
│   └── Report Display/Print
├── 📈 Sales Analytics
│   ├── Transaction Summaries
│   ├── Item Performance
│   └── Revenue Tracking
└── 🖨️ Print Functions
    ├── Receipt Printing
    ├── Report Printing
    └── Print Confirmation Dialogs
```

---

## 🛠️ **ADMIN SECTION - ADMINISTRATIVE WORKFLOWS**

### **📈 DASHBOARD & MONITORING**

#### **Real-time Dashboard**
```
Dashboard Features:
├── 📊 Today's Takings
│   ├── Sales Summary Widget
│   ├── Refunds Tracking
│   ├── Transaction Count
│   └── Revenue Analytics
├── 📦 Inventory Alerts
│   ├── Low Stock Warnings
│   ├── Out of Stock Items
│   └── Inventory Notifications
├── 👥 Customer Metrics
│   ├── New Customers
│   ├── Loyalty Statistics
│   └── Customer Activity
└── 🔄 Real-time Updates
    ├── Live Sales Feed
    ├── Refresh Button
    └── Auto-refresh Functionality
```

### **📦 INVENTORY MANAGEMENT**

#### **Item Administration**
```
Item Management:
├── ➕ Add New Items
│   ├── Item Details Form:
│   │   ├── Item Name
│   │   ├── Shortcut Name
│   │   ├── Barcode Generation/Entry
│   │   ├── Price Setting
│   │   ├── Category Assignment
│   │   ├── Tax Configuration
│   │   ├── Supplier Assignment
│   │   ├── Age Verification Settings
│   │   └── Discount Policies
│   └── Save Item Configuration
├── ✏️ Edit Existing Items
│   ├── Search/Select Item
│   ├── Modify Item Properties
│   ├── Update Pricing
│   └── Save Changes
├── 🗑️ Delete Items
│   ├── Select Item for Deletion
│   ├── Confirmation Dialog
│   └── Remove from Catalog
└── 📋 Bulk Operations
    ├── Import Item Data
    ├── Export Item Catalog
    └── Batch Updates
```

#### **Category & Supplier Management**
```
Organization Features:
├── 📁 Category Management
│   ├── Create Product Categories
│   ├── Assign Items to Categories
│   ├── Category Hierarchy
│   └── Category Settings
├── 🏢 Supplier Administration
│   ├── Add New Suppliers
│   ├── Supplier Information
│   ├── Contact Details
│   ├── Purchase Order Management
│   └── Supplier Performance
└── 📊 Inventory Analytics
    ├── Stock Level Reports
    ├── Movement Tracking
    └── Reorder Alerts
```

### **👥 CUSTOMER ADMINISTRATION**

#### **Customer Management**
```
Customer Operations:
├── ➕ Add New Customers
│   ├── Customer Registration Form:
│   │   ├── Customer Name
│   │   ├── Mobile Number
│   │   ├── Email Address
│   │   ├── Date of Birth
│   │   ├── Address Information
│   │   ├── Zipcode
│   │   └── Initial Loyalty Points
│   └── Save Customer Profile
├── ✏️ Edit Customer Information
│   ├── Search/Select Customer
│   ├── Update Contact Details
│   ├── Modify Loyalty Points
│   └── Save Changes
├── 🎁 Loyalty Program Management
│   ├── Points Assignment
│   ├── Points Adjustment
│   ├── Loyalty Tier Management
│   └── Rewards Configuration
└── 📊 Customer Analytics
    ├── Purchase History
    ├── Customer Lifetime Value
    ├── Frequency Analysis
    └── Preference Tracking
```

### **📊 ADMINISTRATIVE REPORTING**

#### **Comprehensive Reports**
```
Report Generation:
├── 💰 Financial Reports
│   ├── Sales Reports
│   ├── Revenue Analysis
│   ├── Tax Reports
│   └── Profit Margins
├── 📦 Inventory Reports
│   ├── Stock Level Reports
│   ├── Movement Reports
│   ├── Variance Reports
│   └── Reorder Reports
├── 👥 Customer Reports
│   ├── Customer Analytics
│   ├── Loyalty Program Reports
│   ├── Demographics
│   └── Purchase Patterns
├── 👨‍💼 Employee Reports
│   ├── Staff Performance
│   ├── Clock In/Out Reports
│   ├── Sales by Employee
│   └── Productivity Metrics
└── 📈 Business Intelligence
    ├── Trend Analysis
    ├── Seasonal Reports
    ├── Comparative Analytics
    └── Performance Dashboards
```

### **💰 TAX MANAGEMENT**

#### **Tax Rules Administration**
```
Tax Rules Management:
├── ➕ Create Tax Rules
│   ├── Tax Rule Details Form:
│   │   ├── Rule Name Entry
│   │   ├── Price Inclusive/Exclusive Setting
│   │   ├── Multi-Mode Configuration (Single/Multiple)
│   │   ├── POS Tax Button Assignment
│   │   │   ├── Select Button (Button 1, Button 2, Button 3)
│   │   │   └── Button Color Configuration
│   │   └── Rule Validation
│   ├── Base Tax Configuration
│   │   ├── Add Base Tax Items
│   │   ├── Select Tax Items from Available List
│   │   ├── Remove Base Tax Items
│   │   └── Base Tax Table Management
│   ├── Location-Specific Tax Rules
│   │   ├── Add Location Rules
│   │   ├── Select Location (Inventory, etc.)
│   │   ├── Assign Tax Items to Locations
│   │   ├── Remove Location Rules
│   │   └── Location Tax Table Management
│   └── Save Tax Rule Configuration
├── ✏️ Edit Existing Tax Rules
│   ├── Search/Select Tax Rule
│   ├── Modify Rule Properties
│   ├── Update Base Tax Assignments
│   ├── Update Location Tax Rules
│   └── Save Changes
├── 🗑️ Delete Tax Rules
│   ├── Select Rule for Deletion
│   ├── Confirmation Dialog
│   └── Remove from System
└── 📋 Tax Rules Table
    ├── View All Tax Rules
    ├── Sort by ID, Name, Mode
    ├── Filter Rules
    └── Quick Actions (Edit/Delete)
```

#### **Tax Items Management**
```
Tax Items Administration:
├── ➕ Create Tax Items
│   ├── Tax Item Details Form:
│   │   ├── Tax Item Name
│   │   ├── Alternative Name
│   │   ├── Tax Type Selection
│   │   ├── Tax Value (Percentage)
│   │   └── Save Tax Item
├── ✏️ Edit Tax Items
│   ├── Search/Select Tax Item
│   ├── Modify Tax Properties
│   ├── Update Tax Values
│   └── Save Changes
├── 🗑️ Delete Tax Items
│   ├── Select Tax Item for Deletion
│   ├── Usage Validation (Check if used in rules)
│   ├── Confirmation Dialog
│   └── Remove from System
└── 📋 Tax Items Table
    ├── View All Tax Items
    ├── Tax Item Details Display
    ├── Usage Status Tracking
    └── Quick Actions (Edit/Delete)
```

#### **Tax Configuration Settings**
```
Tax System Configuration:
├── 🎯 Default Tax Settings
│   ├── Default Tax Rule Selection
│   ├── Tax Button Configuration
│   ├── Tax Button Enable/Disable
│   └── Custom Tax Labels
├── 💳 EBT Tax Configuration
│   ├── Default EBT Tax Selection
│   ├── EBT Tax Enable/Disable
│   └── EBT Tax Label Customization
├── 🏷️ Tax Button Management
│   ├── POS Tax Button 1 Configuration
│   ├── POS Tax Button 2 Configuration
│   ├── POS Tax Button 3 Configuration
│   └── Button Color Customization
└── 📊 Tax Reporting Integration
    ├── Tax Calculation Methods
    ├── Inclusive vs Exclusive Pricing
    ├── Multi-Mode Tax Application
    └── Location-Based Tax Rules
```

### **⚙️ SYSTEM CONFIGURATION**

#### **Settings Management**
```
Configuration Options:
├── 🏪 Store Settings
│   ├── Store Information
│   ├── Location Configuration
│   ├── Operating Hours
│   └── Contact Details
├── 💳 Payment Configuration
│   ├── PayFac Settings
│   ├── Payment Methods
│   ├── Processing Options
│   └── Terminal Setup
├── 🖨️ Device Configuration
│   ├── Receipt Printer Setup
│   ├── Cash Drawer Configuration
│   ├── Barcode Scanner Settings
│   └── Display Options
├── 👨‍💼 User Management
│   ├── Staff Administration
│   ├── Role Assignment
│   ├── Permission Configuration
│   └── Access Control
└── 🌐 System Integration
    ├── Web Store Settings
    ├── API Configuration
    ├── Third-party Integrations
    └── Backup Settings
```

---

## 📱 **MOBILE DEVICE WORKFLOWS**

### **Mobile-Optimized Interface**
```
Mobile Features:
├── 📱 Touch-Optimized UI
│   ├── Larger Touch Targets
│   ├── Swipe Gestures
│   ├── Mobile Navigation
│   └── Responsive Design
├── 🔄 All POS Functions Available
│   ├── Item Management
│   ├── Payment Processing
│   ├── Customer Management
│   └── Transaction Handling
├── 📶 Connectivity Management
│   ├── Offline Mode Support
│   ├── Data Synchronization
│   └── Connection Status
└── 🔋 Performance Optimization
    ├── Efficient Resource Usage
    ├── Fast Loading Times
    └── Battery Conservation
```

---

## 🚨 **ERROR HANDLING & DIALOGS**

### **System Dialogs**
```
Dialog Management:
├── ⚠️ Alert Dialogs
│   ├── System Alerts
│   ├── Validation Errors
│   ├── Warning Messages
│   └── Information Notices
├── ❌ Error Dialogs
│   ├── Login Errors
│   ├── Payment Failures
│   ├── System Errors
│   └── Connectivity Issues
├── ✅ Confirmation Dialogs
│   ├── Transaction Confirmations
│   ├── Delete Confirmations
│   ├── Logout Confirmations
│   └── Action Verifications
└── 🔧 Device Setup Dialogs
    ├── Initial Device Setup
    ├── PAX Terminal Configuration
    ├── Printer Setup
    └── Network Configuration
```

---

## 🎯 **SPECIALIZED WORKFLOWS**

### **Age Verification Process**
```
Age-Restricted Items:
├── 🍺 Alcohol Products (CROWN, JACK, BUDLIGHT)
├── 🚬 Tobacco Products  
├── 🎫 Age Verification Items
└── Verification Flow:
    ├── Item Addition Trigger
    ├── Age Verification Dialog
    ├── DOB Entry (MM/DD/YYYY)
    ├── Age Calculation
    ├── Compliance Check
    └── Approval/Rejection
```

### **Loyalty & Points System**
```
Loyalty Program:
├── 🎁 Points-Required Items
├── 👤 Customer Points Balance
├── 💳 Points Redemption
├── ⚠️ Insufficient Points Handling
└── 📊 Points Tracking & Analytics
```

### **Multi-Payment & Complex Transactions**
```
Advanced Transactions:
├── 🔄 Split Payments
├── 💰 Partial Payments
├── 🎫 Coupon Combinations
├── 💸 Mixed Payment Methods
└── 🔄 Transaction Modifications
```

---

## 🏷️ **USER ROLES & PERMISSIONS**

### **Role-Based Access**
```
User Hierarchy:
├── 👑 Admin Users
│   ├── Full System Access
│   ├── Configuration Rights
│   ├── User Management
│   └── Report Access
├── 👨‍💼 Manager Users
│   ├── POS Operations
│   ├── Limited Admin Functions
│   ├── Staff Oversight
│   └── Operational Reports
├── 💰 Cashier Users
│   ├── POS Operations Only
│   ├── Transaction Processing
│   ├── Customer Service
│   └── Basic Reporting
└── 🔒 Restricted Users
    ├── Limited Functions
    ├── Supervised Operations
    └── Basic Access Only
```

---

## 📊 **PERFORMANCE & ANALYTICS**

### **Key Performance Indicators**
```
Business Metrics:
├── 💰 Revenue Tracking
├── 📈 Sales Volume
├── 👥 Customer Acquisition
├── 🔄 Transaction Frequency
├── 📦 Inventory Turnover
├── 💳 Payment Method Usage
├── ⏱️ Transaction Speed
└── 🎯 Goal Achievement
```

---

## 🛡️ **SECURITY & COMPLIANCE**

### **Security Features**
```
Security Measures:
├── 🔐 User Authentication
├── 🔒 Role-Based Permissions
├── 📝 Audit Trails
├── 💳 PCI Compliance
├── 📊 Transaction Logging
├── 🔄 Data Backup
└── 🛡️ Fraud Prevention
```

---

## 🎯 **TESTING COVERAGE**

### **Playwright Test Framework Overview**
```
Test Framework Structure:
├── 📁 bottlepos_webautomation/
│   ├── 📁 tests/
│   │   ├── 📁 desktop/
│   │   │   ├── 📁 smoke/ - Critical functionality tests
│   │   │   │   ├── 📁 POS/ - Point of Sale smoke tests
│   │   │   │   └── 📁 ADMIN/ - Administrative smoke tests
│   │   │   └── 📁 regression/ - Comprehensive coverage tests
│   │   │       ├── 📁 POS/ - Point of Sale regression tests
│   │   │       ├── 📁 ADMIN/ - Administrative regression tests
│   │   │       └── 📁 uncategorized/ - Miscellaneous tests
│   │   └── 📁 mobile/
│   │       ├── 📁 smoke/ - Mobile critical tests
│   │       └── 📁 regression/ - Mobile comprehensive tests
│   ├── 📁 src/ - Test utilities and helpers
│   ├── 📁 context/ - Documentation and context files
│   └── 📄 playwright.config.ts - Test configuration
```

### **Test Categories & Organization**
```
Test Organization:
├── 💨 Smoke Tests (22 files) - Critical functionality validation
│   ├── 🖥️ Desktop POS Tests (22 files)
│   │   ├── Authentication & Login
│   │   ├── Cash Operations (Alerts, Discounts, Payments, Refunds)
│   │   ├── Customer Management
│   │   ├── Item Search & Validation
│   │   ├── Payment Processing (Cash, PayFac)
│   │   ├── Promotions & Sales
│   │   ├── Reports & Analytics
│   │   ├── Sales Suspension & Recall
│   │   └── Tax Processing
│   └── 🖥️ Desktop Admin Tests (5 files)
│       ├── Admin Authentication
│       ├── Dashboard Operations
│       ├── Item Management
│       ├── Customer Administration
│       └── Supplier Management
├── 🔄 Regression Tests (31 files) - Comprehensive system coverage
│   ├── 🖥️ Desktop POS Tests (14 files)
│   │   ├── Age Verification Workflows
│   │   ├── Bottle Deposit Processing
│   │   ├── Cash Operations (Offline, Restricted Users)
│   │   ├── Discount & Promotion Management
│   │   ├── Dual Pricing (NCA)
│   │   ├── Item Restrictions
│   │   ├── Mobile Integration
│   │   ├── Payment Processing
│   │   ├── POS EBT Operations
│   │   ├── POS Item Management
│   │   ├── Tax Items & Reports
│   │   └── Tax Restrictions
│   ├── 🖥️ Desktop Admin Tests (8 files)
│   │   ├── Additional Fees Management
│   │   ├── Bottle Deposit Administration
│   │   ├── Dual Pricing (NCA) Configuration
│   │   ├── General Settings
│   │   ├── Item Administration
│   │   ├── Task Management
│   │   ├── Tax Items Administration
│   │   └── Tax Rules Management
│   └── 📱 Mobile Tests - Device-specific testing
└── 🎯 Integration Tests - End-to-end workflows
```

### **Test Execution Framework**
```
Test Execution Strategy:
├── 🚀 Parallel Execution
│   ├── playwright:smoke-parallel - Fast smoke test execution
│   ├── playwright:regression-parallel - Parallel regression tests
│   └── playwright:parallel - General parallel execution
├── 🔄 Sequential Execution
│   ├── playwright:smoke-nonparallel - Non-parallelizable smoke tests
│   ├── playwright:regression-nonparallel - Sequential regression tests
│   └── playwright:nonparallel - General sequential execution
├── 🎯 Hybrid Execution
│   ├── playwright:smoke - Complete smoke test suite
│   ├── playwright:regression - Complete regression suite
│   └── playwright:run - Full test suite execution
└── 🔧 Development & Debugging
    ├── playwright:debug - Debug mode execution
    ├── playwright:run-single - Single test execution
    └── playwright:show-report - Test report generation
```

### **Test Coverage Areas**
```
Comprehensive Test Coverage:
├── 🔐 Authentication & Security
│   ├── POS Login/Logout
│   ├── Admin Authentication
│   ├── User Role Validation
│   └── Session Management
├── 💰 Payment Processing
│   ├── Cash Transactions
│   ├── Card Payments (PayFac)
│   ├── EBT Processing
│   ├── Refund Operations
│   └── Offline Payment Handling
├── 📦 Inventory Management
│   ├── Item Search & Addition
│   ├── Barcode Processing
│   ├── Age Verification
│   ├── Item Restrictions
│   └── Stock Management
├── 👥 Customer Operations
│   ├── Customer Lookup
│   ├── New Customer Creation
│   ├── Loyalty Points
│   ├── Customer History
│   └── Points Redemption
├── 💳 Tax Management
│   ├── Tax Rules Configuration
│   ├── Tax Items Administration
│   ├── Tax Calculations
│   ├── Tax Reports
│   └── Tax Restrictions
├── 📊 Reporting & Analytics
│   ├── Sales Reports
│   ├── Transaction History
│   ├── Financial Analytics
│   └── Performance Metrics
├── ⚙️ Administrative Functions
│   ├── System Configuration
│   ├── User Management
│   ├── Settings Administration
│   └── Task Management
└── 📱 Mobile Operations
    ├── Mobile-Optimized Interface
    ├── Touch Interactions
    ├── Mobile-Specific Workflows
    └── Cross-Device Compatibility
```

---

## 📋 **SUMMARY**

The BottlePOS application provides a comprehensive retail management solution with:

- **🖥️ Desktop & Mobile Support** - Cross-platform compatibility
- **💳 Multiple Payment Options** - Cash, Card, PayFac integration
- **👥 Customer Management** - CRM and loyalty programs
- **📦 Inventory Control** - Complete stock management
- **💰 Advanced Tax Management** - Tax rules, items, and configuration
- **📊 Business Intelligence** - Comprehensive reporting
- **🛡️ Compliance Features** - Age verification, audit trails
- **⚙️ Configuration Flexibility** - Customizable settings
- **🔄 Real-time Operations** - Live updates and monitoring

The system is designed to handle the complete retail workflow from initial customer interaction through final transaction completion, with robust administrative tools for business management and growth.

---

## 🚀 **Document Evolution Process**

### **When New Tests Are Added:**
1. **📝 Update Coverage Status** - Mark new areas as "COVERED" in matrices
2. **➕ Add New Sections** - Document newly discovered features/workflows  
3. **🔧 Enhance Technical Details** - Add component interactions and error scenarios
4. **📊 Update Metrics** - Refresh test counts and coverage percentages
5. **🎯 Identify New Gaps** - Document areas revealed by expanded testing

### **Growth Template for New Features:**
```markdown
### **🆕 [NEW FEATURE NAME]**
**Discovery Date**: [When first automated]
**Test Coverage**: [Test file references]
**User Workflows**:
- [Business scenario 1]
- [Business scenario 2]

**Technical Components**:
- [UI components involved]
- [API endpoints used]
- [Data flow description]

**Integration Points**:
- [Connected features]
- [Dependencies]
```

### **Continuous Improvement Cycle:**
```
New Test Written → System Overview Updated → Gaps Identified → Next Test Planned
        ↑                                                              ↓
   Documentation ←← Coverage Analysis ←← New Features Discovered ←←←←←←
```

**Last Updated**: October 21, 2025 - Comprehensive Playwright test framework documentation  
**Application URL**: `http://localhost:9000`  
**Test Coverage**: 58 test files covering all major workflows including comprehensive tax administration, payment processing, inventory management, and mobile operations
