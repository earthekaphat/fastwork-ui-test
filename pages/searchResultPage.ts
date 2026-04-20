import { Page, expect } from '@playwright/test';
import { searchResultPageLocators } from '../locators/searchResultPageLocators';

export class FastworkSearchResultPage {
  constructor(private page: Page) {}

  async verifySearchResultHeading(searchTerm: string) {
    const heading = this.page.getByRole('heading', { name: `ค้นหางาน “${searchTerm}”` });
    await expect(heading).toBeVisible();
  }

  async clearSearchAndVerify() {
    await this.page.locator(searchResultPageLocators.clearButton).click();
    const searchInput = this.page.locator(searchResultPageLocators.searchInput);
    await expect(searchInput).toHaveValue('');
  }

  async verifyFoundSearchResults() {
    const cards = this.page.locator('.trb-product-card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifyCardTitles(keywords: string[]) {
    const cards = this.page.locator('.trb-product-card');
    for (let i = 0; i < 6; i++) {
      const card = cards.nth(i);
      const title = await card.locator('.info-container .title').innerText();
      expect(isRelatedToSearchTerm(title, keywords)).toBeTruthy();
    }
  }
}

function isRelatedToSearchTerm(title: string, keywords: string[]): boolean {
  const lowerTitle = title.toLowerCase();
  return keywords.some(keyword => lowerTitle.includes(keyword.toLowerCase()));
}