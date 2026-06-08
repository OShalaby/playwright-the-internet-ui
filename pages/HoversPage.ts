import { Page, Locator } from '@playwright/test';

/**
 * Page object for /hovers.
 * Three avatar figures; hovering one reveals a caption containing a name and a
 * "View profile" link.
 */
export class HoversPage {
  readonly page: Page;
  readonly figures: Locator;

  constructor(page: Page) {
    this.page = page;
    this.figures = page.locator('.figure');
  }

  async goto(): Promise<void> {
    await this.page.goto('/hovers');
  }

  figureAt(index: number): Locator {
    return this.figures.nth(index);
  }

  captionAt(index: number): Locator {
    return this.figureAt(index).locator('.figcaption');
  }

  async hoverFigure(index: number): Promise<void> {
    await this.figureAt(index).hover();
  }

  async getCaptionText(index: number): Promise<string> {
    return (await this.captionAt(index).innerText()).trim();
  }

  async count(): Promise<number> {
    return this.figures.count();
  }
}
