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
│   │   ├── common.steps.ts               # Shared step definitions (e.g. login)
│   │   ├── search/
│   │   │   └── Tc1-searchGame/
│   │   │       ├── search.feature         # Gherkin feature file
│   │   │       └── search.steps.ts        # Step definitions
│   │   └── signup/                        # (placeholder for signup tests)
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
│       ├── types.d.ts                     # TypeScript type declarations
│       └── viewports.ts                   # Device viewport presets
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

## Common Steps

Shared Gherkin steps live in `cypress/e2e/common.steps.ts` and are available to every feature file. This avoids duplicating frequently used step definitions.

| Step | Action |
| ---- | ------ |
| `Given Common Step: I am logged in` | Calls `cy.login()` — authenticates via the UI overlay using `.env` credentials |

To add new common steps, append them to `common.steps.ts` and prefix the step text with **"Common Step:"** so it is immediately clear the definition is shared.

---

## Viewports

The framework ships with five device presets defined in `cypress/support/viewports.ts`. The global `beforeEach` hook in `e2e.ts` reads the `device` environment variable and calls `cy.viewport()` before every test.

| Key | Device | Width | Height |
| --- | ------ | ----: | -----: |
| `iphone` | iPhone 14 | 390 | 844 |
| `pixel` | Google Pixel 8 | 412 | 915 |
| `samsung` | Samsung Galaxy S24 | 360 | 780 |
| `tablet` | iPad Air | 820 | 1180 |
| `desktop` | Standard Monitor (default) | 1280 | 720 |

> If no `device` is specified, tests default to **desktop** (1280 x 720), which also matches the `viewportWidth` / `viewportHeight` fallback in `cypress.config.ts`.

### Running tests on a specific viewport

Pass the `device` key via the `--env` flag:

```bash
# Desktop (default — no flag needed)
npx cypress run

# iPhone 14
npx cypress run --env device=iphone

# Google Pixel 8
npx cypress run --env device=pixel

# Samsung Galaxy S24
npx cypress run --env device=samsung

# iPad Air
npx cypress run --env device=tablet

# Combine with other env flags (e.g. Cucumber tags)
npx cypress run --env device=tablet,TAGS='@smoke'

# Interactive runner on a mobile viewport
npx cypress open --env device=iphone
```

Using the npm scripts:

```bash
# npm run shorthand + viewport override
npm run cy:run -- --env device=iphone
npm run cy:run:chrome -- --env device=tablet
npm run cy:run:headed -- --env device=samsung
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

# Run all tests headlessly (desktop viewport by default)
npx cypress run

# Run with headed browser
npx cypress run --headed

# Run in Chrome
npx cypress run --browser chrome

# Run in Firefox
npx cypress run --browser firefox

# Run only @smoke-tagged scenarios
npx cypress run --env TAGS='@smoke'

# Run on a mobile viewport
npx cypress run --env device=iphone

# Run on tablet in headed Chrome
npx cypress run --headed --browser chrome --env device=tablet

# Type-check without running
npx tsc --noEmit
```

Using npm scripts:

```bash
npm run cy:open            # Interactive runner
npm run cy:run             # Headless run
npm run cy:run:headed      # Headed run
npm run cy:run:chrome      # Chrome
npm run cy:run:firefox     # Firefox
npm run cy:run:smoke       # @smoke tag only
npm test                   # Alias for cy:run
npm run typecheck          # TypeScript check
```

---

## Environment Variables

Defined in `.env` (loaded via `dotenv` in `cypress.config.ts`). Variables prefixed with `CYPRESS_` are automatically injected into `Cypress.env()` with the prefix stripped.

| Variable                | Description                       |
| ----------------------- | --------------------------------- |
| `CYPRESS_LOGIN_EMAIL`   | Email for `cy.login()` command    |
| `CYPRESS_LOGIN_PASSWORD`| Password for `cy.login()` command |
