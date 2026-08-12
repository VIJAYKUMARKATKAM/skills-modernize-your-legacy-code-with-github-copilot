---
agent: 'agent'
model: 'gpt-4.1'
description: 'Explain the COBOL to Node.js migration architecture'
---

# COBOL to Node.js Migration Overview

This prompt provides an overview of how the legacy COBOL accounting system was modernized to Node.js.

## Architecture Mapping

The Node.js application preserves the three-layer architecture from the original COBOL system:

### Layer 1: User Interface (MainProgram)
- **COBOL**: `main.cob` (MainProgram)
- **Node.js**: `MainProgram` class in `src/accounting/index.js`
- **Function**: Displays menu and handles user interaction
- **Operations**: View Balance, Credit Account, Debit Account, Exit

### Layer 2: Business Logic (Operations)
- **COBOL**: `operations.cob` (Operations)
- **Node.js**: `OperationsLayer` class in `src/accounting/index.js`
- **Function**: Implements transaction logic and validation
- **Operations**: Credit, Debit, View Balance calculations

### Layer 3: Data Persistence (DataProgram)
- **COBOL**: `data.cob` (DataProgram)
- **Node.js**: `DataPersistenceLayer` class in `src/accounting/index.js`
- **Function**: Manages balance storage and retrieval
- **Operations**: READ (retrieve), WRITE (store) balance

## Key Improvements

1. **Decimal Precision**: Uses `decimal.js` library for exact currency calculations
2. **Modern Development**: Object-oriented design with classes and methods
3. **Testability**: Comprehensive test suite (30 unit tests)
4. **Maintainability**: Well-documented, easy to extend
5. **Performance**: Faster execution, smaller memory footprint

## Business Logic Preserved

✅ Initial balance: $1,000.00
✅ No overdrafts allowed
✅ 2-decimal precision for all amounts
✅ Balance persists across operations
✅ Graceful error handling
✅ Same menu interface

## Related Documentation

- [MIGRATION_SUMMARY.md](../../MIGRATION_SUMMARY.md)
- [src/accounting/README.md](../../src/accounting/README.md)
- [docs/TESTPLAN.md](../../docs/TESTPLAN.md)
