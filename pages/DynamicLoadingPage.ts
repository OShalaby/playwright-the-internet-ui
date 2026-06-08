import { Page, Locator, expect } from '@playwright/test';

/**
 * Page object for /dynamic_loading/1 and /dynamic_loading/2.
 *
 * Example 1: the #finish element exists in the DOM but is hidden until Start.
 * Example 2: the #finish element is rendered into the DOM only after Start.
 * Both are driven the same way through this object.
 */
export class DynamicLoadingPage {
  readonly page: Page;
  readonly startButton: Locator;
  readonly loadingIndicator: Locator;
  readonly finishText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.loadingIndicator = page.locator('#loading');
    this.finishText = page.locator('#finish');
  }

  async goto(example: 1 | 2): Promise<void> {
    await this.page.goto(`/dynamic_loading/${example}`);
  }

  async start(): Promise<void> {
    await this.startButton.click();
  }

  async waitForFinish(): Promise<void> {
    // The live the-internet dynamic_loading animation runs ~5-8s, which
    // exceeds the default 5000ms expect timeout. Use an explicit longer one.
    await expect(this.finishText).toBeVisible({ timeout: 20000 });
  }

  async getFinishText(): Promise<string> {
    return (await this.finishText.textContent())?.trim() ?? '';
  }
}
