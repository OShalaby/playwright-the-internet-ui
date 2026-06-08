import { Page, Locator } from '@playwright/test';

/**
 * Page object for /checkboxes.
 * Two checkboxes inside #checkboxes; by default the first is unchecked and the
 * second is checked.
 */
export class CheckboxesPage {
  readonly page: Page;
  readonly checkboxes: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkboxes = page.locator('#checkboxes input[type="checkbox"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkboxes');
  }

  checkboxAt(index: number): Locator {
    return this.checkboxes.nth(index);
  }

  async isChecked(index: number): Promise<boolean> {
    return this.checkboxAt(index).isChecked();
  }

  async toggle(index: number): Promise<void> {
    const box = this.checkboxAt(index);
    if (await box.isChecked()) {
      await box.uncheck();
    } else {
      await box.check();
    }
  }

  async count(): Promise<number> {
    return this.checkboxes.count();
  }
}
