import { Page, Locator } from '@playwright/test';

/**
 * Page object for /add_remove_elements/.
 * Clicking "Add Element" appends a "Delete" button to the page.
 */
export class AddRemoveElementsPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Add Element' });
    this.deleteButtons = page.getByRole('button', { name: 'Delete' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/add_remove_elements/');
  }

  async addElements(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.addButton.click();
    }
  }

  async deleteElements(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      // Always delete the first remaining Delete button.
      await this.deleteButtons.first().click();
    }
  }

  async getDeleteButtonCount(): Promise<number> {
    return this.deleteButtons.count();
  }
}
