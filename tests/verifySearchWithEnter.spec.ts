import { expect, test } from '@playwright/test';
import { FastworkMainPage } from '../pages/mainPage';
import { FastworkSearchResultPage } from '../pages/searchResultPage';
import { validateSearchResults } from '../utils/searchUtils';

test('Verify user able to search work in main page with Enter', async ({ page }) => {
  const searchTerm = 'รับทํา logo';
  const acceptedSearchTerms = ['logo', 'โลโก้', 'รับทำ'];

  const mainPage = new FastworkMainPage(page);
  const searchResultPage = new FastworkSearchResultPage(page);

  await mainPage.navigateToSite();

  await mainPage.searchForServiceWithEnter(searchTerm);

  await expect(searchResultPage.getHeading(searchTerm)).toBeVisible();

  await searchResultPage.waitForResultsLoaded();
  const count = await searchResultPage.getCardCount();
  expect(count).toBeGreaterThan(0);

  await validateSearchResults(
    (i) => searchResultPage.getCardTitle(i),
    count,
    acceptedSearchTerms
  );

  await searchResultPage.clearSearch();
  await expect(searchResultPage.getSearchInput()).toHaveValue('');
});