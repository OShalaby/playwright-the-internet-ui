import { test, expect } from '@playwright/test';
import { IFramePage } from '../pages/IFramePage';

test.describe('IFrame (TinyMCE editor)', () => {
  let editor: IFramePage;

  test.beforeEach(async ({ page }) => {
    editor = new IFramePage(page);
    await editor.goto();
    await expect(editor.editorBody).toBeVisible();
  });

  // NOTE: The live the-internet TinyMCE editor is loaded from the tiny.cloud
  // CDN with a domain-locked demo API key, so it initializes in READ-ONLY mode
  // (body has contenteditable="false") and never becomes editable. Typing into
  // it cannot be automated against the live site. This test therefore exercises
  // frame handling with a read-only-safe assertion on the editor's default
  // content rather than attempting to type.
  test('reads the default content from inside the TinyMCE iframe', async () => {
    await expect(editor.editorBody).toContainText('Your content goes here.');
    expect(await editor.getBodyText()).toBe('Your content goes here.');
  });
});
