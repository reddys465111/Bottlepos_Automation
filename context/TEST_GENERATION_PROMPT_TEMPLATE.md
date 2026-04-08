# BottlePOS Test Generation Prompt Template

This template provides a standardized prompt for generating high-quality automated tests that follow the established project structure and patterns.

---

## 🎯 **PROMPT TEMPLATE**

### **Context Setup**
```
You are an expert test automation engineer working on the BottlePOS application. 

**Project Context:**
- Framework: Playwright with TypeScript
- Pattern: Page Object Model
- Test Location: /home/msanabria/posnation/versions/v3_15/bottlepos/bottlepos_webautomation/
- Application URL: http://localhost:9000

**Reference Documents:**
1. **System Overview**: `context/BOTTLEPOS_SYSTEM_OVERVIEW.md` - Complete system capabilities and workflows
2. **Component Mapping**: `context/COMPONENT_MAPPING.md` - UI component reference and usage patterns
3. **Existing Tests**: Analyze patterns in `/tests/` directory for consistency

**Task:** Create automated test(s) for [SPECIFIC_FEATURE/WORKFLOW]

**MCP-Enhanced Approach:** For new or complex features, use Playwright MCP to:
- Navigate and explore the application in real-time
- Discover missing UI components and create POM classes
- Test interactions immediately to validate selectors
- Debug issues in real-time during test creation
```

### **Requirements Specification**
```
**Test Requirements:**
- Feature/Workflow: [DESCRIBE_THE_FEATURE_TO_TEST]
- Test Type: [smoke/regression/mobile] 
- Priority: [critical/high/medium/low]
- Business Context: [WHY_THIS_TEST_IS_IMPORTANT]
- User Role: [cashier/manager/admin/customer]

**Coverage Requirements:**
□ Happy path scenario
□ Error/edge cases  
□ Integration points
□ Business rules validation
□ UI component interactions

**Specific Scenarios to Cover:**
- [List specific test scenarios needed]
- [Include both positive and negative cases]
- [Mention any special requirements]
```

### **Technical Specifications**
```
**Follow Existing Patterns:**
1. **File Structure**: Match existing test organization
   - Desktop: `tests/desktop/[smoke|regression]/[POS|ADMIN]/`
   - Mobile: `tests/mobile/[smoke|regression]/POS/`

2. **Naming Convention**: 
   - File: `[feature_area].spec.ts` 
   - Test: `[TestCaseID] As a [user], I want to [action] so that [benefit]`

3. **Required Imports**:
   ```typescript
   import { test, expect } from '@playwright/test';
   import { POS } from '../../../../src/section/POS';
   import { ADMIN } from '../../../../src/section/ADMIN'; // if needed
   import { Initializer, ITEMS, getDateDaysAgo } from '../../../../src/utils';
   ```

4. **Test Structure**:
   ```typescript
   test.beforeEach(async ({ page }) => {
       await Initializer.Init(page);
   });
   
   test.afterEach(async ({ page }, testInfo) => {
       await Initializer.Finalize(page, testInfo);
   });
   
   test.describe('[Feature Name]', { tag: ['@tag1', '@tag2'] }, () => {
       test('[TestID] Test Description', { tag: ['@specific'] }, async ({}) => {
           // Test implementation
       });
   });
   ```

**Component Usage:**
- Reference `context/COMPONENT_MAPPING.md` for correct component syntax
- Use existing components: `POS.Register.*`, `POS.Dialog.*`, `ADMIN.*`
- Follow established interaction patterns
- Include proper wait strategies and error handling

**MCP Component Discovery:**
- For missing components, use Playwright MCP to explore the UI
- Create new POM classes following established patterns
- Test selectors in real-time to ensure accuracy
- Update Component Mapping with newly discovered elements

**Tags to Use:**
- Test Type: `@smoke`, `@regression` 
- Section: `@pos`, `@admin`
- Feature: `@login`, `@payment`, `@customer`, `@inventory`, etc.
- Platform: `@mobile` (if applicable)
```

### **Quality Criteria**
```
**MCP-Enhanced Test Creation Process:**
1. **Navigate to Application** using MCP browser automation
2. **Explore Target Feature** interactively to understand UI structure
3. **Identify Missing Components** and create POM classes as needed
4. **Test Interactions** in real-time to validate selectors and workflows
5. **Debug Issues** immediately rather than after test completion
6. **Finalize Test** with working, validated components

**Ensure Tests Include:**
✅ Clear, descriptive test names with TestRail IDs
✅ Proper setup/teardown with Initializer
✅ Realistic test data (use ITEMS.*, CUSTOMER.*, etc.)
✅ Comprehensive assertions with meaningful error messages
✅ Proper error handling and wait strategies
✅ Comments explaining business logic
✅ Following existing code patterns exactly

**Test Quality Checklist:**
□ Tests are atomic (one responsibility each)
□ Tests are independent (can run in any order)
□ Assertions include descriptive error messages
□ Uses page object methods (not direct selectors)
□ Handles async operations properly
□ Includes both positive and negative test cases
□ Comments explain the business context
□ Follows existing naming and structure conventions
```

### **Output Requirements**
```
**Deliver:**
1. **Complete test file** with proper file path
2. **Test implementation** following all patterns
3. **Documentation update** - what coverage was added
4. **Gap analysis** - what still needs testing in this area

**Format:**
- Provide complete, runnable TypeScript test code
- Include file location in project structure
- Add comments explaining complex business logic
- Suggest additional related test scenarios if applicable
```

---

## 📋 **USAGE EXAMPLES**

### **Example 1: Feature-Specific Test**
```
**Request:**
Create tests for "Split Payment Processing" functionality.

**Test Requirements:**
- Feature/Workflow: Split Payment (Cash + Card combination)
- Test Type: regression
- Priority: high
- Business Context: Customers need to pay large amounts using multiple methods
- User Role: cashier

**Specific Scenarios:**
- Customer pays $50 cash + $30 card for $80 total
- Customer pays partial cash, insufficient card funds
- Customer attempts split payment with invalid card
- Verify receipt shows payment breakdown correctly
```

### **Example 2: Workflow-Based Test**
```
**Request:**
Create comprehensive tests for "New Customer Registration" workflow.

**Test Requirements:**
- Feature/Workflow: Complete customer onboarding process
- Test Type: smoke
- Priority: critical  
- Business Context: Store needs to capture customer data for loyalty program
- User Role: cashier

**Specific Scenarios:**
- Register new customer with all required fields
- Handle customer with existing phone number
- Validate required field enforcement
- Verify customer appears in system after registration
```

### **Example 3: Error Scenario Test**
```
**Request:**
Create tests for "Payment Failure Handling" scenarios.

**Test Requirements:**
- Feature/Workflow: Payment processing error scenarios
- Test Type: regression
- Priority: critical
- Business Context: System must gracefully handle payment failures
- User Role: cashier

**Specific Scenarios:**
- Card payment declined by processor
- Network timeout during payment processing
- PayFac terminal communication error
- Customer cancels payment mid-transaction
```

---

## 🎯 **CUSTOMIZATION VARIABLES**

When using this template, replace these variables:

| **Variable** | **Description** | **Example** |
|-------------|-----------------|-------------|
| `[SPECIFIC_FEATURE/WORKFLOW]` | The feature to test | "Age Verification Process" |
| `[DESCRIBE_THE_FEATURE_TO_TEST]` | Detailed description | "Verify alcohol sale compliance" |
| `[smoke/regression/mobile]` | Test suite type | "smoke" |
| `[critical/high/medium/low]` | Business priority | "critical" |
| `[WHY_THIS_TEST_IS_IMPORTANT]` | Business justification | "Legal compliance requirement" |
| `[cashier/manager/admin/customer]` | User perspective | "cashier" |
| `[TestCaseID]` | TestRail reference | "C1234" |
| `[feature_area]` | File naming | "age_verification" |

---

## 🚀 **TEMPLATE USAGE WORKFLOW**

### **Step 1: Identify Test Need**
```bash
# Use Coverage Analysis to find gaps
# Reference System Overview for feature understanding
# Check Component Mapping for UI elements
```

### **Step 2: Customize Template**
```bash
# Fill in specific feature/workflow details
# Define test scenarios and requirements  
# Specify priority and business context
```

### **Step 3: Generate Test**
```bash
# Submit customized prompt to AI
# Review generated test code
# Validate against existing patterns
```

### **Step 4: Integration**
```bash
# Add test file to appropriate directory
# Update coverage documentation
# Run test to validate functionality
```

---

## 📝 **TEMPLATE MAINTENANCE**

### **Update Template When:**
- New component patterns are established
- Test structure changes
- New testing requirements emerge
- Framework updates require pattern changes

### **Version Control:**
- Track template changes alongside code
- Document pattern evolution
- Maintain backward compatibility
- Share updates with team members

---

**This template ensures consistent, high-quality test generation that follows your established patterns and integrates seamlessly with your existing automation framework!** 🎯
