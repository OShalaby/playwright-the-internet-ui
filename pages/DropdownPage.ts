import { Page, Locator } from '@playwright/test';

/**
 * Page object for /dropdown.
 * A single native <select id="dropdown"> with two real options.
 */
export class DropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator('#dropdown');
  }

  async goto(): Promise<void> {
    await this.page.goto('/dropdown');
  }

  async selectByLabel(label: string): Promise<void> {
    await this.dropdown.selectOption({ label });
  }

  async getSelectedLabel(): Promise<string> {
    return this.dropdown.locator('option:checked').innerText();
  }

  async getSelectedValue(): Promise<string> {
    return this.dropdown.inputValue();
  }
}
