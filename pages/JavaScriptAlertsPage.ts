import { Page, Locator } from '@playwright/test';

/**
 * Page object for /javascript_alerts.
 *
 * Dialog handling: each trigger method registers a one-shot dialog handler via
 * page.once('dialog', ...) immediately before clicking, so we never leave a
 * stale handler attached and never call page.waitForTimeout.
 */
export class JavaScriptAlertsPage {
  readonly page: Page;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
    this.confirmButton = page.getByRole('button', { name: 'Click for JS Confirm' });
    this.promptButton = page.getByRole('button', { name: 'Click for JS Prompt' });
    this.result = page.locator('#result');
  }

  async goto(): Promise<void> {
    await this.page.goto('/javascript_alerts');
  }

  /** JS Alert: only an OK button. */
  async triggerAlert(): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.alertButton.click();
  }

  /** JS Confirm: accept (OK) or dismiss (Cancel). */
  async triggerConfirm(accept: boolean): Promise<void> {
    this.page.once('dialog', (dialog) => (accept ? dialog.accept() : dialog.dismiss()));
    await this.confirmButton.click();
  }

  /** JS Prompt: type text and accept. */
  async triggerPrompt(text: string): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept(text));
    await this.promptButton.click();
  }

  async getResult(): Promise<string> {
    return (await this.result.textContent())?.trim() ?? '';
  }
}
