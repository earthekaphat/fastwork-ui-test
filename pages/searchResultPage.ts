import { Page } from '@playwright/test';
import { searchResultPageLocators as locators } from '../locators/searchResultPageLocators';

export class FastworkSearchResultPage {
  constructor(private page: Page) {}

  getHeading(searchTerm: string) {
    return this.page.locator(locators.heading(searchTerm));
  }

  async waitForResultsLoaded() {
  await this.getCards().first().waitFor({ state: 'visible' });
}

  getCards() {
    return this.page.locator(locators.cards);
  }

  async getCardCount(): Promise<number> {
    return await this.getCards().count();
  }

  async getCardTitle(index: number): Promise<string> {
    return await this.getCards()
      .nth(index)
      .locator(locators.cardTitle)
      .innerText();
  }

  async clearSearch() {
    await this.page.locator(locators.clearButton).click();
  }

  getSearchInput() {
    return this.page.locator(locators.searchInput);
  }

  async selectItemAndOpenNewTab(index: number = 1) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.getCards().nth(index - 1).click(),
    ]);

    await newPage.waitForLoadState();
    return newPage;
  }

  getNoResultMessage(message: string) {
  return this.page.getByText(message);
}
}