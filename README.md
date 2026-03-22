# Rawad · رواد

Fleet management and booking infrastructure for car rentals.

## What's inside?

This monorepo is powered by:

- 🌐 [Next.js](https://nextjs.org/) — Agent dashboard and customer self-checkout (App Router)
- 📱 [Expo](https://expo.dev/) — Mobile app (React Native)
- ⚡ [Convex](https://convex.dev/) — Backend, real-time data, and serverless functions
- 📦 [pnpm workspaces](https://pnpm.io/workspaces) — Monorepo package management

## AI assistant

This project uses [Claude Code](https://claude.ai/claude-code) as its AI coding assistant. Claude has full context of the product brief, tech stack, and architectural decisions for Rawad.

To start a session:

```bash
claude
```

Claude will pick up where you left off. The product brief is at `.claude/PRODUCT_BRIEF.md` — read it first if you're new to the project.

## Get started

Install dependencies (using [pnpm](https://pnpm.io))

```bash
pnpm install
```