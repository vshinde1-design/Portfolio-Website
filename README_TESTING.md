Testing suite for the portfolio

This project includes a basic testing setup using Vitest + Testing Library to cover UI and functional tests.

What's included
- `vitest.config.ts` — config for running tests in `jsdom`, sets up `src/setupTests.ts` and enables coverage reporting.
- `src/setupTests.ts` — loads `@testing-library/jest-dom` matchers and provides a small `matchMedia` polyfill.
- Example tests:
  - `src/components/ui/Button.test.tsx`
  - `src/components/sections/Hero.test.tsx`

How to run tests
1. Install the new dev dependencies locally:

```powershell
npm install
```

2. Run tests in watch mode (useful during development):

```powershell
npm test
```

3. Run tests once (CI):

```powershell
npm run test:run
```

4. Coverage report:

```powershell
npm run test:coverage
```

Recommendations and next steps
- Add more unit tests for `Card`, `Badge`, `Input`, and other UI primitives to verify className merging and accessibility.
- Add integration tests for forms (Contact) including valid/invalid submission flows (use `user-event`).
- For visual/visual-regression testing, add Playwright or Chromatic and take screenshots of key pages; use `@playwright/test` for E2E and screenshot comparisons.
- Add linting/format checks to CI for format/style consistency (`eslint`, `prettier`).

If you want, I can also:
- Add Playwright with a basic E2E + screenshot test.
- Add ESLint + Prettier and a `format` script.
