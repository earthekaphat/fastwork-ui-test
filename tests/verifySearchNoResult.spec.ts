import { expect, test } from '@playwright/test';
import { FastworkMainPage } from '../pages/mainPage';
import { FastworkSearchResultPage } from '../pages/searchResultPage';

test('Verify user search with no result keyword', async ({ page }) => {
  const searchTerm = 'NORESULT';
  const noResultsMessage =
    'ไม่พบผลการค้นหา ตรวจสอบคำหรือเงื่อนไขที่ใช้ \nหรือโพสต์หาฟรีแลนซ์ผ่าน Jobboard';

  const mainPage = new FastworkMainPage(page);
  const searchResultPage = new FastworkSearchResultPage(page);

  await mainPage.navigateToSite();
  await mainPage.inputSearchTerm(searchTerm);
  await mainPage.searchForService();

  await expect(searchResultPage.getHeading(searchTerm)).toBeVisible();

  const count = await searchResultPage.getCardCount();
  expect(count).toBe(0);

  await expect(searchResultPage.getNoResultMessage(noResultsMessage)).toBeVisible();

  await searchResultPage.clearSearch();

  await expect(searchResultPage.getSearchInput()).toHaveValue('');
});