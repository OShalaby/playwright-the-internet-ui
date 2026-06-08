import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage';

test.describe('Dropdown', () => {
  let dropdown: DropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdown = new DropdownPage(page);
    await dropdown.goto();
  });

  test('select Option 1', async () => {
    await dropdown.selectByLabel('Option 1');
    expect(await dropdown.getSelectedLabel()).toBe('Option 1');
    await expect(dropdown.dropdown).toHaveValue('1');
  });

  test('select Option 2', async () => {
    await dropdown.selectByLabel('Option 2');
    expect(await dropdown.getSelectedLabel()).toBe('Option 2');
    await expect(dropdown.dropdown).toHaveValue('2');
  });

  test('selection switches from Option 1 to Option 2', async () => {
    await dropdown.selectByLabel('Option 1');
    expect(await dropdown.getSelectedValue()).toBe('1');

    await dropdown.selectByLabel('Option 2');
    expect(await dropdown.getSelectedValue()).toBe('2');
  });
});
