## ✅ ESLint Setup

This project uses [ESLint](https://eslint.org/) with the modern **Flat Config** style and `@eslint/js` for linting JavaScript code in a Node.js environment.

### 📦 Installation

Install ESLint and the required packages:

```bash
npm install --save-dev eslint @eslint/js globals
```

## 🚀 ESLint + Prettier Setup (ESLint Flat Config)

This project uses ESLint v9+ with Flat Config and integrates Prettier for consistent code formatting.

### 📦 Installed Packages

```bash
npm install --save-dev eslint @eslint/js eslint-plugin-prettier eslint-config-prettier prettier globals
```

### conig
eslint.config.js
```javascript
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintPrettier from 'eslint-config-prettier';

const { rules: prettierRules } = eslintPrettier;

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierRules,
      'prettier/prettier': 'error',
    },
  },
]);
```

# Log Format and Archiving with Winston

### Log Format:
In Winston, logs are created in a **structured format** that includes:

- **Timestamp**: Each log entry is prefixed with a timestamp, making it easy to know when the log was generated.
- **Log Level**: Logs are classified by severity (e.g., `info`, `error`, `warn`), helping to identify the importance of the message.
- **Message**: The actual content or event being logged.

**Example log entry**:
[2025-05-09T10:00:00.000Z] INFO: User signed in successfully


### Log Archiving:
With **Winston's `winston-daily-rotate-file`** transport, logs are automatically rotated based on a schedule (e.g., daily). 

- **Old logs are compressed** into `.gz` format to save space.
- Logs are stored in a specific directory (e.g., `logs/`) and are automatically named by date (e.g., `app-2025-05-09.log`).
- After a specified time (e.g., 2 days), older logs are **deleted automatically**, keeping only the most recent logs.

This setup ensures that logs are well-organized, compressed to save space, and automatically rotated and deleted as per your retention policy.


# Swagger 
https://app.swaggerhub.com/apis/shruthik-d9d/coinpay