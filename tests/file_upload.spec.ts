import { test, expect } from '@playwright/test';
import path from 'path';
import { FileUploadPage } from '../pages/FileUploadPage';

test.describe('File Upload', () => {
  const fixturePath = path.join(__dirname, '..', 'fixtures', 'sample-upload.txt');

  test('uploads a file and shows the filename', async ({ page }) => {
    const upload = new FileUploadPage(page);
    await upload.goto();

    await upload.uploadFile(fixturePath);

    await expect(upload.uploadedFiles).toBeVisible();
    expect(await upload.getUploadedFileName()).toBe('sample-upload.txt');
  });
});
