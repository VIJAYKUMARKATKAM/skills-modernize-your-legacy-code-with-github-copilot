# Account Management System - Test Plan

**Application**: COBOL Account Management System  
**Date Created**: 2026-08-12  
**Purpose**: Comprehensive test plan for validating business logic and supporting Node.js migration  

---

## Test Case Summary

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | System Initialization | N/A | 1. Launch the application | Application displays menu; Initial balance is 1000.00 | | | Initial balance value should be 1000.00 |
| TC-002 | Menu Display | Application is running | 1. Observe the initial screen | Menu displays with options: 1. View Balance, 2. Credit Account, 3. Debit Account, 4. Exit | | | Verify all menu items are visible and numbered correctly |
| TC-003 | View Balance - Initial State | Application is running | 1. Press '1' to view balance | Display: "Current balance: 1000.00" | | | Initial balance should be exactly 1000.00 |
| TC-004 | Invalid Menu Choice - Below Range | Application is running | 1. Enter '0' as menu choice | Display: "Invalid choice, please select 1-4." and return to menu | | | Menu should display again after error message |
| TC-005 | Invalid Menu Choice - Above Range | Application is running | 1. Enter '5' as menu choice | Display: "Invalid choice, please select 1-4." and return to menu | | | Menu should display again after error message |
| TC-006 | Invalid Menu Choice - Non-Numeric | Application is running | 1. Enter 'A' as menu choice | System handles gracefully; return to menu or display error | | | Verify input validation for non-numeric entries |
| TC-007 | Credit Account - Valid Positive Amount | Application is running; Initial balance: 1000.00 | 1. Press '2' for Credit Account 2. Enter '100' as credit amount | Display: "Amount credited. New balance: 1100.00" | | | New balance should be initial balance + credit amount |
| TC-008 | Credit Account - Small Amount | Application is running; Balance: 1100.00 | 1. Press '2' for Credit Account 2. Enter '0.50' as credit amount | Display: "Amount credited. New balance: 1100.50" | | | System should support decimal precision to 2 places |
| TC-009 | Credit Account - Large Amount | Application is running; Balance: 1100.50 | 1. Press '2' for Credit Account 2. Enter '50000' as credit amount | Display: "Amount credited. New balance: 51100.50" | | | System should handle large amounts (up to 6 digits + 2 decimals) |
| TC-010 | Credit Account - Zero Amount | Application is running; Balance: 51100.50 | 1. Press '2' for Credit Account 2. Enter '0' as credit amount | Display: "Amount credited. New balance: 51100.50" | | | Balance should remain unchanged when crediting zero |
| TC-011 | Credit Account - Decimal Precision | Application is running; Balance: 51100.50 | 1. Press '2' for Credit Account 2. Enter '25.75' as credit amount | Display: "Amount credited. New balance: 51126.25" | | | Verify 2-decimal precision is maintained |
| TC-012 | Debit Account - Valid Positive Amount | Application is running; Balance: 51126.25 | 1. Press '3' for Debit Account 2. Enter '100' as debit amount | Display: "Amount debited. New balance: 51026.25" | | | New balance should be current balance - debit amount |
| TC-013 | Debit Account - Small Amount | Application is running; Balance: 51026.25 | 1. Press '3' for Debit Account 2. Enter '0.25' as debit amount | Display: "Amount debited. New balance: 51026.00" | | | System should support debit with decimal precision |
| TC-014 | Debit Account - Insufficient Funds | Application is running; Balance: 51026.00 | 1. Press '3' for Debit Account 2. Enter '100000' as debit amount | Display: "Insufficient funds for this debit." and return to menu; Balance remains 51026.00 | | | Balance should NOT change when insufficient funds |
| TC-015 | Debit Account - Exact Balance Amount | Application is running; Balance: 51026.00 | 1. Press '3' for Debit Account 2. Enter '51026.00' as debit amount | Display: "Amount debited. New balance: 0.00" | | | Should allow debit of exact remaining balance, resulting in zero balance |
| TC-016 | Debit Account - Amount Greater Than Balance | Application is running; Balance: 0.00 | 1. Press '3' for Debit Account 2. Enter '1' as debit amount | Display: "Insufficient funds for this debit." and return to menu; Balance remains 0.00 | | | Should reject any debit when balance is zero or insufficient |
| TC-017 | Debit Account - Zero Amount | Application is running; Balance: 0.00 | 1. Press '3' for Debit Account 2. Enter '0' as debit amount | Display: "Amount debited. New balance: 0.00" | | | Balance should remain unchanged when debiting zero |
| TC-018 | Balance Persistence - After Credit | Application is running | 1. Press '2' to credit 500 2. Press '1' to view balance | Display shows updated balance (0.00 + 500 = 500.00) | | | Balance should persist in storage between operations |
| TC-019 | Balance Persistence - After Debit | Application is running; Balance: 500.00 | 1. Press '3' to debit 200 2. Press '1' to view balance | Display shows updated balance (500.00 - 200 = 300.00) | | | Balance should persist in storage between operations |
| TC-020 | Multiple Sequential Operations | Application is running; Balance: 300.00 | 1. Press '2', credit 100 2. Press '3', debit 150 3. Press '1', view balance | Final balance should be (300 + 100 - 150 = 250.00) | | | Multiple operations should execute in correct sequence with persistent state |
| TC-021 | Exit Program - Option 4 | Application is running | 1. Press '4' for Exit | Display: "Exiting the program. Goodbye!" and program terminates | | | Application should exit gracefully |
| TC-022 | Menu Loop - Return to Menu After Credit | Application is running; After crediting amount | N/A | After credit operation, menu should display again automatically | | | User should not need to re-launch application for next operation |
| TC-023 | Menu Loop - Return to Menu After Debit | Application is running; After debiting amount | N/A | After debit operation, menu should display again automatically | | | User should not need to re-launch application for next operation |
| TC-024 | Input Validation - Negative Credit Amount | Application is running | 1. Press '2' for Credit Account 2. Enter '-100' as credit amount | System should handle according to business rules (either reject or treat as absolute value) | | | Define expected behavior for negative credit amounts |
| TC-025 | Input Validation - Negative Debit Amount | Application is running | 1. Press '3' for Debit Account 2. Enter '-100' as debit amount | System should handle according to business rules (either reject or treat as absolute value) | | | Define expected behavior for negative debit amounts |
| TC-026 | Boundary Test - Maximum Amount | Application is running; Balance: 999999.99 | 1. Press '2' to credit 1 2. Observe if overflow is handled | System should either accept or reject based on field definition PIC 9(6)V99 | | | Field is defined as 6 digits + 2 decimals; max value = 999999.99 |
| TC-027 | Boundary Test - Minimum Amount | Application is running; Balance: 0.00 | 1. Press '1' to view balance | Display: "Current balance: 0.00" | | | System should handle zero balance correctly |
| TC-028 | Data Integrity - Balance Consistency | Application is running | 1. Perform multiple credit/debit operations 2. View balance 3. Manually verify calculation | Displayed balance matches calculated balance | | | Verify no data loss or corruption during operations |
| TC-029 | Operation Type Validation - READ Operation | Application is running | N/A | READ operation should retrieve balance from STORAGE-BALANCE | | | Internal data operation validation |
| TC-030 | Operation Type Validation - WRITE Operation | Application is running | N/A | WRITE operation should store balance to STORAGE-BALANCE | | | Internal data operation validation |

---

## Test Case Categories

### 1. **Functional Requirements**

- TC-001 to TC-003: System initialization and balance retrieval
- TC-007 to TC-023: Credit and debit operations with various scenarios
- TC-021: Program exit functionality

### 2. **Input Validation**

- TC-004 to TC-006: Invalid menu selections
- TC-024 to TC-025: Negative amount handling

### 3. **Business Logic**

- TC-007 to TC-020: Core calculation logic (credit, debit, insufficient funds check)
- TC-018 to TC-020: Balance persistence and state management

### 4. **Boundary & Edge Cases**

- TC-009: Large amounts
- TC-010, TC-017: Zero amounts
- TC-015: Exact balance debit
- TC-016: Debit from zero balance
- TC-026 to TC-027: Maximum and minimum values

### 5. **Data Integrity**

- TC-028 to TC-030: Data operations and consistency

---

## Business Rules Summary

1. **Initial Balance**: System starts with balance of 1000.00
2. **View Balance**: Displays current balance without modification
3. **Credit Operation**: Adds specified amount to current balance
4. **Debit Operation**: Subtracts specified amount only if sufficient funds exist
5. **Insufficient Funds**: Debit is rejected if amount > current balance
6. **Decimal Precision**: All amounts support 2 decimal places
7. **Balance Persistence**: Balance is maintained across multiple operations
8. **Field Constraints**: Balance field is PIC 9(6)V99 (up to 999999.99)
9. **Menu Loop**: System returns to menu after each operation (except exit)
10. **Error Handling**: Invalid inputs display error message and return to menu

---

## Success Criteria

- [ ] All TC-001 to TC-023 test cases pass (core functionality)
- [ ] All TC-024 to TC-030 test cases pass (validation and edge cases)
- [ ] No data corruption or loss observed
- [ ] All decimal calculations are accurate to 2 places
- [ ] Balance persistence maintained throughout session
- [ ] Error messages are clear and user-friendly
- [ ] Menu navigation is intuitive and responsive

---

## Notes for Node.js Migration

When migrating this application to Node.js, ensure:

1. Replicate all business logic rules exactly
2. Maintain 2-decimal precision for currency operations (consider using BigDecimal or decimal.js)
3. Implement state management to persist balance across operations
4. Create corresponding unit tests for each test case in this plan
5. Use TypeScript or input validation library to enforce data types
6. Consider database storage instead of in-memory balance storage
7. Implement proper error handling and user feedback mechanisms

---

**Document Version**: 1.0  
**Last Updated**: 2026-08-12
