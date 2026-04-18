import { test } from '@playwright/test';
import { FastworkPage } from '../pages/FastworkPage';

test('Verify user able to navigate to Fastwork site', async ({ page }) => {
  const fastworkPage = new FastworkPage(page);

  await fastworkPage.goto();
  await fastworkPage.verifyTitle();
  await fastworkPage.searchForLogo();
});
