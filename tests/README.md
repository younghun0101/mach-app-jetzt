# Tests

Dieses Projekt nutzt **Playwright** für E2E-Tests und **Vitest** für Unit-Tests, entsprechend unserem [TestCodeGuide](./TestCodeGuide.md).

## Struktur

```
tests/
├── e2e/                 # E2E-Tests (Playwright)
│   ├── specs/           # Test-Spezifikationen
│   ├── pages/           # Page Object Models
│   ├── fixtures/         # Custom Fixtures
│   ├── data/            # Testdaten & Factories
│   └── utils/           # Test-Utilities
├── unit/                # Unit-Tests (Vitest)
└── setup.ts            # Vitest Setup
```

## Scripts

### Unit-Tests
- `npm run test:unit` - Alle Unit-Tests ausführen
- `npm run test:watch` - Tests im Watch-Modus
- `npm run test:ui` - Vitest UI öffnen
- `npm run test:coverage` - Coverage-Report generieren

### E2E-Tests
- `npm run test:e2e` - Alle E2E-Tests ausführen
- `npm run test:e2e:ui` - Playwright UI Mode
- `npm run test:e2e:headed` - Tests im Browser-Fenster ausführen
- `npm run test:e2e:smoke` - Nur Smoke-Tests
- `npm run test:e2e:report` - Test-Report anzeigen

## Test-Guidelines

### 1. Kein `waitForTimeout`
❌ Vermeiden: `page.waitForTimeout(3000)`
✅ Nutzen: Web-First Assertions
```ts
await expect(page.getByRole('button')).toBeEnabled();
await expect(page).toHaveURL(/\/dashboard/);
```

### 2. Locator-Strategie
**Priorität**: Role & A11y → Text → Test-ID

```ts
// ✅ Gut
page.getByRole('button', { name: 'Anmelden' });
page.getByLabel('E-Mail');
page.getByTestId('submit-button');

// ❌ Schlecht
page.locator('.login-btn');
```

### 3. Page Object Model
- **POM**: Nur Locators & Aktionen
- **Specs**: Nur Assertions

```ts
// tests/e2e/pages/LoginPage.ts
export class LoginPage {
  async login(email: string, pwd: string) { ... }
}

// tests/e2e/specs/login.spec.ts
test('soll einloggen', async ({ loginPage }) => {
  await loginPage.login('test@example.com', 'pass');
  await expect(page).toHaveURL(/\/dashboard/);
});
```

## Weiterführende Dokumentation

Siehe [TestCodeGuide.md](TestCodeGuide.md) für vollständige Dokumentation.

