import { test, expect } from '@playwright/test';
import { HoversPage } from '../pages/HoversPage';

test.describe('Hovers', () => {
  let hovers: HoversPage;

  test.beforeEach(async ({ page }) => {
    hovers = new HoversPage(page);
    await hovers.goto();
    await expect(hovers.figures).toHaveCount(3);
  });

  test('each avatar reveals its caption on hover', async () => {
    const count = await hovers.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      await expect(hovers.captionAt(i)).toBeHidden();

      await hovers.hoverFigure(i);

      await expect(hovers.captionAt(i)).toBeVisible();
      const caption = await hovers.getCaptionText(i);
      expect(caption).toContain(`name: user${i + 1}`);
      expect(caption).toContain('View profile');
    }
  });
});
