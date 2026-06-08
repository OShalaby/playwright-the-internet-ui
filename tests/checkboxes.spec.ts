import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/CheckboxesPage';

test.describe('Checkboxes', () => {
  let checkboxes: CheckboxesPage;

  test.beforeEach(async ({ page }) => {
    checkboxes = new CheckboxesPage(page);
    await checkboxes.goto();
    await expect(checkboxes.checkboxes).toHaveCount(2);
  });

  test('default states: first unchecked, second checked', async () => {
    expect(await checkboxes.isChecked(0)).toBe(false);
    expect(await checkboxes.isChecked(1)).toBe(true);
  });

  test('toggling both flips their states', async () => {
    const initialFirst = await checkboxes.isChecked(0);
    const initialSecond = await checkboxes.isChecked(1);

    await checkboxes.toggle(0);
    await checkboxes.toggle(1);

    await expect(checkboxes.checkboxAt(0)).toBeChecked({ checked: !initialFirst });
    await expect(checkboxes.checkboxAt(1)).toBeChecked({ checked: !initialSecond });

    expect(await checkboxes.isChecked(0)).toBe(!initialFirst);
    expect(await checkboxes.isChecked(1)).toBe(!initialSecond);
  });
});
