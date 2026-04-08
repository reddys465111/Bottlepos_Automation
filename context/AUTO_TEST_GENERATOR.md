# BottlePOS Auto-Test Generator

This document defines the streamlined workflow for automatically generating tests using just a title and steps.

---

## 🎯 **AUTO-GENERATION WORKFLOW**

### **Input Format:**
```
[auto-title]
1. step1
2. step2  
3. step3
```

### **AI Processing:**
When you provide this format, I will automatically:

1. **📋 Use the title** as the test name and description
2. **🔍 Reference System Overview** to understand the feature context
3. **🗺️ Reference Component Mapping** to use correct UI components  
4. **📁 Determine file location** based on feature type
5. **🏷️ Apply appropriate tags** based on feature area
6. **⚙️ Generate complete test** following existing patterns
7. **📊 Update System Overview** with newly discovered features/workflows
8. **🔄 Refresh documentation** to reflect current test coverage
9. **📈 Provide coverage analysis** showing improvement

---

## 🤖 **AUTO-PROCESSING RULES**

### **Title Analysis:**
- **Extract feature area** from title (e.g., "payment", "customer", "admin")
- **Determine test type** (smoke for basic features, regression for complex)
- **Assign priority** based on business criticality
- **Select user role** based on feature context

### **Step Processing:**  
- **Map steps to components** using Component Mapping
- **Add error handling** for each interaction
- **Include assertions** based on expected outcomes
- **Add waits and validations** following patterns

### **MCP-Enhanced Processing:**
- **Real-time execution** using Playwright MCP during test creation
- **Live component discovery** and validation
- **Interactive debugging** of UI interactions
- **Dynamic POM creation** for missing components
- **Immediate feedback** on test functionality

### **Auto-File Placement:**
- **POS features** → `tests/desktop/smoke/POS/` or regression
- **Admin features** → `tests/desktop/smoke/ADMIN/` or regression  
- **Mobile features** → `tests/mobile/smoke/POS/`
- **Complex features** → regression directory

### **Auto-Tags:**
- **Feature-based**: `@payment`, `@customer`, `@inventory`, etc.
- **Section-based**: `@pos`, `@admin`  
- **Type-based**: `@smoke`, `@regression`
- **Platform-based**: `@mobile` (if applicable)

---

## 🚀 **MCP-ENHANCED TEST CREATION**

### **New Approach: Interactive Test Development**
When creating tests for new or complex features, use Playwright MCP to:

1. **Navigate and Explore** the application in real-time
2. **Discover UI Components** that aren't mapped in POM
3. **Test Interactions** immediately to validate selectors
4. **Create Missing POM Components** on-the-fly
5. **Debug Issues** in real-time rather than after test completion
6. **Verify Test Functionality** before finalizing

### **MCP Workflow:**
```
1. Navigate to target page using MCP
2. Explore UI structure and identify elements
3. Create/update POM components based on discoveries
4. Execute test steps in real-time using MCP
5. Debug any issues immediately
6. Finalize test with validated components
```

## 📋 **EXAMPLES**

### **Example 1: MCP-Enhanced Admin Feature**
```
[22222 test admin task bar]
1- login into Admin with admin credentials
2- create a new Task
 2.1- add a task name
 2.2- select the type alert
 2.3- create a task e.g. "random task 1"
 2.4- schedule the task for tomorrow (ahead of current date)
 2.5-set start time one hour ahead of the current time
 2.6- save
3- verify the task is being displayed in the table
```

**MCP-Enhanced Process:**
1. **Navigate to Admin Portal** using MCP
2. **Login and explore Tasks page** interactively
3. **Discover missing POM components** (Tasks page not mapped)
4. **Create Tasks POM class** with proper selectors
5. **Test task creation workflow** in real-time
6. **Validate all interactions** work correctly
7. **Finalize test** with working components

### **Example 2: Simple POS Feature**
```
[Remove item from shopping cart]
1. Login to POS
2. Add two items to cart
3. Remove one item  
4. Verify cart total updates
5. Complete checkout
```

**Auto-Generated Output:**
- **File**: `tests/desktop/smoke/POS/cart_management.spec.ts`
- **Tags**: `@smoke`, `@pos`, `@cart`
- **Components**: `POS.Register.*`, `POS.Dialog.Checkout.*`
- **Test Name**: `[C####] As a cashier, I want to remove items from cart so that I can correct mistakes`

---

### **Example 2: Admin Feature**
```
[Add new supplier with contact details]
1. Login to admin portal
2. Navigate to suppliers section
3. Click add new supplier
4. Fill supplier information form
5. Save and verify supplier appears in list
```

**Auto-Generated Output:**
- **File**: `tests/desktop/smoke/ADMIN/admin_suppliers.spec.ts`  
- **Tags**: `@smoke`, `@admin`, `@suppliers`
- **Components**: `ADMIN.Menu.*`, `ADMIN.Suppliers.*`, `ADMIN.Dialog.*`
- **Test Name**: `[C####] As an admin, I want to add suppliers so that I can manage inventory sources`

---

### **Example 3: Complex Workflow**
```
[Process split payment with cash and card]
1. Login to POS
2. Add items totaling $100
3. Click pay button
4. Enter $60 cash payment
5. Process remaining $40 with card
6. Verify receipt shows both payments
```

**Auto-Generated Output:**
- **File**: `tests/desktop/regression/POS/payment_scenarios.spec.ts`
- **Tags**: `@regression`, `@pos`, `@payment`, `@cash`, `@card`  
- **Components**: `POS.Register.*`, `POS.Dialog.Checkout.*`
- **Test Name**: `[C####] As a cashier, I want to process split payments so that customers can use multiple payment methods`

---

## 🔧 **INTELLIGENT PROCESSING**

### **Context Recognition:**
- **Payment keywords** → Use payment components, add PayFac handling
- **Customer keywords** → Use customer components, add loyalty logic
- **Admin keywords** → Use admin components, add authentication
- **Age verification items** → Add age verification dialog handling
- **Error scenarios** → Add proper error dialog handling

### **Component Auto-Selection:**
Based on steps, automatically select from Component Mapping:
- **"Login"** → `POS.Login.In()` or `ADMIN.Login.In()`
- **"Add item"** → `POS.Register.AddItemByStockcode()` 
- **"Pay"** → `POS.Register.PayButton.Click()`
- **"Navigate to"** → `ADMIN.Menu.[Section].GoTo()`
- **"Fill form"** → Appropriate dialog components

### **Smart Assertions:**
- **"Verify total"** → `expect(await POS.Register.Total.getText())`
- **"Confirm item added"** → `expect(await POS.Register.TotalItems.getText())`
- **"Check dialog appears"** → `expect(await Dialog.IsVisible()).toBeTruthy()`
- **"Validate error message"** → Error dialog expectations

---

## 🎯 **USAGE INSTRUCTIONS**

### **How to Use:**
1. **📝 Write your request** in the simple format:
   ```
   [Clear test title describing the feature]
   1. First action step
   2. Second action step  
   3. Third action step
   ```

2. **🚀 Submit to AI** - I'll automatically generate the complete test

3. **✅ Review and integrate** the generated test file

### **Best Practices for Steps:**
- **Be specific** about actions (click, enter, select)
- **Include validation** steps (verify, check, confirm)
- **Mention test data** when relevant (specific items, amounts)
- **Consider error cases** in additional steps if needed

### **Title Guidelines:**
- **Action-focused**: "Process refund", "Add customer", "Generate report"  
- **Feature-specific**: Include the main feature being tested
- **User-centric**: Think about what the user is trying to accomplish

---

## 🔄 **CONTINUOUS IMPROVEMENT**

### **Learning from Usage:**
- **Pattern recognition** improves over time
- **Component mapping** gets more accurate
- **Error handling** becomes more comprehensive
- **Test coverage** becomes more complete

### **Feedback Loop:**
- Generated tests help **improve component mapping**
- New patterns **enhance auto-generation rules**
- Coverage gaps **inform future auto-suggestions**

---

## 📊 **INTEGRATION WITH EXISTING DOCS**

### **Automatic Reference:**
- **System Overview** → Understand feature context and business rules
- **Component Mapping** → Select correct UI components and interactions
- **Existing Tests** → Follow established patterns and naming
- **Coverage Analysis** → Fill identified gaps systematically

### **Automatic Documentation Updates:**
After each generated test, I will automatically review and update:

#### **📖 System Overview Updates:**
1. **🆕 New Feature Sections** - Add undocumented features discovered during testing
2. **🔧 Enhanced Workflow Details** - Expand existing workflows with new steps/scenarios  
3. **🎯 Updated Test Coverage Metrics** - Refresh test counts and coverage percentages
4. **➕ New Integration Points** - Document newly discovered feature connections
5. **📅 Last Updated Timestamp** - Update document status section

#### **🔍 What Gets Updated:**
- **Missing workflows** discovered during test implementation
- **New UI components** found while writing tests
- **Enhanced business rules** learned from test scenarios
- **Updated error scenarios** discovered through testing
- **Improved feature descriptions** based on actual system behavior

#### **🔄 Update Examples:**

**Before Test:**
```markdown
### **Payment Processing** 
├── Cash Payments - Basic functionality
└── Card Payments - PayFac integration
```

**After Adding Split Payment Test:**
```markdown  
### **Payment Processing**
├── Cash Payments - Basic functionality
├── Card Payments - PayFac integration  
└── 🆕 Split Payments - Multiple payment method combinations
    ├── Cash + Card combinations
    ├── Partial payment handling
    ├── Payment breakdown display
    └── Receipt with multiple payment methods
```

#### **📈 Coverage Tracking:**
- **Test Count Updates** - Increment from "37+ tests" to actual current count
- **Coverage Status** - Mark areas as "COVERED" when tests are added
- **Gap Identification** - Document new gaps discovered during testing
- **Priority Refresh** - Update priority levels based on new understanding

---

## 🚀 **READY TO USE!**

**Just provide:**
```
[Your test title]
1. Step one
2. Step two
3. Step three
```

**And I'll automatically generate:**
✅ Complete TypeScript test file  
✅ Proper file location and naming  
✅ Correct component usage  
✅ Appropriate tags and structure  
✅ **Updated System Overview** with new/enhanced features
✅ **Refreshed coverage metrics** and documentation status
✅ **Gap analysis** showing what's still needed
✅ **Component mapping updates** if new patterns discovered

**Your documentation stays current and comprehensive with every test!** 🎯
