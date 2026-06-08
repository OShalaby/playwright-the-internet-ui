import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';

test.describe('Dynamic Loading', () => {
  test('example 1: element present but hidden until Start', async ({ page }) => {
    const dynamic = new DynamicLoadingPage(page);
    await dynamic.goto(1);

    await expect(dynamic.finishText).toBeHidden();

    await dynamic.start();
    await dynamic.waitForFinish();

    await expect(dynamic.finishText).toBeVisible();
    await expect(dynamic.finishText).toHaveText('Hello World!');
    await expect(dynamic.loadingIndicator).toBeHidden();
  });

  test('example 2: element rendered into the DOM after Start', async ({ page }) => {
    const dynamic = new DynamicLoadingPage(page);
    await dynamic.goto(2);

    // In example 2 the element does not exist yet.
    await expect(dynamic.finishText).toHaveCount(0);

    await dynamic.start();
    await dynamic.waitForFinish();

    await expect(dynamic.finishText).toBeVisible();
    expect(await dynamic.getFinishText()).toBe('Hello World!');
    await expect(dynamic.loadingIndicator).toBeHidden();
  });
});
