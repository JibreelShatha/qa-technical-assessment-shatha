# qa-technical-assessment-shatha

A Cypress automation framework using TypeScript and Gherkin BDD, featuring Page Object Model architecture for search workflows on SpinBet.

---

## Tech Stack

| Layer              | Technology                                         |
| ------------------ | -------------------------------------------------- |
| Test Runner        | [Cypress](https://www.cypress.io/) v15             |
| Language           | TypeScript 5                                       |
| BDD                | Gherkin via `@badeball/cypress-cucumber-preprocessor` |
| Bundler            | esbuild via `@bahmutov/cypress-esbuild-preprocessor` |
| Env Loading        | dotenv                                             |
| Design Pattern     | Page Object Model (POM) with Locators / Actions / Assertions / DataUtils |
| Target Application | [stage.spinbet.com](https://stage.spinbet.com)     |

---

## Project Structure

```
qa-technical-assessment-shatha/
├── cypress/
│   ├── e2e/
│   │   └── search/
│   │       └── Tc1-searchGame/
│   │           ├── search.feature         # Gherkin feature file
│   │           └── search.steps.ts        # Step definitions
│   ├── pages/                             # Page Object Model
│   │   ├── Locators/
│   │   │   └── LoginPage.ts               # Element selectors
│   │   ├── actions/
│   │   │   └── LoginActions.ts            # User interactions
│   │   ├── assertions/
│   │   │   └── LoginAssertions.ts         # Verifications
│   │   └── dataUtils/
│   │       └── LoginDataUtils.ts          # Test data helpers
│   └── support/
│       ├── commands.ts                    # Custom commands (cy.login, cy.waitForAppLoader)
│       ├── e2e.ts                         # Support file entry point
│       └── types.d.ts                     # TypeScript type declarations
├── .cypress-cucumber-preprocessorrc.json
├── .env                                   # Local env vars (git-ignored)
├── .env.example
├── cypress.config.ts
├── tsconfig.json
└── package.json
```

---

## Page Object Model Architecture

The framework separates concerns into four layers per page:

| Layer          | Responsibility                        | Example                          |
| -------------- | ------------------------------------- | -------------------------------- |
| **Locators**   | Element selectors                     | `LoginPage.ts` — getter properties returning `cy.get(...)` |
| **Actions**    | User interactions (click, type, etc.) | `LoginActions.ts` — `fillLoginForm()`, `submitLogin()` |
| **Assertions** | Verification / expectations           | `LoginAssertions.ts` — `verifyUserIsLoggedIn()` |
| **DataUtils**  | Test data generation & constants      | `LoginDataUtils.ts` — credential helpers |

Step definitions compose these layers — they never interact with the DOM directly.

---

## Custom Commands

### `cy.login(email?, password?)`

Logs in via the UI login overlay modal. Opens `/?overlay=login`, fills credentials, and clicks Sign In. Falls back to `LOGIN_EMAIL` / `LOGIN_PASSWORD` env variables when no arguments are provided.

```typescript
// Use .env defaults
cy.login();

// Or provide explicit credentials
cy.login('user@example.com', 'P@ssw0rd');
```

### `cy.waitForAppLoader()`

Waits up to 30 seconds for the app loader spinner (`<img alt="app loader">`) to disappear from the DOM. Called automatically in the global `beforeEach` hook so every test waits for the page to be ready.

```typescript
cy.waitForAppLoader();
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd qa-technical-assessment-shatha

# Install dependencies
npm install

# Copy and fill environment variables
cp .env.example .env
```

### Running Tests

```bash
# Open Cypress Test Runner (interactive)
npx cypress open

# Run all tests headlessly
npx cypress run

# Run with headed browser
npx cypress run --headed

# Run in Chrome
npx cypress run --browser chrome

# Type-check without running
npx tsc --noEmit
```

---

## Environment Variables

Defined in `.env` (loaded via `dotenv` in `cypress.config.ts`). Variables prefixed with `CYPRESS_` are automatically injected into `Cypress.env()` with the prefix stripped.

| Variable                | Description                       |
| ----------------------- | --------------------------------- |
| `CYPRESS_LOGIN_EMAIL`   | Email for `cy.login()` command    |
| `CYPRESS_LOGIN_PASSWORD`| Password for `cy.login()` command |
