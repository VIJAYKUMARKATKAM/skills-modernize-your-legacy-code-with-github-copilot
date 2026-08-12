# Quick Start Guide - Node.js Accounting System

## What Was Created

Your COBOL accounting system has been successfully converted to Node.js! Here's what you now have:

```
✅ src/accounting/index.js       (9.4 KB) - Complete Node.js application
✅ src/accounting/package.json   - NPM configuration with dependencies
✅ src/accounting/README.md      - Full documentation
✅ .vscode/launch.json           - VS Code debugger configuration
```

## How to Run

### Method 1: Quick Start (Recommended)
```bash
cd src/accounting
npm start
```

### Method 2: VS Code Debugger
1. Press `F5` in VS Code
2. Select "Run Accounting System"

### Method 3: Direct Node
```bash
cd src/accounting
node index.js
```

## What It Does

Menu-driven application with 4 options:
1. **View Balance** - Shows current account balance ($1,000.00 initial)
2. **Credit Account** - Deposit funds
3. **Debit Account** - Withdraw funds (validates no overdrafts)
4. **Exit** - Quit application

## Key Features

- ✅ **Exact decimal precision** for currency (uses Decimal.js)
- ✅ **Same business logic** as original COBOL
- ✅ **Same menu interface** as original COBOL
- ✅ **Validation** prevents overdrafts
- ✅ **Persistent balance** across operations

## Example Session

```
Menu:
1. View Balance
2. Credit Account  
3. Debit Account
4. Exit

Select 1 → Shows: Current balance: 1000.00
Select 2 → Enter 100 → Shows: Amount credited. New balance: 1100.00
Select 1 → Shows: Current balance: 1100.00
Select 3 → Enter 50 → Shows: Amount debited. New balance: 1050.00
Select 4 → Exit program
```

## Architecture (Preserved from COBOL)

```
┌─────────────────────────────────────────┐
│         MainProgram (UI)                │  ← Same as main.cob
├─────────────────────────────────────────┤
│      OperationsLayer (Logic)            │  ← Same as operations.cob
├─────────────────────────────────────────┤
│   DataPersistenceLayer (Storage)        │  ← Same as data.cob
└─────────────────────────────────────────┘
```

## Technical Details

| COBOL | Node.js |
|-------|---------|
| WORKING-STORAGE | JavaScript object |
| PIC 9(6)V99 | Decimal.js |
| CALL statements | Method calls |
| PERFORM UNTIL | while loop |
| EVALUATE | switch statement |

## Files in src/accounting/

- **index.js** - Complete application (all layers in one file)
- **package.json** - Dependencies and scripts
- **README.md** - Full documentation
- **node_modules/** - Installed packages (decimal.js)

## Next Steps

1. ✅ Run the application: `npm start`
2. ✅ Test the menu operations (credit, debit, view balance)
3. ✅ Review [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) for details
4. ✅ Check [src/accounting/README.md](src/accounting/README.md) for architecture
5. ✅ Review [docs/TESTPLAN.md](docs/TESTPLAN.md) for test cases

## Troubleshooting

**Problem**: `npm: command not found`
- **Solution**: Install Node.js (https://nodejs.org/)

**Problem**: Module not found
- **Solution**: Run `npm install` in src/accounting/

**Problem**: Application won't start
- **Solution**: Check Node.js version: `node --version` (needs 14+)

## Questions?

- See [src/accounting/README.md](src/accounting/README.md) for detailed documentation
- Review [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) for migration details
- Check [docs/TESTPLAN.md](docs/TESTPLAN.md) for test scenarios

---

**Ready to go!** Your Node.js accounting system is ready to run. 🚀
