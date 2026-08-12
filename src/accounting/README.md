# Node.js Account Management System

**Converted from Legacy COBOL Application**

## Overview

This is a Node.js conversion of the legacy COBOL-based accounting system used by Mergington High School. The application preserves the original three-layer architecture while leveraging modern JavaScript practices.

## Original COBOL Architecture → Node.js Conversion

| COBOL Layer | COBOL File | Node.js Layer | Implementation |
| --- | --- | --- | --- |
| **UI Layer** | main.cob (MainProgram) | MainProgram class | Handles menu display and user interaction |
| **Business Logic** | operations.cob (Operations) | OperationsLayer class | Implements credit, debit, and balance operations |
| **Data Persistence** | data.cob (DataProgram) | DataPersistenceLayer class | Manages account balance storage |

## Key Features

✅ **Preserved Business Logic**
- View Balance (TOTAL operation)
- Credit Account (CREDIT operation) 
- Debit Account (DEBIT operation)
- Exit program (option 4)

✅ **Data Integrity**
- 2-decimal precision for currency (using Decimal.js)
- No overdrafts allowed (insufficient funds validation)
- Persistent balance across operations

✅ **Menu-Driven Interface**
- Same menu options as original COBOL application
- Graceful error handling for invalid inputs
- Loop returns to menu after each operation

## Installation

```bash
# Install dependencies
npm install

# The only external dependency is decimal.js for precise currency handling
# (equivalent to COBOL's PIC 9(6)V99 precision)
```

## Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

## Running the Application

### From src/accounting directory:

```bash
# Development/Interactive mode
npm start

# Or directly
node index.js
```

### Using VS Code Debugger:

1. Open the workspace in VS Code
2. Press `F5` or go to Debug → Start Debugging
3. Select "Run Accounting System" or "Debug Accounting System"
4. The application will start in the integrated terminal

## Application Architecture

### Three-Layer Architecture

```
┌─────────────────────────────────────────────┐
│         MainProgram (UI Layer)              │
│  (Menu Display & User Interaction)          │
└───────────────────┬─────────────────────────┘
                    │
                    │ Uses
                    ↓
┌─────────────────────────────────────────────┐
│    OperationsLayer (Business Logic)         │
│  (Credit, Debit, Balance Operations)        │
└───────────────────┬─────────────────────────┘
                    │
                    │ Uses
                    ↓
┌─────────────────────────────────────────────┐
│  DataPersistenceLayer (Data Storage)        │
│  (Balance Storage & Retrieval)              │
└─────────────────────────────────────────────┘
```

### Data Flow: Credit Operation

```
1. User selects "Credit Account" (option 2)
2. MainProgram prompts for credit amount
3. OperationsLayer.creditAccount() executes:
   - READ operation: DataPersistenceLayer.read()
   - ADD amount to current balance
   - WRITE operation: DataPersistenceLayer.write()
4. Display confirmation with new balance
5. Return to menu
```

### Data Flow: Debit Operation

```
1. User selects "Debit Account" (option 3)
2. MainProgram prompts for debit amount
3. OperationsLayer.debitAccount() executes:
   - READ operation: DataPersistenceLayer.read()
   - VALIDATE: balance >= amount (no overdrafts)
   - If sufficient: SUBTRACT and WRITE new balance
   - If insufficient: Display error, no balance change
4. Display result
5. Return to menu
```

## Business Rules

1. **Initial Balance**: $1,000.00 (matches COBOL PIC 9(6)V99 VALUE 1000.00)
2. **No Overdrafts**: Debit transactions are rejected if insufficient funds
3. **Decimal Precision**: All amounts stored with 2 decimal places
4. **Field Constraints**: Maximum balance is $999,999.99 (6 digits + 2 decimals)
5. **Menu Loop**: System returns to menu after each operation (except exit)
6. **Balance Persistence**: In-memory storage persists across operations during session

## Technology Stack

- **Language**: JavaScript (Node.js)
- **Runtime**: Node.js 14+
- **Dependencies**:
  - `decimal.js`: Precise decimal arithmetic for currency (replaces COBOL's PIC 9(6)V99)
- **Package Manager**: npm

## Differences from COBOL Original

| Aspect | COBOL | Node.js |
| --- | --- | --- |
| **Precision** | PIC 9(6)V99 | Decimal.js library |
| **Menu Input** | ACCEPT USER-CHOICE | readline interface |
| **Call Mechanism** | CALL statement | Method invocation |
| **Storage** | WORKING-STORAGE SECTION | In-memory objects |
| **Inter-process** | Linkage Section parameters | Direct method parameters |
| **Display** | DISPLAY statement | console.log() |

## Future Enhancements

For production deployment, consider:
1. Database storage (PostgreSQL, MongoDB) instead of in-memory
2. REST API wrapper (Express.js)
3. Web UI (React, Vue.js)
4. Persistent transaction logging
5. Authentication & authorization
6. Multi-user support with separate account storage

## Testing

Unit tests for each layer are planned. See [docs/TESTPLAN.md](../../docs/TESTPLAN.md) for comprehensive test cases.

## Support

For questions or issues, contact Mergington High School's IT Department.

---

**Conversion Date**: 2026-08-12  
**Original Language**: COBOL  
**Target Language**: Node.js  
**Status**: Migration Complete - Ready for Testing
