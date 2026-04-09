# qa-technical-assessment-shatha

Cypress + TypeScript + Gherkin BDD test framework for [VegaStars](https://www.vegastars5.com/). Uses Page Object Model to cover login, search, and game-launch flows.

---

## Tech Stack

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| Test Runner    | [Cypress](https://www.cypress.io/) v15                        |
| Language       | TypeScript 5                                                  |
| BDD            | Gherkin via `@badeball/cypress-cucumber-preprocessor`         |
| Bundler        | esbuild via `@bahmutov/cypress-esbuild-preprocessor`          |
| Reporter       | Mochawesome (JSON per run, merged into a single HTML report)  |
| CI             | GitHub Actions                                                |
| Design Pattern | Page Object Model — Locators / Actions / Assertions / DataUtils |

---

## Project Structure

```
qa-technical-assessment-shatha/
├── .github/workflows/
│   └── cypress-tests.yml              # CI pipeline (typecheck → API → smoke → full → report)
├── cypress/
│   ├── e2e/
│   │   ├── common/
│   │   │   └── common.steps.ts        # Shared step definitions (login, open search)
│   │   ├── login/
│   │   │   ├── TC_userLogin/
│   │   │   │   ├── userLogin.feature
│   │   │   │   └── userLogin.steps.ts
│   │   │   └── TC_signinAPI/
│   │   │       ├── signinAPI.feature
│   │   │       └── signinAPI.steps.ts
│   │   ├── search/
│   │   │   ├── TC_searchGame/
│   │   │   │   ├── searchAPI.feature
│   │   │   │   └── searchAPI.steps.ts
│   │   │   ├── TC_searchGameUI/
│   │   │   │   ├── searchUI.feature
│   │   │   │   └── searchUI.steps.ts
│   │   │   └── TC_countriesAPI/
│   │   │       ├── countriesAPI.feature
│   │   │       └── countriesAPI.steps.ts
│   │   └── gameLaunch/
│   │       ├── Tc1-gameLaunch/
│   │       │   ├── gameLaunch.feature
│   │       │   └── gameLaunch.steps.ts
│   │       └── Tc2-guestGameLaunch/
│   │           ├── guestGameLaunch.feature
│   │           └── guestGameLaunch.steps.ts
│   ├── pages/
│   │   ├── locators/                  # cy.get() selectors per page
│   │   ├── actions/                   # User interactions (click, type)
│   │   ├── assertions/                # Verifications (should, expect)
│   │   └── dataUtils/                 # API helpers and test data builders
│   ├── reports/                       # Generated reports (git-ignored)
│   └── support/
│       ├── commands.ts                # cy.login(), cy.waitForAppLoader(), cy.waitForGameLoader()
│       ├── constants.ts               # API endpoints, intercept patterns, test data
│       ├── e2e.ts                     # Global beforeEach (viewport + loader wait)
│       ├── types.d.ts                 # Type declarations for custom commands
│       └── viewports.ts              # Device viewport presets
├── cypress.config.ts                  # Cypress + mochawesome + cucumber config
├── .cypress-cucumber-preprocessorrc.json
├── .env.example                       # Template for required env vars
├── tsconfig.json                      # TypeScript config with path aliases
└── package.json
```

---

## Setup

### Prerequisites

- Node.js >= 18
- npm >= 9
- A test account on VegaStars

### Installation

```bash
git clone <repo-url>
cd qa-technical-assessment-shatha
npm install
```

### Environment Variables

Copy the template and fill in your credentials:

```bash
cp .env.example .env
```

| Variable                 | What it does                                          |
| ------------------------ | ----------------------------------------------------- |
| `CYPRESS_LOGIN_EMAIL`    | Email used by `cy.login()`                            |
| `CYPRESS_LOGIN_PASSWORD` | Password used by `cy.login()`                         |
| `CYPRESS_LOGIN_USERNAME` | Display name checked in the account dropdown assertion |

Variables prefixed with `CYPRESS_` are loaded via `dotenv` in `cypress.config.ts` and injected into `Cypress.env()` with the prefix stripped.

---

## Running Tests

### Interactive Mode

```bash
npx cypress open        # or: npm run cy:open
```

### Headless Mode

```bash
npx cypress run          # default Electron browser
npm run cy:run:chrome    # Chrome
npm run cy:run:headed    # headed Electron
```

### Run by Tag

The `TAGS` env variable accepts [Cucumber tag expressions](https://cucumber.io/docs/cucumber/api/#tag-expressions):

```bash
npx cypress run --env TAGS='@smoke'
npx cypress run --env TAGS='@api'
npx cypress run --env TAGS='@negative'
npx cypress run --env TAGS='@smoke and not @ignore'
```

To permanently skip a scenario in CI, tag it with `@ignore` or `@skip`. The pipeline excludes both.

### Run on a Specific Viewport

Pass the `device` key via `--env`:

```bash
npx cypress run --env device=iphone
npx cypress run --env device=tablet
npx cypress run --env device=pixel,TAGS='@smoke'
```

| Key       | Device              | Width | Height |
| --------- | ------------------- | ----: | -----: |
| `desktop` | Standard (default)  |  1280 |    720 |
| `iphone`  | iPhone 14           |   390 |    844 |
| `pixel`   | Google Pixel 8      |   412 |    915 |
| `samsung` | Samsung Galaxy S24  |   360 |    780 |
| `tablet`  | iPad Air            |   820 |   1180 |

If no `device` is set, tests run at 1280x720 (desktop).

### Generate Mochawesome Report Locally

After a test run, the JSON fragments sit in `cypress/reports/mochawesome/`. To merge them into a single HTML report:

```bash
npm run report
```

This runs `mochawesome-merge` then `marge` (mochawesome report generator). The HTML file is written to `cypress/reports/mochawesome/report.html`.

### All npm Scripts

| Script               | Command                              |
| -------------------- | ------------------------------------ |
| `npm run cy:open`    | Interactive Cypress runner           |
| `npm run cy:run`     | Headless run (Electron)              |
| `npm run cy:run:headed` | Headed run                        |
| `npm run cy:run:chrome`  | Headless Chrome                  |
| `npm run cy:run:firefox` | Headless Firefox                 |
| `npm run cy:run:smoke`   | `@smoke` tag only                |
| `npm test`           | Alias for `cy:run`                   |
| `npm run typecheck`  | `tsc --noEmit` — type-check only     |
| `npm run report`     | Merge + generate mochawesome HTML    |

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/cypress-tests.yml`) runs on every push/PR to `main`/`master` and can be triggered manually.

### Pipeline Stages

```
typecheck ──→ api-tests    ─────────────────┐
           ──→ smoke-tests ──→ full-suite ──→├──→ generate-report
           ──→ mobile-smoke ────────────────┘
```

| Stage             | What it runs                                                        | Depends on   |
| ----------------- | ------------------------------------------------------------------- | ------------ |
| **TypeScript Check** | `tsc --noEmit` — catches type errors before any tests run        | —            |
| **API Tests**     | Scenarios tagged `@api`, excluding `@ignore` and `@skip`            | typecheck    |
| **Smoke Tests**   | Scenarios tagged `@smoke`, excluding `@ignore` and `@skip`          | typecheck    |
| **Mobile Smoke**  | Smoke tests on iPhone viewport (390x844)                            | typecheck    |
| **Full Suite**    | All scenarios on Chrome, excluding `@ignore` and `@skip`            | smoke-tests  |
| **Generate Report** | Merges all mochawesome JSONs into one HTML report and uploads it  | all test jobs |

- **API, Smoke, and Mobile Smoke run in parallel** after typecheck for faster feedback.
- **Full Suite** only runs after smoke passes — no point running everything if smoke fails.
- **Generate Report** runs with `if: always()` so the report is available even when tests fail.
- The final HTML report is uploaded as a GitHub Actions artifact (`mochawesome-html-report`, 30-day retention).

### Required Repository Secrets

Add these in GitHub → Settings → Secrets and variables → Actions:

- `CYPRESS_LOGIN_EMAIL`
- `CYPRESS_LOGIN_PASSWORD`
- `CYPRESS_LOGIN_USERNAME`

### Skipping Tests in CI

Tag any scenario with `@ignore` or `@skip`:

```gherkin
@ignore
Scenario: This will not run in CI
  Given ...
```

Both tags are excluded from every CI stage via the `TAGS` expression.

---

## Page Object Model

Each page is split into four layers. Step definitions compose these layers and never touch the DOM directly.

| Layer          | Responsibility                     | Example                                         |
| -------------- | ---------------------------------- | ------------------------------------------------ |
| **Locators**   | Element selectors (`cy.get(...)`)  | `LoginPage.ts` — `usernameOrEmailInput`, `signinButton` |
| **Actions**    | User interactions                  | `LoginActions.ts` — `fillLoginForm()`, `submitLogin()` |
| **Assertions** | Verifications                      | `LoginAssertions.ts` — `verifyUsernameErrorMessage()` |
| **DataUtils**  | API helpers and test data builders | `GameAssetsApi.ts` — `searchGameAssets()` with typed response |

Pages covered: **Login**, **Home**, **Search**, **Game**.

---

## Test Coverage

### Login (`@auth`)

| Scenario                           | Tags               | What it checks                                      |
| ---------------------------------- | ------------------- | --------------------------------------------------- |
| Successful login + home reachable  | `@smoke @positive`  | Logs in via UI, verifies home page URL               |
| Successful login + username shown  | `@smoke @positive`  | Opens account drawer, checks displayed username      |
| Failed login error messages        | `@negative`         | Outline: invalid user, wrong password, empty fields  |

### Search — API (`@search @api`)

| Scenario                          | Tags         | What it checks                                    |
| --------------------------------- | ------------ | ------------------------------------------------- |
| Schema + data integrity           | `@smoke`     | Status 200, response has `data`, `current_page`, `per_page`, etc. |
| Empty results for unknown game    | `@edge-case` | Status 200, `data` is empty array, `total` is 0   |
| Game asset item structure         | `@edge-case` | Each item has `id`, `name`, `slug`, `game_type`    |
| Negative per_page value           | `@negative`  | Server returns 500 for `per_page=-1`               |

### Sign-in — API (`@auth @api`)

| Scenario                          | Tags                  | What it checks                                    |
| --------------------------------- | --------------------- | ------------------------------------------------- |
| Successful sign-in                | `@smoke`              | Status 200, response contains JWT token            |
| Wrong password                    | `@negative`           | Status 404 (invalid credentials)                   |
| Non-existent user                 | `@negative`           | Status 404 (user not found)                        |
| Empty request body                | `@negative @edge-case`| Status 422, validation errors for username + password |

### Countries — API (`@api`)

| Scenario                          | Tags         | What it checks                                    |
| --------------------------------- | ------------ | ------------------------------------------------- |
| Countries list structure          | `@smoke`     | Status 200, non-empty array, each item has `id`, `name`, `iso2`, `currency` |
| Australia exists                  | `@edge-case` | List contains country with iso2 `AU`               |

### Search — UI (`@search @ui`)

| Scenario                      | Tags         | What it checks                        |
| ----------------------------- | ------------ | ------------------------------------- |
| Search and verify results     | `@smoke`     | Results appear for a valid game name  |
| No results message            | `@edge-case` | "No results found" for invalid query  |

### Game Launch (`@gameLaunch`)

| Scenario                        | Tags     | What it checks                                   |
| ------------------------------- | -------- | ------------------------------------------------ |
| Logged-in user launches game    | `@smoke` | Game page URL and iframe load correctly           |
| Guest user gets login prompt    | `@guest` | Clicking Real Play shows login overlay            |

---

## Custom Commands

### `cy.login(email?, password?)`

Sends a `POST` to the sign-in API, caches the session with `cy.session()`, and sets a `jwt_auth` cookie. Falls back to `LOGIN_EMAIL`/`LOGIN_PASSWORD` from env when no arguments are passed.

### `cy.waitForAppLoader()`

Waits up to 30s for the `#preloader` element to disappear. Called automatically in the global `beforeEach` hook.

### `cy.waitForGameLoader()`

Waits up to 30s for the `[role="progressbar"]` to disappear. Used in game-launch tests.

---

## Common Steps

Shared Gherkin steps live in `cypress/e2e/common/common.steps.ts`:

| Step                                                  | What it does                                  |
| ----------------------------------------------------- | --------------------------------------------- |
| `Given Common Step: User is logged in`                | `cy.login()` → visit `/` → wait for loader    |
| `Given Common Step: Logged in user opens search dialog` | `cy.login()` → open search overlay → wait    |

New shared steps should follow the `Common Step:` prefix convention.

---

## Configuration

| Setting                  | Value                            | Reason                                        |
| ------------------------ | -------------------------------- | --------------------------------------------- |
| `baseUrl`                | `https://www.vegastars5.com/`    | All `cy.visit()` calls resolve relative to it |
| `defaultCommandTimeout`  | 10s                              | Remote site needs more than the 4s default     |
| `pageLoadTimeout`        | 30s                              | Staging can be slow                            |
| `retries.runMode`        | 2                                | Absorbs flaky network issues in CI             |
| `retries.openMode`       | 0                                | Fast feedback during local development         |
| `reporter`               | `mochawesome`                    | JSON per spec, merged into HTML in CI          |
| `screenshotOnRunFailure` | `false`                          | Reduces CI artifact noise                      |
| `video`                  | `false`                          | Keeps runs fast; enable when debugging CI      |

Path aliases: `@pages/*`, `@support/*`, `@fixtures/*` (configured in `tsconfig.json`).

Cucumber reports: JSON written to `cypress/reports/cucumber-report.json` (configured in `.cypress-cucumber-preprocessorrc.json`).

---

## Design Decisions and Tradeoffs

### API-Based Login via `cy.session()`

**What**: `cy.login()` authenticates through a direct `POST` to the sign-in API and caches the session.

**Why**: Avoids repeating the UI login flow in every test. `cy.session()` caches the cookie so subsequent tests reuse it without another API call.

**Tradeoff**: If the sign-in API contract changes, `cy.login()` breaks silently instead of failing visibly in the UI. The dedicated `@auth` UI login tests mitigate this by covering the actual login form.

### Four-Layer POM (Locators / Actions / Assertions / DataUtils)

**What**: Each page is split into four files instead of one page object class.

**Why**: Keeps selectors, interactions, verifications, and data logic independent. Step definitions pick only the layer they need.

**Tradeoff**: More files per page than a flat page-object approach. For a small suite the extra navigation overhead is noticeable, but it scales well as tests grow.

### Gherkin + Cucumber over Plain Cypress Specs

**What**: Tests are `.feature` files with separate `.steps.ts` definitions.

**Why**: Scenarios read as plain English, which helps non-technical reviewers. Tags (`@smoke`, `@api`, `@edge-case`) allow flexible filtering in CI and locally.

**Tradeoff**: Adds the cucumber preprocessor + esbuild plugin chain. Misconfigured step paths silently skip tests. Debugging means jumping between `.feature` and `.steps.ts` files.

### CSS Selectors + `.contains()` (No `data-testid`)

**What**: Locators use CSS selectors (`input[name="username"]`) and text matching (`.contains('Login')`).

**Why**: The target app does not consistently provide `data-testid` attributes. CSS + text selectors are the most reliable option available.

**Tradeoff**: Text selectors break if labels change or the app is localized. Selectors tied to MUI class names (`.Mui-error`) are brittle across component library upgrades. Adding `data-testid` attributes to the app would be the ideal fix.

### Retries in CI (runMode: 2)

**What**: Failed tests automatically retry up to 2 times in headless mode.

**Why**: The remote staging site occasionally has slow responses or rendering delays. Retries reduce false negatives in CI.

**Tradeoff**: Can mask genuine bugs that fail intermittently. Flaky tests should be investigated, not permanently covered by retries.

### Dual Search Coverage (API + UI)

**What**: Search is tested at both the API layer and the UI layer.

**Why**: API tests validate response schema independently of rendering. UI tests confirm the search dialog works from the user's perspective. They catch different types of failures.

**Tradeoff**: Two suites for one feature means more maintenance. If the API contract changes, both need updates.

### Test Data in `constants.ts` (Not Fixtures)

**What**: Search terms, API endpoints, and expected values live in `cypress/support/constants.ts`.

**Why**: Constants are typed, importable, and co-located with the code that uses them. Simpler than `cy.fixture()` for a handful of strings.

**Tradeoff**: Not suitable if test data grows large or needs to vary per environment. Fixture files or a data-driven approach would be better at that point.

### Mochawesome for Reporting

**What**: Each Cypress run produces JSON files. In CI, a final stage merges them into a single HTML report.

**Why**: Gives a clear, visual summary of all test results across all pipeline stages (API, smoke, full suite) in one downloadable artifact.

**Tradeoff**: Adds three dev dependencies (`mochawesome`, `mochawesome-merge`, `mochawesome-report-generator`). The merge step requires all JSON files to be collected via CI artifacts before generating the HTML.

### Error Suppression for React Hydration Bugs

**What**: The `uncaught:exception` handler in `e2e.ts` suppresses React hydration errors (#418 and #423).

**Why**: The VegaStars application throws SSR hydration mismatch errors on game pages (reported in [#7](https://github.com/JibreelShatha/qa-technical-assessment-shatha/issues/7)). Without suppression, Cypress fails every test that visits a game page. These specific error codes are React-internal and only originate from the application's server-side rendering mismatch, never from test code.

**Tradeoff**: If the application fixes the hydration bug, the suppression becomes dead code. It should be removed once the upstream fix is confirmed.

### `@ignore` / `@skip` Tags for CI Exclusion

**What**: Any scenario tagged `@ignore` or `@skip` is excluded from all CI stages.

**Why**: Provides a quick way to disable a test without deleting it — useful for known flaky tests or features under development.

**Tradeoff**: Skipped tests can be forgotten. They should be reviewed periodically and either fixed or removed.
