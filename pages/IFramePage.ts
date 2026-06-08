import { Page, Locator, FrameLocator } from '@playwright/test';

/**
 * Page object for /iframe.
 * A TinyMCE rich-text editor lives inside an <iframe id="mce_0_ifr">.
 * We reach the editor body through a FrameLocator.
 */
export class IFramePage {
  readonly page: Page;
  readonly editorFrame: FrameLocator;
  readonly editorBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editorFrame = page.frameLocator('#mce_0_ifr');
    this.editorBody = this.editorFrame.locator('body#tinymce');
  }

  async goto(): Promise<void> {
    await this.page.goto('/iframe');
  }

  /**
   * On the live the-internet site the TinyMCE editor is loaded from the
   * tiny.cloud CDN with a domain-locked demo API key, so it initializes in
   * READ-ONLY mode (body has contenteditable="false") and never becomes
   * editable. Typing therefore cannot be automated here. We expose a
   * read-only-safe read of the editor's default content instead.
   */
  async getBodyText(): Promise<string> {
    return (await this.editorBody.innerText()).trim();
  }
}
