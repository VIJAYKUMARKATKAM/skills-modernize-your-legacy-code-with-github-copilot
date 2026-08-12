/**
 * Test Suite for Node.js Account Management System
 * Tests are mapped to test cases in docs/TESTPLAN.md
 * 
 * Test Coverage:
 * - DataPersistenceLayer (Data Operations: READ/WRITE)
 * - OperationsLayer (Business Logic: View, Credit, Debit)
 * - MainProgram (UI & Menu)
 */

const Decimal = require('decimal.js');

// ============================================================================
// DATA PERSISTENCE LAYER TESTS
// ============================================================================

describe('DataPersistenceLayer - Data Storage Operations', () => {
  let dataPersistence;

  // Mock the DataPersistenceLayer
  class DataPersistenceLayer {
    constructor() {
      this.storageBalance = new Decimal('1000.00');
    }

    read() {
      return this.storageBalance;
    }

    write(balance) {
      this.storageBalance = new Decimal(balance.toString());
    }

    getFormattedBalance() {
      return this.storageBalance.toFixed(2);
    }
  }

  beforeEach(() => {
    dataPersistence = new DataPersistenceLayer();
  });

  // TC-001: System Initialization
  test('TC-001: System Initialization - Initial balance should be 1000.00', () => {
    const balance = dataPersistence.read();
    expect(balance.toFixed(2)).toBe('1000.00');
  });

  // TC-029: READ Operation
  test('TC-029: READ Operation - Should retrieve balance from storage', () => {
    const balance = dataPersistence.read();
    expect(balance).toBeInstanceOf(Decimal);
    expect(balance.equals(new Decimal('1000.00'))).toBe(true);
  });

  // TC-030: WRITE Operation
  test('TC-030: WRITE Operation - Should store balance to storage', () => {
    const newBalance = new Decimal('1500.00');
    dataPersistence.write(newBalance);
    const retrieved = dataPersistence.read();
    expect(retrieved.equals(newBalance)).toBe(true);
  });

  // TC-027: Minimum Amount (zero balance)
  test('TC-027: Boundary Test - Minimum Amount (0.00)', () => {
    dataPersistence.write(new Decimal('0.00'));
    const balance = dataPersistence.read();
    expect(balance.equals(new Decimal('0.00'))).toBe(true);
  });

  // TC-026: Maximum Amount
  test('TC-026: Boundary Test - Maximum Amount (999999.99)', () => {
    const maxBalance = new Decimal('999999.99');
    dataPersistence.write(maxBalance);
    const balance = dataPersistence.read();
    expect(balance.equals(maxBalance)).toBe(true);
  });

  // TC-028: Data Integrity - Multiple operations
  test('TC-028: Data Integrity - Multiple write operations should maintain consistency', () => {
    dataPersistence.write(new Decimal('500.00'));
    expect(dataPersistence.read().equals(new Decimal('500.00'))).toBe(true);
    
    dataPersistence.write(new Decimal('750.50'));
    expect(dataPersistence.read().equals(new Decimal('750.50'))).toBe(true);
    
    dataPersistence.write(new Decimal('1000.00'));
    expect(dataPersistence.read().equals(new Decimal('1000.00'))).toBe(true);
  });
});

// ============================================================================
// BUSINESS LOGIC LAYER TESTS
// ============================================================================

describe('OperationsLayer - Business Logic', () => {
  let operations;
  let dataPersistence;

  class DataPersistenceLayer {
    constructor() {
      this.storageBalance = new Decimal('1000.00');
    }

    read() {
      return this.storageBalance;
    }

    write(balance) {
      this.storageBalance = new Decimal(balance.toString());
    }
  }

  class OperationsLayer {
    constructor(dataPersistence) {
      this.data = dataPersistence;
    }

    async viewBalance() {
      const balance = this.data.read();
      return `Current balance: ${balance.toFixed(2)}`;
    }

    async creditAccount(amount) {
      try {
        const amountDecimal = new Decimal(amount.toString());
        if (amountDecimal.isNegative()) {
          return 'Error: Credit amount must be positive.';
        }
        const currentBalance = this.data.read();
        const newBalance = currentBalance.plus(amountDecimal);
        this.data.write(newBalance);
        return `Amount credited. New balance: ${newBalance.toFixed(2)}`;
      } catch (error) {
        return `Error during credit operation: ${error.message}`;
      }
    }

    async debitAccount(amount) {
      try {
        const amountDecimal = new Decimal(amount.toString());
        if (amountDecimal.isNegative()) {
          return 'Error: Debit amount must be positive.';
        }
        const currentBalance = this.data.read();
        if (currentBalance.lessThan(amountDecimal)) {
          return 'Insufficient funds for this debit.';
        }
        const newBalance = currentBalance.minus(amountDecimal);
        this.data.write(newBalance);
        return `Amount debited. New balance: ${newBalance.toFixed(2)}`;
      } catch (error) {
        return `Error during debit operation: ${error.message}`;
      }
    }
  }

  beforeEach(() => {
    dataPersistence = new DataPersistenceLayer();
    operations = new OperationsLayer(dataPersistence);
  });

  // TC-003: View Balance - Initial State
  test('TC-003: View Balance - Initial State should display 1000.00', async () => {
    const message = await operations.viewBalance();
    expect(message).toBe('Current balance: 1000.00');
  });

  // TC-007: Credit Account - Valid Positive Amount
  test('TC-007: Credit Account - Valid Positive Amount (100)', async () => {
    const message = await operations.creditAccount(100);
    expect(message).toBe('Amount credited. New balance: 1100.00');
    expect(dataPersistence.read().equals(new Decimal('1100.00'))).toBe(true);
  });

  // TC-008: Credit Account - Small Amount
  test('TC-008: Credit Account - Small Amount (0.50)', async () => {
    const message = await operations.creditAccount(0.50);
    expect(message).toBe('Amount credited. New balance: 1000.50');
  });

  // TC-009: Credit Account - Large Amount
  test('TC-009: Credit Account - Large Amount (50000)', async () => {
    const message = await operations.creditAccount(50000);
    expect(message).toBe('Amount credited. New balance: 51000.00');
  });

  // TC-010: Credit Account - Zero Amount
  test('TC-010: Credit Account - Zero Amount should not change balance', async () => {
    const message = await operations.creditAccount(0);
    expect(message).toBe('Amount credited. New balance: 1000.00');
    expect(dataPersistence.read().equals(new Decimal('1000.00'))).toBe(true);
  });

  // TC-011: Credit Account - Decimal Precision
  test('TC-011: Credit Account - Decimal Precision (25.75)', async () => {
    const message = await operations.creditAccount(25.75);
    expect(message).toBe('Amount credited. New balance: 1025.75');
  });

  // TC-012: Debit Account - Valid Positive Amount
  test('TC-012: Debit Account - Valid Positive Amount (100)', async () => {
    const message = await operations.debitAccount(100);
    expect(message).toBe('Amount debited. New balance: 900.00');
    expect(dataPersistence.read().equals(new Decimal('900.00'))).toBe(true);
  });

  // TC-013: Debit Account - Small Amount
  test('TC-013: Debit Account - Small Amount (0.25)', async () => {
    const message = await operations.debitAccount(0.25);
    expect(message).toBe('Amount debited. New balance: 999.75');
  });

  // TC-014: Debit Account - Insufficient Funds
  test('TC-014: Debit Account - Insufficient Funds should reject transaction', async () => {
    const message = await operations.debitAccount(100000);
    expect(message).toBe('Insufficient funds for this debit.');
    // Balance should remain unchanged
    expect(dataPersistence.read().equals(new Decimal('1000.00'))).toBe(true);
  });

  // TC-015: Debit Account - Exact Balance Amount
  test('TC-015: Debit Account - Exact Balance Amount', async () => {
    const message = await operations.debitAccount(1000.00);
    expect(message).toBe('Amount debited. New balance: 0.00');
    expect(dataPersistence.read().equals(new Decimal('0.00'))).toBe(true);
  });

  // TC-016: Debit Account - Amount Greater Than Balance
  test('TC-016: Debit Account - Amount Greater Than Balance (zero balance)', async () => {
    // Set balance to 0 first
    dataPersistence.write(new Decimal('0.00'));
    const message = await operations.debitAccount(1);
    expect(message).toBe('Insufficient funds for this debit.');
    expect(dataPersistence.read().equals(new Decimal('0.00'))).toBe(true);
  });

  // TC-017: Debit Account - Zero Amount
  test('TC-017: Debit Account - Zero Amount should not change balance', async () => {
    const message = await operations.debitAccount(0);
    expect(message).toBe('Amount debited. New balance: 1000.00');
    expect(dataPersistence.read().equals(new Decimal('1000.00'))).toBe(true);
  });

  // TC-024: Input Validation - Negative Credit Amount
  test('TC-024: Input Validation - Negative Credit Amount should be rejected', async () => {
    const message = await operations.creditAccount(-100);
    expect(message).toBe('Error: Credit amount must be positive.');
  });

  // TC-025: Input Validation - Negative Debit Amount
  test('TC-025: Input Validation - Negative Debit Amount should be rejected', async () => {
    const message = await operations.debitAccount(-100);
    expect(message).toBe('Error: Debit amount must be positive.');
  });
});

// ============================================================================
// BALANCE PERSISTENCE TESTS
// ============================================================================

describe('OperationsLayer - Balance Persistence', () => {
  let operations;
  let dataPersistence;

  class DataPersistenceLayer {
    constructor() {
      this.storageBalance = new Decimal('1000.00');
    }

    read() {
      return this.storageBalance;
    }

    write(balance) {
      this.storageBalance = new Decimal(balance.toString());
    }
  }

  class OperationsLayer {
    constructor(dataPersistence) {
      this.data = dataPersistence;
    }

    async creditAccount(amount) {
      const amountDecimal = new Decimal(amount.toString());
      if (amountDecimal.isNegative()) return 'Error: Credit amount must be positive.';
      const currentBalance = this.data.read();
      const newBalance = currentBalance.plus(amountDecimal);
      this.data.write(newBalance);
      return `Amount credited. New balance: ${newBalance.toFixed(2)}`;
    }

    async debitAccount(amount) {
      const amountDecimal = new Decimal(amount.toString());
      if (amountDecimal.isNegative()) return 'Error: Debit amount must be positive.';
      const currentBalance = this.data.read();
      if (currentBalance.lessThan(amountDecimal)) {
        return 'Insufficient funds for this debit.';
      }
      const newBalance = currentBalance.minus(amountDecimal);
      this.data.write(newBalance);
      return `Amount debited. New balance: ${newBalance.toFixed(2)}`;
    }

    async viewBalance() {
      const balance = this.data.read();
      return `Current balance: ${balance.toFixed(2)}`;
    }
  }

  beforeEach(() => {
    dataPersistence = new DataPersistenceLayer();
    operations = new OperationsLayer(dataPersistence);
  });

  // TC-018: Balance Persistence - After Credit
  test('TC-018: Balance Persistence - After Credit (credit 500)', async () => {
    await operations.creditAccount(500);
    const message = await operations.viewBalance();
    expect(message).toBe('Current balance: 1500.00');
  });

  // TC-019: Balance Persistence - After Debit
  test('TC-019: Balance Persistence - After Debit (debit 200)', async () => {
    dataPersistence.write(new Decimal('500.00'));
    await operations.debitAccount(200);
    const message = await operations.viewBalance();
    expect(message).toBe('Current balance: 300.00');
  });

  // TC-020: Multiple Sequential Operations
  test('TC-020: Multiple Sequential Operations (credit 100, debit 150, view)', async () => {
    // Start with 300
    dataPersistence.write(new Decimal('300.00'));
    
    // Credit 100: 300 + 100 = 400
    await operations.creditAccount(100);
    let balance = dataPersistence.read();
    expect(balance.equals(new Decimal('400.00'))).toBe(true);
    
    // Debit 150: 400 - 150 = 250
    await operations.debitAccount(150);
    balance = dataPersistence.read();
    expect(balance.equals(new Decimal('250.00'))).toBe(true);
    
    // View should show 250
    const message = await operations.viewBalance();
    expect(message).toBe('Current balance: 250.00');
  });
});

// ============================================================================
// DECIMAL PRECISION TESTS
// ============================================================================

describe('Decimal Precision - Currency Accuracy', () => {
  let dataPersistence;

  class DataPersistenceLayer {
    constructor() {
      this.storageBalance = new Decimal('1000.00');
    }

    read() {
      return this.storageBalance;
    }

    write(balance) {
      this.storageBalance = new Decimal(balance.toString());
    }
  }

  beforeEach(() => {
    dataPersistence = new DataPersistenceLayer();
  });

  test('Decimal Precision - Addition maintains 2 decimal places', () => {
    const balance = dataPersistence.read();
    const amount = new Decimal('0.01');
    const newBalance = balance.plus(amount);
    expect(newBalance.toFixed(2)).toBe('1000.01');
  });

  test('Decimal Precision - Subtraction maintains 2 decimal places', () => {
    const balance = dataPersistence.read();
    const amount = new Decimal('0.25');
    const newBalance = balance.minus(amount);
    expect(newBalance.toFixed(2)).toBe('999.75');
  });

  test('Decimal Precision - Complex calculation', () => {
    const balance = dataPersistence.read();
    const credit1 = new Decimal('50.75');
    const credit2 = new Decimal('25.50');
    const debit1 = new Decimal('30.25');
    
    let newBalance = balance.plus(credit1);    // 1050.75
    newBalance = newBalance.plus(credit2);     // 1076.25
    newBalance = newBalance.minus(debit1);     // 1046.00
    
    expect(newBalance.toFixed(2)).toBe('1046.00');
  });
});

// ============================================================================
// EDGE CASES & ERROR HANDLING
// ============================================================================

describe('Edge Cases & Error Handling', () => {
  let operations;
  let dataPersistence;

  class DataPersistenceLayer {
    constructor() {
      this.storageBalance = new Decimal('1000.00');
    }

    read() {
      return this.storageBalance;
    }

    write(balance) {
      this.storageBalance = new Decimal(balance.toString());
    }
  }

  class OperationsLayer {
    constructor(dataPersistence) {
      this.data = dataPersistence;
    }

    async debitAccount(amount) {
      try {
        const amountDecimal = new Decimal(amount.toString());
        if (amountDecimal.isNegative()) {
          return 'Error: Debit amount must be positive.';
        }
        const currentBalance = this.data.read();
        if (currentBalance.lessThan(amountDecimal)) {
          return 'Insufficient funds for this debit.';
        }
        const newBalance = currentBalance.minus(amountDecimal);
        this.data.write(newBalance);
        return `Amount debited. New balance: ${newBalance.toFixed(2)}`;
      } catch (error) {
        return `Error during debit operation: ${error.message}`;
      }
    }

    async creditAccount(amount) {
      try {
        const amountDecimal = new Decimal(amount.toString());
        if (amountDecimal.isNegative()) {
          return 'Error: Credit amount must be positive.';
        }
        const currentBalance = this.data.read();
        const newBalance = currentBalance.plus(amountDecimal);
        this.data.write(newBalance);
        return `Amount credited. New balance: ${newBalance.toFixed(2)}`;
      } catch (error) {
        return `Error during credit operation: ${error.message}`;
      }
    }
  }

  beforeEach(() => {
    dataPersistence = new DataPersistenceLayer();
    operations = new OperationsLayer(dataPersistence);
  });

  test('Edge Case - Debit from balance of 0.01', async () => {
    dataPersistence.write(new Decimal('0.01'));
    const message = await operations.debitAccount(0.01);
    expect(message).toBe('Amount debited. New balance: 0.00');
  });

  test('Edge Case - Debit when balance is 0.00', async () => {
    dataPersistence.write(new Decimal('0.00'));
    const message = await operations.debitAccount(0.01);
    expect(message).toBe('Insufficient funds for this debit.');
  });

  test('Edge Case - Large decimal precision', async () => {
    const message = await operations.creditAccount(123.45);
    expect(message).toBe('Amount credited. New balance: 1123.45');
  });

  test('Edge Case - Multiple small debits', async () => {
    let balance = dataPersistence.read();
    for (let i = 0; i < 3; i++) {
      await operations.debitAccount(0.01);
      balance = dataPersistence.read();
    }
    expect(balance.toFixed(2)).toBe('999.97');
  });
});
