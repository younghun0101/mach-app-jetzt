import { test, expect } from '../fixtures/base-test';

test.describe('[smoke] Dashboard-Navigation', () => {
  test.beforeEach(async ({ indexPage }) => {
    await indexPage.goto();
  });

  test('soll zum Dashboard navigieren können', async ({ indexPage, page }) => {
    await test.step('Zum Dashboard-Tab wechseln', async () => {
      await indexPage.switchToDashboardTab();
    });

    await test.step('Dashboard-Inhalt verifizieren', async () => {
      await expect(page.getByText('Gesamt Aufgaben')).toBeVisible();
      await expect(page.getByText('Erledigt')).toBeVisible();
      // Abschlussrate - verwende first() für das statische Element
      await expect(page.locator('text=Abschlussrate').first()).toBeVisible();
    });
  });

  test('soll Statistik für leere Aufgabenliste anzeigen', async ({ indexPage, page }) => {
    await test.step('Zum Dashboard wechseln', async () => {
      await indexPage.switchToDashboardTab();
    });

    await test.step('Leere Statistik verifizieren', async () => {
      await expect(
        page.getByText('Erstellen Sie Aufgaben, um Ihre Leistungsstatistiken zu sehen')
      ).toBeVisible();
    });
  });

  test('soll nach Aufgaben-Erstellung aktualisierte Statistik anzeigen', async ({
    indexPage,
    page,
  }) => {
    await test.step('Aufgaben erstellen', async () => {
      await indexPage.switchToTasksTab();
      await indexPage.createTask({ title: 'Test Aufgabe 1', priority: 'high' });
      await indexPage.createTask({ title: 'Test Aufgabe 2', priority: 'medium' });
    });

    await test.step('Zum Dashboard wechseln', async () => {
      await indexPage.switchToDashboardTab();
    });

    await test.step('Statistik aktualisiert verifizieren', async () => {
      // Warte auf die Statistik-Karte mit "Gesamt Aufgaben"
      const totalTasksCard = page.locator('text=Gesamt Aufgaben').locator('..').locator('..');
      await expect(totalTasksCard.locator('text=2')).toBeVisible({ timeout: 5000 });
    });
  });
});

