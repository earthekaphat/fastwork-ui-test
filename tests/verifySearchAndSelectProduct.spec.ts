import { expect, test } from '@playwright/test';
import { FastworkMainPage } from '../pages/mainPage';
import { FastworkSearchResultPage } from '../pages/searchResultPage';
import { FastworkDetailPage } from '../pages/productDetailPage';
import { validateSearchResults } from '../utils/searchUtils';

test('Verify user able to search and open product', async ({ page }) => {
  const searchTerm = 'รับทํา logo';
  const acceptedSearchTerms = ['logo', 'โลโก้', 'รับทำ'];

  const mainPage = new FastworkMainPage(page);
  const searchResultPage = new FastworkSearchResultPage(page);

  await mainPage.navigateToSite();
  await mainPage.login();
  await mainPage.inputSearchTerm(searchTerm);
  await mainPage.searchForService();

  await expect(searchResultPage.getHeading(searchTerm)).toBeVisible();

  await searchResultPage.waitForResultsLoaded();

  const count = await searchResultPage.getCardCount();
  expect(count).toBeGreaterThan(0);

  await validateSearchResults(
    (i) => searchResultPage.getCardTitle(i),
    count,
    acceptedSearchTerms
  );

  const newPage = await searchResultPage.selectItemAndOpenNewTab(1);

  const detailPage = new FastworkDetailPage(newPage);

  await expect(newPage).toHaveURL(/fastwork\.co\/user/);
  await expect(detailPage.getTitle()).toBeVisible();
  expect(await detailPage.getTitle().innerText()).toEqual('รับออกแบบโลโก้ได้ที่ trust me!');

  await expect(detailPage.getChatButton()).toBeVisible();
  await detailPage.clickChatButton();
});
