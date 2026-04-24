import { test } from '@playwright/test';
import { FastworkMainPage } from '../pages/mainPage';

test('Verify user able to clear search input at main page', async ({ page }) => {
  const searchTerm = 'รับทํา logo';
  const mainPage = new FastworkMainPage(page);

  await mainPage.navigateToSite();
  await mainPage.inputSearchTerm(searchTerm);
  await mainPage.clearSearchInput();
});