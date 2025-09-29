# Megapot.io

Next.js 15.5.4 (App Router) + Tailwind CSS 4.1 + TypeScript + ESLint + Prettier

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

### Development

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality

```bash
pnpm lint         # Check for code quality issues
pnpm lint:fix     # Auto-fix linting issues
pnpm format       # Format all files with Prettier
pnpm format:check # Check if files are formatted
pnpm type-check   # Run TypeScript type checking
```

## Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) to automatically run code quality checks before commits and pushes.

### What happens automatically:

- **Before every commit**: Prettier format check and ESLint validation
- **Before every push**: Prettier format check and ESLint validation

### For new developers:

1. Clone the repository
2. Run `pnpm install` (hooks are set up automatically)
3. Start coding - hooks will run automatically!

### If checks fail:

- **Formatting issues**: Run `pnpm format` to fix
- **Linting issues**: Run `pnpm lint:fix` to auto-fix, or fix manually
- **Bypass hooks** (not recommended): Use `git push --no-verify`

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: Tailwind CSS 4.1
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Package Manager**: pnpm
- **Web3**: Ethers.js, Wagmi, Privy, TanStack Query
