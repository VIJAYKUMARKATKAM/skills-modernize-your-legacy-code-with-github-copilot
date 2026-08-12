#!/usr/bin/env node

/**
 * Mergington High School - Student Account Management System
 * Converted from COBOL to Node.js
 * 
 * Original COBOL Architecture:
 * - MainProgram (main.cob): User Interface & Flow Control
 * - Operations (operations.cob): Business Logic & Transaction Handler
 * - DataProgram (data.cob): Data Persistence Layer
 * 
 * This Node.js version preserves the original three-layer architecture
 */

const readline = require('readline');
const Decimal = require('decimal.js');

// ============================================================================
// DATA PERSISTENCE LAYER (equivalent to DataProgram in COBOL)
// ============================================================================

class DataPersistenceLayer {
  constructor() {
    /**
     * STORAGE-BALANCE equivalent: PIC 9(6)V99
     * Stores account balance with 2 decimal precision
     * Default value: 1000.00 (initial account funding)
     */
    this.storageBalance = new Decimal('1000.00');
  }

  /**
   * READ Operation: Retrieves the stored balance from memory
   * Equivalent to COBOL: IF OPERATION-TYPE = 'READ'
   * @returns {Decimal} Current balance
   */
  read() {
    return this.storageBalance;
  }

  /**
   * WRITE Operation: Persists the updated balance to storage
   * Equivalent to COBOL: IF OPERATION-TYPE = 'WRITE'
   * @param {Decimal} balance - The new balance to store
   */
  write(balance) {
    this.storageBalance = new Decimal(balance.toString());
  }

  /**
   * Get current balance for display
   * @returns {string} Balance formatted to 2 decimal places
   */
  getFormattedBalance() {
    return this.storageBalance.toFixed(2);
  }
}

// ============================================================================
// BUSINESS LOGIC LAYER (equivalent to Operations in COBOL)
// ============================================================================

class OperationsLayer {
  constructor(dataPersistence) {
    this.data = dataPersistence;
  }

  /**
   * TOTAL Operation - View Balance
   * Equivalent to COBOL: IF OPERATION-TYPE = 'TOTAL '
   * Retrieves and displays the current account balance
   * @returns {Promise<string>} Display message with current balance
   */
  async viewBalance() {
    const balance = this.data.read();
    return `Current balance: ${balance.toFixed(2)}`;
  }

  /**
   * CREDIT Operation - Add Funds
   * Equivalent to COBOL: ELSE IF OPERATION-TYPE = 'CREDIT'
   * Prompts for amount, adds to balance, saves to storage
   * 
   * Process:
   * 1. Get credit amount from user
   * 2. Call DataProgram READ → retrieves current balance
   * 3. ADD amount to balance
   * 4. Call DataProgram WRITE → saves updated balance
   * 5. Display confirmation with new balance
   * 
   * @param {Decimal} amount - Amount to credit
   * @returns {Promise<string>} Confirmation message with new balance
   */
  async creditAccount(amount) {
    try {
      const amountDecimal = new Decimal(amount.toString());
      
      // Validate positive amount
      if (amountDecimal.isNegative()) {
        return 'Error: Credit amount must be positive.';
      }

      // READ operation - retrieve current balance
      const currentBalance = this.data.read();
      
      // ADD amount to balance
      const newBalance = currentBalance.plus(amountDecimal);
      
      // WRITE operation - persist updated balance
      this.data.write(newBalance);
      
      return `Amount credited. New balance: ${newBalance.toFixed(2)}`;
    } catch (error) {
      return `Error during credit operation: ${error.message}`;
    }
  }

  /**
   * DEBIT Operation - Withdraw Funds
   * Equivalent to COBOL: ELSE IF OPERATION-TYPE = 'DEBIT '
   * Prompts for amount, validates funds, deducts from balance
   * 
   * Business Rule: Overdrafts are NOT permitted
   * Process:
   * 1. Get debit amount from user
   * 2. Call DataProgram READ → retrieves current balance
   * 3. Validate: IF FINAL-BALANCE >= AMOUNT
   *    - If YES: SUBTRACT amount from balance, WRITE to storage, confirm
   *    - If NO: Reject transaction, display error, return to menu
   * 4. Display result
   * 
   * @param {Decimal} amount - Amount to debit
   * @returns {Promise<string>} Status message with result
   */
  async debitAccount(amount) {
    try {
      const amountDecimal = new Decimal(amount.toString());
      
      // Validate positive amount
      if (amountDecimal.isNegative()) {
        return 'Error: Debit amount must be positive.';
      }

      // READ operation - retrieve current balance
      const currentBalance = this.data.read();
      
      // Validate sufficient funds (critical business rule)
      if (currentBalance.lessThan(amountDecimal)) {
        return 'Insufficient funds for this debit.';
      }
      
      // SUBTRACT amount from balance
      const newBalance = currentBalance.minus(amountDecimal);
      
      // WRITE operation - persist updated balance
      this.data.write(newBalance);
      
      return `Amount debited. New balance: ${newBalance.toFixed(2)}`;
    } catch (error) {
      return `Error during debit operation: ${error.message}`;
    }
  }
}

// ============================================================================
// USER INTERFACE LAYER (equivalent to MainProgram in COBOL)
// ============================================================================

class MainProgram {
  constructor(operations) {
    this.operations = operations;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false // Disable terminal mode for cleaner testing
    });
  }

  /**
   * Display the main menu
   * Equivalent to COBOL menu display in MainProgram
   */
  displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  }

  /**
   * Prompt user for input
   * @param {string} question - The prompt question
   * @returns {Promise<string>} User input
   */
  getUserInput(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  /**
   * Prompt user for numeric input (menu choice)
   * @returns {Promise<number>} User's menu choice
   */
  async getMenuChoice() {
    this.displayMenu();
    const input = await this.getUserInput('Enter your choice (1-4): ');
    return parseInt(input, 10);
  }

  /**
   * Prompt user for amount input
   * @param {string} operationType - 'credit' or 'debit'
   * @returns {Promise<Decimal>} User's amount input
   */
  async getAmountInput(operationType) {
    const prompt = operationType === 'credit' 
      ? 'Enter credit amount: ' 
      : 'Enter debit amount: ';
    const input = await this.getUserInput(prompt);
    return new Decimal(input);
  }

  /**
   * Main program loop
   * Equivalent to COBOL: PERFORM UNTIL CONTINUE-FLAG = 'NO'
   * 
   * Flow:
   * 1. Display menu
   * 2. Get user choice (1-4)
   * 3. EVALUATE user choice:
   *    - WHEN 1: CALL 'Operations' USING 'TOTAL '
   *    - WHEN 2: CALL 'Operations' USING 'CREDIT'
   *    - WHEN 3: CALL 'Operations' USING 'DEBIT '
   *    - WHEN 4: MOVE 'NO' TO CONTINUE-FLAG
   *    - WHEN OTHER: Display "Invalid choice, please select 1-4."
   * 4. Return to menu (unless Exit selected)
   */
  async run() {
    let continueFlag = true;

    while (continueFlag) {
      try {
        const choice = await this.getMenuChoice();

        switch (choice) {
          case 1:
            // CALL 'Operations' USING 'TOTAL '
            const balanceMessage = await this.operations.viewBalance();
            console.log(balanceMessage);
            break;

          case 2:
            // CALL 'Operations' USING 'CREDIT'
            const creditAmount = await this.getAmountInput('credit');
            const creditMessage = await this.operations.creditAccount(creditAmount);
            console.log(creditMessage);
            break;

          case 3:
            // CALL 'Operations' USING 'DEBIT '
            const debitAmount = await this.getAmountInput('debit');
            const debitMessage = await this.operations.debitAccount(debitAmount);
            console.log(debitMessage);
            break;

          case 4:
            // MOVE 'NO' TO CONTINUE-FLAG
            continueFlag = false;
            break;

          default:
            // WHEN OTHER
            console.log('Invalid choice, please select 1-4.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    console.log('Exiting the program. Goodbye!');
    this.rl.close();
  }
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

/**
 * Initialize and run the application
 * Architecture mirrors the COBOL three-layer design:
 * MainProgram -> Operations -> DataProgram
 */
async function main() {
  // Layer 1: Data Persistence (DataProgram equivalent)
  const dataPersistence = new DataPersistenceLayer();

  // Layer 2: Business Logic (Operations equivalent)
  const operations = new OperationsLayer(dataPersistence);

  // Layer 3: User Interface (MainProgram equivalent)
  const mainProgram = new MainProgram(operations);

  // Run the application
  await mainProgram.run();
}

// Entry point
main().catch(console.error);
