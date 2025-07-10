# Development Setup

This project uses Husky and lint-staged to ensure code quality and consistency.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Shadcn

## Setup

1. Install dependencies:
   \`\`\`bash
   yarn install
   \`\`\`

2. Install Husky hooks:
   \`\`\`bash
   yarn prepare
   \`\`\`

## Code Quality Tools

### ESLint

- Lints TypeScript and React code
- Automatically fixes issues when possible
- Run manually: `yarn lint` or `yarn lint:fix`

### Prettier

- Formats code consistently
- Runs automatically on save (if VS Code is configured)
- Run manually: `yarn format` or `yarn format:check`

### Husky Hooks

#### Pre-commit Hook

- Runs `lint-staged` before each commit
- Lints and formats only staged files
- Prevents commits with linting errors

#### Commit Message Hook (Optional)

- Validates commit messages follow conventional format
- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert

## Workflow

1. Make your changes
2. Stage files: `git add .`
3. Commit: `git commit -m "feat: add new feature"`
4. Hooks will automatically run:
   - Lint and format staged files
   - Validate commit message format
5. If hooks pass, commit is created
6. If hooks fail, fix issues and try again

## Commands

\`\`\`bash

# Development

yarn dev # Start development server
yarn build # Build for production
yarn preview # Preview production build

# Code Quality

yarn lint # Run ESLint
yarn lint:fix # Run ESLint with auto-fix
yarn format # Format code with Prettier
yarn format:check # Check if code is formatted
yarn type-check # Run TypeScript type checking

# Git Hooks

yarn prepare # Install Husky hooks
\`\`\`

## VS Code Setup

Install recommended extensions:

- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features

The `.vscode/settings.json` file is configured to:

- Format on save
- Auto-fix ESLint issues
- Organize imports
- Use Prettier as default formatter

## Troubleshooting

### Hooks not running

\`\`\`bash
yarn husky install
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
\`\`\`

### Skip hooks (emergency only)

\`\`\`bash
git commit --no-verify -m "emergency fix"
\`\`\`

### Reset hooks

\`\`\`bash
rm -rf .husky
yarn husky install
yarn husky add .husky/pre-commit "yarn lint-staged"
