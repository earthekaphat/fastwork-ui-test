import { Page } from '@playwright/test';
import { productDetailPageLocators as locators } from '../locators/productDetailPageLocators';

export class FastworkDetailPage {
  constructor(private page: Page) {}

  getTitle() {
    return this.page.locator('h1');
  }

getChatButton() {
  return this.page
    .getByRole(locators.sidebar)
    .getByRole(locators.chatButton.role, {
      name: locators.chatButton.name,
    });
}

  async clickChatButton() {
    await this.getChatButton().click();
  }
}