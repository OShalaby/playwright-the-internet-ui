import { Page, Locator } from '@playwright/test';

/**
 * Page object for /upload.
 * Sets files on the native #file-upload input, submits, and reads the
 * #uploaded-files confirmation on the /upload result page.
 */
export class FileUploadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly submitButton: Locator;
  readonly uploadedFiles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('#file-upload');
    this.submitButton = page.locator('#file-submit');
    this.uploadedFiles = page.locator('#uploaded-files');
  }

  async goto(): Promise<void> {
    await this.page.goto('/upload');
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.submitButton.click();
  }

  async getUploadedFileName(): Promise<string> {
    return (await this.uploadedFiles.textContent())?.trim() ?? '';
  }
}
