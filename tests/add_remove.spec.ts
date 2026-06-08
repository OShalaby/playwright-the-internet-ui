import { test, expect } from '@playwright/test';
import { AddRemoveElementsPage } from '../pages/AddRemoveElementsPage';

test.describe('Add / Remove Elements', () => {
  let elements: AddRemoveElementsPage;

  test.beforeEach(async ({ page }) => {
    elements = new AddRemoveElementsPage(page);
    await elements.goto();
    await expect(elements.deleteButtons).toHaveCount(0);
  });

  test('add 5, delete 2, then delete all', async () => {
    await elements.addElements(5);
    await expect(elements.deleteButtons).toHaveCount(5);

    await elements.deleteElements(2);
    await expect(elements.deleteButtons).toHaveCount(3);
    expect(await elements.getDeleteButtonCount()).toBe(3);

    await elements.deleteElements(3);
    await expect(elements.deleteButtons).toHaveCount(0);
  });
});
