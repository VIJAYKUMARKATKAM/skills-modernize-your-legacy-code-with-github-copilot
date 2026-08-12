---
agent: 'agent'
model: 'gpt-4.1'
description: 'Run the accounting system test suite'
---

# Run Accounting System Test Suite

This prompt executes the comprehensive unit test suite for the Node.js accounting application.

## Steps

1. Navigate to the accounting application directory:

   ```bash
   cd src/accounting
   ```

2. Install dependencies (if not already installed):

   ```bash
   npm install
   ```

3. Run the test suite with verbose output:

   ```bash
   npm test
   ```

4. View detailed test results showing:
   - Number of test suites passed/failed
   - Total number of tests passed/failed
   - Execution time
   - Coverage information

## Test Coverage

The test suite includes 30 comprehensive unit tests covering:

- Data persistence operations (READ/WRITE)
- Credit account operations
- Debit account operations
- Input validation
- Balance persistence
- Decimal precision
- Edge cases and error handling

## Expected Output

```
Test Suites: 1 passed, 1 total
Tests:       30 passed, 30 total
Time:        ~0.3-0.5 seconds
```

## Notes

- All tests are unit tests (no external dependencies)
- Tests use Jest testing framework
- 100% pass rate indicates successful migration
- Tests map to business requirements in docs/TESTPLAN.md
