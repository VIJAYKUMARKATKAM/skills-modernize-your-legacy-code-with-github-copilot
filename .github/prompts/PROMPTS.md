# Workspace Prompts

This document provides a reference guide for all available prompts in this workspace. Prompts are reusable task templates that can be invoked to automate specific workflows.

## Available Prompts

### 1. Run COBOL App

**File**: [`runCobolApp.prompt.md`](./runCobolApp.prompt.md)

**Description**: Compile and run the Cobol accounting system

**Agent**: `agent`

**Model**: `gpt-4.1`

**Purpose**: Automates the compilation and execution of the COBOL accounting system application.

**Steps**:
1. Compiles the COBOL application from source files:
   - `src/cobol/main.cob`
   - `src/cobol/operations.cob`
   - `src/cobol/data.cob`
2. Generates an executable called `accountsystem`
3. Runs the compiled application

**Usage**: Type `/runCobolApp` in the Copilot chat to invoke this prompt.

**Output**: 
- Compiled binary: `./accountsystem`
- Interactive menu for the account management system

---

## Prompt Structure

Each prompt file follows this YAML frontmatter format:

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
- **model**: Defines the LLM model for prompt execution
- **description**: A concise description used for prompt discovery and search

## Creating New Prompts

To create a new prompt in this workspace:

1. Create a new file with the naming pattern: `<name>.prompt.md`
2. Add the required YAML frontmatter with `agent`, `model`, and `description` fields
3. Write clear, step-by-step instructions for the task
4. Include code examples or commands where relevant
5. Add an entry to this `PROMPTS.md` file with metadata and usage instructions

### Example Template

```markdown
---
agent: 'agent'
model: 'gpt-4.1'
description: 'Brief description of what this prompt does'
---

# Task Title

Clear description of the task.

## Steps

1. First step with details
2. Second step with code example:

   \`\`\`bash
   command here
   \`\`\`

3. Continue as needed
```

## Prompt Discovery

Prompts can be invoked by:
- Typing `/` in the Copilot chat to see all available prompts and skills
- Searching by the description text
- Using the exact prompt name with `/` prefix

## Related Documentation

For more information on customizing Copilot behavior in this workspace:
- **Agent Instructions**: See `.github/copilot-instructions.md` or `.github/AGENTS.md`
- **File-level Instructions**: See `.github/instructions/` directory
- **Skills**: See `.github/skills/` directory
- **Customization Guide**: Refer to the agent-customization skill documentation

---

Last updated: 2026-08-12
