# Workspace Prompts

This document provides a comprehensive reference for all available prompts in this workspace. Prompts are reusable task templates that can be invoked to automate specific workflows and guide development tasks.

## Overview

The workspace includes 4 available prompts covering:
- Running the original COBOL application
- Running the modern Node.js application
- Running the comprehensive test suite
- Understanding the migration architecture

## Available Prompts

### 1. Run COBOL App

**File**: [`runCobolApp.prompt.md`](./runCobolApp.prompt.md)

**Description**: Compile and run the COBOL accounting system

**Agent**: `agent`

**Model**: `gpt-4.1`

**Purpose**: Automates the compilation and execution of the legacy COBOL accounting system application.

**Steps**:

1. Compiles the COBOL application from source files:
   - `src/cobol/main.cob`
   - `src/cobol/operations.cob`
   - `src/cobol/data.cob`
2. Generates an executable called `accountsystem`
3. Runs the compiled application interactively

**Usage**: Type `/runCobolApp` in the Copilot chat to invoke this prompt.

**Output**:

- Compiled binary: `./accountsystem`
- Interactive menu for the account management system

**When to Use**: Reference the original COBOL system behavior, validate requirements against original implementation

---

### 2. Run Node.js App

**File**: [`runNodeJsApp.prompt.md`](./runNodeJsApp.prompt.md)

**Description**: Run the Node.js accounting application

**Agent**: `agent`

**Model**: `gpt-4.1`

**Purpose**: Starts the modern Node.js port of the accounting system application with the same business logic and user interface.

**Steps**:

1. Navigate to `src/accounting` directory
2. Install dependencies via npm
3. Run the application with `npm start`
4. Interact with the same menu interface as the COBOL version

**Usage**: Type `/runNodeJsApp` in the Copilot chat to invoke this prompt.

**Output**:

- Interactive menu for account management
- Same operations as COBOL version
- Uses Decimal.js for precise currency calculations

**When to Use**: Test the modernized Node.js application, verify feature parity with COBOL

---

### 3. Run Tests

**File**: [`runTests.prompt.md`](./runTests.prompt.md)

**Description**: Run the accounting system test suite

**Agent**: `agent`

**Model**: `gpt-4.1`

**Purpose**: Executes the comprehensive unit test suite (30 tests) that validates all business logic and ensures the Node.js application matches COBOL behavior.

**Steps**:

1. Navigate to `src/accounting` directory
2. Install dependencies via npm
3. Run tests with `npm test` to get verbose output and coverage

**Usage**: Type `/runTests` in the Copilot chat to invoke this prompt.

**Output**:

- Test results: `30 passed, 30 total`
- Success rate: 100%
- Coverage information
- Execution time: ~0.3-0.5 seconds

**When to Use**: Validate that all business logic is preserved, verify no regressions after changes, quality assurance

**Test Categories Covered**:
- Data persistence (6 tests)
- Credit operations (5 tests)
- Debit operations (5 tests)
- Input validation (2 tests)
- Balance persistence (3 tests)
- Decimal precision (3 tests)
- Edge cases (1 test)

---

### 4. Migration Overview

**File**: [`migrationOverview.prompt.md`](./migrationOverview.prompt.md)

**Description**: Explain the COBOL to Node.js migration architecture

**Agent**: `agent`

**Model**: `gpt-4.1`

**Purpose**: Provides detailed documentation of how the legacy COBOL system was modernized to Node.js while preserving all business logic.

**Contents**:

- Three-layer architecture mapping (COBOL → Node.js)
- Layer explanations:
  - UI Layer (MainProgram)
  - Business Logic Layer (Operations)
  - Data Persistence Layer (DataProgram)
- Key improvements over COBOL
- Business logic preservation checklist

**Usage**: Type `/migrationOverview` in the Copilot chat to invoke this prompt.

**Output**:

- Detailed architecture explanations
- Cross-references to related documentation
- Migration highlights

**When to Use**: Understand the architecture, reference design patterns, onboard new developers, plan enhancements

---

## Prompt Structure

Each prompt file in this workspace follows a consistent YAML frontmatter format for compatibility with VS Code and GitHub Copilot:

```yaml
---
agent: 'agent'              # The agent to use for this prompt
model: 'gpt-4.1'            # The LLM model to use
description: 'Task description'  # Discovery phrase for the prompt
---

[Markdown content with detailed instructions]
```

### Frontmatter Fields

- **agent**: Specifies which agent should execute the prompt (typically `'agent'` for the default agent)
- **model**: Defines the LLM model for prompt execution (e.g., `gpt-4.1`, `gpt-4-turbo`)
- **description**: A concise description used for prompt discovery and search

## Quick Reference: All Prompts

| Prompt | File | Use Case |
|--------|------|----------|
| Run COBOL App | `runCobolApp.prompt.md` | Test original COBOL system |
| Run Node.js App | `runNodeJsApp.prompt.md` | Test modernized application |
| Run Tests | `runTests.prompt.md` | Validate business logic (30 tests) |
| Migration Overview | `migrationOverview.prompt.md` | Understand architecture & design |

## Creating New Prompts

To create a new prompt in this workspace:

1. **Create file**: Create a new file with naming pattern `<name>.prompt.md` in `.github/prompts/`
2. **Add frontmatter**: Include YAML frontmatter with `agent`, `model`, and `description` fields
3. **Write instructions**: Provide clear, step-by-step instructions for the task
4. **Add examples**: Include code examples or commands where relevant
5. **Register prompt**: Add an entry to this `PROMPTS.md` file with:
   - File location
   - Description
   - Purpose
   - Usage instructions
   - When to use

### Example Template

```markdown
---
agent: 'agent'
model: 'gpt-4.1'
description: 'Brief one-line description of what this prompt does'
---

# Task Title

Clear explanation of what this prompt accomplishes.

## Prerequisites

- List any required installations
- List any setup steps

## Steps

1. First step with details
2. Second step with code example:

   \`\`\`bash
   command here
   \`\`\`

3. Continue as needed

## Output

Expected output or results

## Notes

- Additional information
- Tips or warnings
```

### Best Practices

- **Description**: Keep to one line, use gerunds (e.g., "Run the test suite")
- **Steps**: Number steps clearly and include commands in code blocks
- **Examples**: Provide realistic examples that users can follow
- **Output**: Show expected output to help users verify success
- **Links**: Cross-reference related documentation and other prompts

## Prompt Discovery & Invocation

Prompts can be invoked and discovered through:

1. **Copilot Chat**: Type `/` to see all available prompts
2. **Search**: Filter by description text
3. **Direct Invocation**: Type `/promptName` to run directly
4. **Documentation**: Reference this file for all available options

### Example Invocations

```
/runNodeJsApp        # Start the Node.js application
/runTests            # Run test suite
/runCobolApp         # Compile and run COBOL
/migrationOverview   # Understand the architecture
```

## Maintenance & Updates

When updating prompts:

1. Update the prompt file itself with new steps
2. Update the `PROMPTS.md` entry with changes
3. Keep descriptions accurate and searchable
4. Remove or archive outdated prompts

## Related Documentation

For more information on customizing Copilot behavior in this workspace:

- **Agent Instructions**: See `.github/copilot-instructions.md` or `.github/AGENTS.md`
- **File-level Instructions**: See `.github/instructions/` directory
- **Skills**: See `.github/skills/` directory
- **Customization Guide**: Refer to the agent-customization skill documentation

---

Last updated: 2026-08-12
