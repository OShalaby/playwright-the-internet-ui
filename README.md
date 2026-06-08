# playwright-the-internet-ui

UI automation of tricky, edge-case web widgets with Playwright + TypeScript.

![Playwright Tests](https://github.com/OShalaby/playwright-the-internet-ui/actions/workflows/playwright.yml/badge.svg)

This suite automates the Sauce Labs [the-internet](https://the-internet.herokuapp.com) demo
site, targeting the components that trip up brittle automation: asynchronous DOM, native
dialogs, file uploads, iframes, hover-reveal elements and native dropdowns.

## What this demonstrates

- Web-first, auto-waiting assertions instead of hard-coded sleeps (no `waitForTimeout`).
- Handling dynamically loaded DOM (elements that appear or become visible after an async action).
- Native browser dialog handling (`alert`, `confirm`, `prompt`) via one-shot `page.once('dialog', ...)` handlers.
- File uploads through native `<input type="file">` with a committed fixture.
- Cross-frame interaction with a TinyMCE rich-text editor via `frameLocator`.
- Hover-triggered UI state and visibility assertions.
- Native `<select>` dropdown selection and value verification.
- Clean Page Object Model: zero raw selectors in specs, semantic locators preferred.
- CI-ready configuration with retries, traces, screenshots and video on failure.

## Tech stack

- [Playwright Test](https://playwright.dev) `^1.60.0`
- TypeScript `^5.4`
- Node.js 20
- GitHub Actions for CI

## Test coverage

- **dynamic_loading.spec.ts** — `/dynamic_loading/1` (hidden element revealed) and `/dynamic_loading/2` (element rendered after load); clicks Start, waits for the "Hello World!" finish text to become visible and asserts the loading indicator is hidden.
- **add_remove.spec.ts** — adds 5 elements (5 Delete buttons), deletes 2 (3 remain), deletes the rest (0 remain).
- **dropdown.spec.ts** — selects "Option 1" and "Option 2" and asserts the selected label and value each time, including a switch between them.
- **checkboxes.spec.ts** — reads the default checkbox states, toggles both and asserts each state is flipped.
- **alerts.spec.ts** — triggers JS Alert (accept), JS Confirm (accept and dismiss) and JS Prompt (enter text), asserting the result message for each case.
- **file_upload.spec.ts** — uploads the committed `fixtures/sample-upload.txt` and asserts the uploaded filename is shown.
- **hovers.spec.ts** — hovers each of the three avatars and asserts the caption with the correct user name and "View profile" link appears.
- **iframe.spec.ts** — reaches into the TinyMCE editor inside an iframe via `frameLocator` and asserts its default content. (The live editor loads from the tiny.cloud CDN with a domain-locked demo key and stays read-only, so a typing assertion cannot pass against the live site; this uses a read-only-safe assertion instead.)

## Project structure

```
playwright-the-internet-ui/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── sample-upload.txt
├── pages/
│   ├── AddRemoveElementsPage.ts
│   ├── CheckboxesPage.ts
│   ├── DropdownPage.ts
│   ├── DynamicLoadingPage.ts
│   ├── FileUploadPage.ts
│   ├── HoversPage.ts
│   ├── IFramePage.ts
│   └── JavaScriptAlertsPage.ts
├── tests/
│   ├── add_remove.spec.ts
│   ├── alerts.spec.ts
│   ├── checkboxes.spec.ts
│   ├── dropdown.spec.ts
│   ├── dynamic_loading.spec.ts
│   ├── file_upload.spec.ts
│   ├── hovers.spec.ts
│   └── iframe.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Running locally

```bash
git clone https://github.com/OShalaby/playwright-the-internet-ui.git
cd playwright-the-internet-ui
npm install
npx playwright install
npm test
npm run report
```

Other useful scripts:

```bash
npm run test:headed   # run with a visible browser
npm run test:ui       # interactive Playwright UI mode
```

## CI

Every push and pull request to `main` runs the suite via GitHub Actions
(`.github/workflows/playwright.yml`) on `ubuntu-latest`:

1. Checkout (`actions/checkout@v4`).
2. Set up Node.js 20 (`actions/setup-node@v4`).
3. Install dependencies (`npm install`).
4. Install the Chromium browser with system dependencies.
5. Run the Playwright suite (retries enabled, single worker on CI for determinism).
6. Upload the HTML report as the `playwright-report` artifact (kept 14 days) on every run, pass or fail, for post-mortem debugging.

## Author

Omar Shalaby — SDET / QA Automation Engineer. Hire me on Upwork: https://www.upwork.com/freelancers/~01b3032fe5e6492806
