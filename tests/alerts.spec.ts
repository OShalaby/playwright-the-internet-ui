import { test, expect } from '@playwright/test';
import { JavaScriptAlertsPage } from '../pages/JavaScriptAlertsPage';

test.describe('JavaScript Alerts', () => {
  let alerts: JavaScriptAlertsPage;

  test.beforeEach(async ({ page }) => {
    alerts = new JavaScriptAlertsPage(page);
    await alerts.goto();
  });

  test('JS Alert: accept and confirm result', async () => {
    await alerts.triggerAlert();
    expect(await alerts.getResult()).toBe('You successfully clicked an alert');
  });

  test('JS Confirm: accept (OK)', async () => {
    await alerts.triggerConfirm(true);
    expect(await alerts.getResult()).toBe('You clicked: Ok');
  });

  test('JS Confirm: dismiss (Cancel)', async () => {
    await alerts.triggerConfirm(false);
    expect(await alerts.getResult()).toBe('You clicked: Cancel');
  });

  test('JS Prompt: enter text', async () => {
    const entered = 'Hello from Playwright';
    await alerts.triggerPrompt(entered);
    expect(await alerts.getResult()).toBe(`You entered: ${entered}`);
  });
});
