# BottlePOS Application Component Mapping

This document provides a comprehensive mapping of all UI components in the BottlePOS application running on `http://localhost:9000`, organized according to the existing automation framework structure.

## 🏗️ **Application Architecture Overview**

```
BottlePOS Application (localhost:9000)
├── POS Section (Main Application Interface)
├── ADMIN Section (Administrative Portal)
├── Shared Components (Dialogs, Navigation, etc.)
└── Base UI Objects (Buttons, Fields, Tables, etc.)
```

---

## 🖥️ **POS SECTION COMPONENTS**

### **🔐 Authentication**
```typescript
// Login Components
POS.Login.UserName          // Text field for username
POS.Login.Password          // Text field for password  
POS.Login.LoginButton       // Submit login form
POS.Login.FormVisible()     // Check if login form is visible
POS.Logout                  // Logout button
```

### **🧭 Navigation Bar**
```typescript
// Main Navigation Links
POS.NavigationBar.Register      // Link to Register page
POS.NavigationBar.Sales         // Link to Sales page
POS.NavigationBar.Weborders     // Link to WebOrders page
POS.NavigationBar.Reports       // Link to Reports page
POS.NavigationBar.Settings      // Link to Settings page

// Utility Navigation
POS.NavigationBar.TaskList      // Task List link
POS.NavigationBar.Fullscreen    // Fullscreen toggle
POS.NavigationBar.CustomerScreen // Customer display screen
POS.NavigationBar.ClockInOut    // Clock In/Out functionality
POS.NavigationBar.Admin         // Admin portal access
```

### **📦 Register Page Components**
```typescript
// Register Interface
POS.Register.ItemSearch         // Search for products
POS.Register.ItemGrid          // Product grid display
POS.Register.ShoppingCart      // Cart/basket area
POS.Register.CategoryTabs      // Product category navigation
POS.Register.Shortcuts         // Quick action shortcuts
POS.Register.CustomerInfo      // Customer information panel
POS.Register.PaymentButtons    // Payment method selection
POS.Register.TotalDisplay      // Order total display
```

### **💰 Sales Page Components**
```typescript
// Sales Management
POS.Sales.SalesHistory         // Past transactions list
POS.Sales.SearchTransactions   // Search sales records
POS.Sales.RefundButton         // Process refunds
POS.Sales.VoidButton          // Void transactions
POS.Sales.ReprintReceipt      // Reprint receipts
POS.Sales.TransactionDetails  // Detailed transaction view
```

### **📊 Reports Page Components**
```typescript
// Reporting Interface
POS.Reports.ReportSelector     // Choose report type
POS.Reports.DateRangePicker    // Select date range
POS.Reports.GenerateButton     // Generate report
POS.Reports.ExportButton       // Export report data
POS.Reports.PrintButton        // Print report
POS.Reports.ReportDisplay      // Report results area
```

### **⚙️ Settings Page Components**
```typescript
// Configuration Settings
POS.Settings.DeviceSettings    // Device configuration
POS.Settings.PaymentSettings   // Payment processor setup
POS.Settings.PrinterSettings   // Receipt printer config
POS.Settings.DisplaySettings   // Screen display options
POS.Settings.UserPreferences   // User-specific settings
```

### **🌐 Web Orders Page Components**
```typescript
// Online Order Management  
POS.WebOrders.OrderList        // List of web orders
POS.WebOrders.OrderStatus      // Order status indicators
POS.WebOrders.ProcessOrder     // Process/fulfill order
POS.WebOrders.OrderDetails     // Detailed order view
POS.WebOrders.RefreshButton    // Refresh order list
```

---

## 🛠️ **ADMIN SECTION COMPONENTS**

### **🔐 Admin Authentication**
```typescript
// Admin Login
ADMIN.Login.UserField          // Admin username
ADMIN.Login.PasswordField      // Admin password
ADMIN.Login.LoginButton        // Admin login submit
ADMIN.Logout                   // Admin logout
```

### **📋 Admin Menu & Navigation**
```typescript
// Main Menu Categories
ADMIN.Menu.Dashboard           // Main dashboard
ADMIN.Menu.Realtime           // Real-time monitoring
ADMIN.Menu.Reports            // Admin reports
ADMIN.Menu.Assistant          // AI Assistant
ADMIN.Menu.POSSales          // POS sales overview
ADMIN.Menu.Customers         // Customer management

// Accounting Section
ADMIN.Menu.Closing           // End-of-day closing
ADMIN.Menu.Expense           // Expense tracking
ADMIN.Menu.ClockInOut        // Employee time tracking

// Items Management
ADMIN.Menu.Items             // Product catalog
ADMIN.Menu.Inventory         // Stock management
ADMIN.Menu.Categories        // Product categories
ADMIN.Menu.Suppliers         // Supplier management
ADMIN.Menu.Receive           // Receiving inventory
ADMIN.Menu.Transfer          // Inventory transfers
ADMIN.Menu.Order             // Purchase orders

// Settings
ADMIN.Menu.Staff_Admins      // Staff management
ADMIN.Menu.Stores            // Store locations
ADMIN.Menu.Devices_Locations // Device configuration
ADMIN.Menu.General_Settings  // General settings
ADMIN.Menu.POS_Settings      // POS configuration
ADMIN.Menu.Webstore_Settings // Online store settings
```

### **📈 Dashboard Components**
```typescript
// Dashboard Widgets
ADMIN.Dashboard.SalesWidget    // Sales summary
ADMIN.Dashboard.InventoryWidget // Inventory alerts
ADMIN.Dashboard.CustomerWidget  // Customer metrics
ADMIN.Dashboard.RevenueChart   // Revenue visualization
ADMIN.Dashboard.TopProducts    // Best selling items
ADMIN.Dashboard.RecentActivity // Recent system activity
```

### **👥 Customer Management**
```typescript
// Customer Administration
ADMIN.Customers.CustomerList   // List all customers
ADMIN.Customers.SearchCustomer // Search functionality
ADMIN.Customers.AddCustomer    // Add new customer
ADMIN.Customers.EditCustomer   // Edit customer details
ADMIN.Customers.DeleteCustomer // Remove customer
ADMIN.Customers.CustomerHistory // Purchase history
ADMIN.Customers.LoyaltyPoints  // Points management
```

### **📦 Item Management**
```typescript
// Product Administration
ADMIN.Items.ItemList          // Product catalog
ADMIN.Items.SearchItems       // Search products
ADMIN.Items.AddItem           // Add new product
ADMIN.Items.EditItem          // Edit product details
ADMIN.Items.DeleteItem        // Remove product
ADMIN.Items.BulkActions       // Bulk operations
ADMIN.Items.ImportItems       // Import product data
ADMIN.Items.ExportItems       // Export product data

// Supplier Management
ADMIN.Suppliers.SupplierList  // List suppliers
ADMIN.Suppliers.AddSupplier   // Add new supplier
ADMIN.Suppliers.EditSupplier  // Edit supplier details
ADMIN.Suppliers.SupplierOrders // Purchase orders
```

### **📊 Admin Reports**
```typescript
// Administrative Reporting
ADMIN.Reports.SalesReports    // Sales analytics
ADMIN.Reports.InventoryReports // Stock reports
ADMIN.Reports.CustomerReports  // Customer analytics
ADMIN.Reports.EmployeeReports  // Staff performance
ADMIN.Reports.FinancialReports // Financial summaries
```

---

## 🗨️ **DIALOG COMPONENTS**

### **💳 Payment & Transaction Dialogs**
```typescript
// Payment Processing
POS.Dialog.Checkout           // Checkout process
POS.Dialog.CheckoutComplete   // Transaction completion
POS.Dialog.Approved          // Payment approved
POS.Dialog.RefundTransaction // Refund processing
POS.Dialog.VoidTransaction   // Void transaction
POS.Dialog.TransactionDetail // Transaction details
POS.Dialog.TransactionCancelled // Cancelled transaction
```

### **👤 Customer Dialogs**
```typescript
// Customer Management
POS.Dialog.CustomerDetails    // Customer information
POS.Dialog.Customerinfo      // Customer info display
POS.Dialog.Customernotfound  // Customer not found
POS.Dialog.AgeVerification   // Age verification
POS.Dialog.PointsRequired    // Loyalty points dialog
```

### **🛍️ Item & Order Dialogs**
```typescript
// Product Management
POS.Dialog.EditItem          // Edit item details
POS.Dialog.itemnotfound      // Item not found
POS.Dialog.Discount          // Apply discounts
POS.Dialog.DeleteOrder       // Delete order confirmation
POS.Dialog.AddSupplier       // Add supplier dialog
```

### **⚙️ System & Device Dialogs**
```typescript
// System Configuration
POS.Dialog.InitialDeviceSetup    // Device setup wizard
POS.Dialog.AlertDeviceSetup      // Device setup alerts
POS.Dialog.PaxInitializationError // PAX device errors
POS.Dialog.PrintConfirmation     // Print confirmation
POS.Dialog.Authorization         // Authorization required
```

### **🚨 Alert & Error Dialogs**
```typescript
// System Messages
POS.Dialog.Alert             // General alerts
POS.Dialog.Error             // Error messages
POS.Dialog.Success           // Success notifications
POS.Dialog.Confirmation      // Confirmation prompts
POS.Dialog.Logout           // Logout confirmation

// Legacy Dialogs (Fallback)
POS.Dialog.Legacy_Alert      // Legacy alert system
POS.Dialog.LoginError        // Login error messages
POS.Dialog.Legacy_Logout     // Legacy logout dialog
POS.Dialog.CancelOrder       // Cancel order dialog
```

---

## 🧩 **BASE UI OBJECTS**

### **🔘 Input Components**
```typescript
// Form Controls
Button                       // Clickable buttons
TextField                    // Text input fields
NumberField                  // Numeric input fields
RangeField                   // Range/slider inputs
Checkbox                     // Checkbox controls
Toggle                       // Toggle switches
Dropdown                     // Select dropdowns
Autocomplete                 // Auto-complete fields
```

### **📋 Data Components**
```typescript
// Data Display
BaseTable                    // Data tables
Loader                       // Loading indicators
InfoBox                      // Information displays
LabelField                   // Label components
KeyPad                       // Virtual keyboard
ToastList                    // Notification toasts
Processing                   // Processing indicators
```

### **🎛️ Special Components**
```typescript
// Advanced UI Elements
Tab                          // Tab navigation
PromptTerminal              // Terminal prompts
SpecialObjects              // Custom components
PaymentDevices              // Payment device interfaces
```

---

## 🏷️ **COMPONENT TAGGING SYSTEM**

### **Test Tags for Component Organization**
```typescript
// Functional Tags
@login          // Authentication components
@payment        // Payment processing elements
@customer       // Customer management
@inventory      // Inventory/product components
@reporting      // Report generation
@settings       // Configuration elements

// Section Tags
@pos           // POS interface components
@admin         // Admin portal components
@dialog        // Modal dialog components

// Test Type Tags
@smoke         // Critical functionality
@regression    // Comprehensive testing
@api           // API-related components
```

---

## 🎯 **COMPONENT USAGE EXAMPLES**

### **Example: Complete Login Flow**
```typescript
// Navigate and login to POS
await POS.Login.UserName.setText({value: 'admin'});
await POS.Login.Password.setText({value: 'password'});
await POS.Login.LoginButton.Click();
expect(await POS.Logout.IsVisible()).toBeTruthy();
```

### **Example: Process Sale Transaction**
```typescript
// Add item and process payment
await POS.Register.ItemSearch.setText({value: 'beer'});
await POS.Register.AddToCart.Click();
await POS.Register.PaymentButtons.Cash.Click();
await POS.Dialog.Checkout.ConfirmPayment.Click();
expect(await POS.Dialog.CheckoutComplete.IsVisible()).toBeTruthy();
```

### **Example: Admin Customer Management**
```typescript
// Access admin and manage customers
await POS.NavigationBar.Admin.Click();
await ADMIN.Menu.Customers.Click();
await ADMIN.Customers.AddCustomer.Click();
await ADMIN.Dialog.CustomerDetails.Name.setText({value: 'John Doe'});
await ADMIN.Dialog.CustomerDetails.Save.Click();
```

---

## 📝 **NOTES**

1. **Component Hierarchy**: All components follow the established Page Object Model pattern
2. **Locator Strategy**: Uses Playwright's built-in locators (getByRole, getByText, etc.)
3. **Error Handling**: Each component includes proper error handling and wait strategies
4. **Extensibility**: New components can be added following the established patterns
5. **Test Data**: Uses Faker.js for generating realistic test data

---

## 🔄 **MAINTENANCE**

This mapping should be updated when:
- New UI components are added to the application
- Existing components change their behavior or selectors
- New pages or sections are introduced
- Component hierarchy is restructured

**Last Updated**: `$(date)`  
**Application URL**: `http://localhost:9000`  
**Framework Version**: Playwright v1.45.1
