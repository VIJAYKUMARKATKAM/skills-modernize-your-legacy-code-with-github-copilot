---
agent: 'agent'
model: 'gpt-4.1'
description: 'Run the Node.js accounting application'
---

# Run Node.js Accounting Application

This prompt runs the Node.js version of the student account management system.

## Steps

1. Navigate to the accounting application directory:

   ```bash
   cd src/accounting
   ```

2. Install dependencies (if not already installed):

   ```bash
   npm install
   ```

3. Start the application in interactive mode:

   ```bash
   npm start
   ```

4. Use the menu to interact with the application:
   - Press `1` to view account balance
   - Press `2` to credit (deposit) funds
   - Press `3` to debit (withdraw) funds
   - Press `4` to exit the application

## Output

The application displays an interactive menu for managing account operations:

```
Account Management System
1. View Balance
2. Credit Account
3. Debit Account
4. Exit
```

## Notes

- The Node.js application is a direct port of the original COBOL system
- All business logic and validation rules are preserved
- Uses Decimal.js for precise currency calculations (2 decimal places)
- Initial balance starts at $1,000.00
