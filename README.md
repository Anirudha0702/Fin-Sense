# Fin Sense

Fin Sense is a mobile-first personal finance app for tracking a monthly budget in Indian rupees. It is built with Expo and React Native, uses file-based navigation, and keeps its data locally in SQLite.

> **Project status:** The budget-setting flow and dashboard are functional. Transaction entry, transaction history, and analytics routes are scaffolded and awaiting their UI and data integrations.

## What is included

- A responsive light and dark theme that follows the device preference
- A home dashboard with a time-aware greeting and current-month budget card
- Monthly budget creation and updates in INR
- Local, offline-first SQLite persistence via Drizzle ORM
- Database migrations applied automatically when the app starts
- Expo Router navigation with Home, History, Pay, and Analytics tabs
- A settings screen and toast feedback for successful or failed budget updates

## Tech stack

| Area | Tooling |
| --- | --- |
| App framework | Expo SDK 58, React Native, React 19 |
| Navigation | Expo Router |
| Local database | Expo SQLite + Drizzle ORM |
| Styling | React Native styles and a shared theme |
| Language | TypeScript |
| Package manager | pnpm |

## Getting started

### Prerequisites

- Node.js (current LTS recommended)
- pnpm (enable with `corepack enable` if needed)
- Expo Go on a physical device, or an Android emulator / iOS Simulator

### Install and run

```bash
pnpm install
pnpm start
```

After the Expo development server starts, scan the QR code with Expo Go or choose a target from the terminal.

You can also start a specific platform directly:

```bash
pnpm android
pnpm ios
pnpm web
```

## Quality checks

Run these before opening a pull request:

```bash
pnpm lint
pnpm exec tsc --noEmit
```

## How it works

On first launch, the root layout runs the checked-in Drizzle migrations against a local `fin-sense.db` SQLite database. Setting a monthly budget inserts or updates the record for the current month and year. Budget amounts are stored in paise, so `₹1` is persisted as `100`; this avoids floating-point rounding errors.

The active dashboard currently reads the current month's budget from the database. Its spending display is still sample UI data until the transaction flow is connected.

## Project structure

```text
src/
├── app/                    # Expo Router routes and navigation layouts
│   ├── (tabs)/              # Home, History, Pay, and Analytics tabs
│   └── Settings.tsx         # Monthly-budget settings screen
├── components/              # Reusable dashboard and budget UI
├── constants/               # Theme tokens and transaction enums
├── database/
│   ├── schemas/             # Drizzle SQLite table definitions
│   └── repositories/        # Database access layer
├── hooks/                   # Shared React hooks
└── services/                # Input validation and domain logic

drizzle/                     # Generated SQL migrations and migration journal
assets/                      # App icons and splash assets
```

## Current routes

| Route | Purpose | Status |
| --- | --- | --- |
| `/` | Redirects to the tab navigator | Ready |
| `/(tabs)` | Home dashboard and monthly budget overview | Ready |
| `/Settings` | Set or update the current month's budget | Ready |
| `/(tabs)/Create` | Create a transaction | Scaffolded |
| `/(tabs)/Transactions` | Transaction history | Scaffolded |
| `/(tabs)/Analytics` | Spending analytics | Scaffolded |

## Data model

The app already defines tables for:

- **Budgets:** one record per month and year, with a unique month/year constraint.
- **Transactions:** title, optional description, amount, currency, payment method, category, and timestamps.

Supported payment methods are UPI, cash, credit card, debit card, and bank transfer. Transaction categories include food, travel, shopping, bills, entertainment, health, and others.

## License

This project is licensed under the [MIT License](LICENSE).
