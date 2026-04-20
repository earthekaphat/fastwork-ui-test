import { test } from '@playwright/test';
import { FastworkMainPage } from '../pages/FastworkMainPage';
import { FastworkSearchResultPage } from '../pages/FastworkSearchResultPage';

test('Verify user able to search work in main page', async ({ page }) => {
  const searchTerm = 'รับทํา logo';
  const acceptedSearchTerms = ['logo', 'โลโก้', 'รับทำ'];
  const mainPage = new FastworkMainPage(page);
  const searchResultPage = new FastworkSearchResultPage(page);

  await mainPage.navigateToSite();;

  await mainPage.searchForService(searchTerm);

  await searchResultPage.verifySearchResultHeading(searchTerm);

  await searchResultPage.verifyFoundSearchResults();

  await searchResultPage.verifyCardTitles(acceptedSearchTerms);

  await searchResultPage.clearSearchAndVerify();
})