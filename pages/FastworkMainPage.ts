import { expect, Page } from '@playwright/test';
import { FastworkLocators } from '../locators/FastworkLocators';

export class FastworkMainPage {
  constructor(private page: Page) {}

  async navigateToSite() {
    await this.page.goto('https://fastwork.co/');
    await expect(this.page).toHaveTitle("Fastwork.co แหล่งรวมฟรีแลนซ์คุณภาพอันดับ 1 ที่ธุรกิจทั่วไทยเลือกใช้")
  }

  async verifyPageTitle(expectedTitle: string) {
    await this.page.waitForLoadState();
    const title = await this.page.title();
    return title === expectedTitle;
  }

  async searchForService(searchTerm: string) {
    const searchInput = this.page.locator(FastworkLocators.searchInput);
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(searchTerm);
    await this.page.locator(FastworkLocators.searchButton).nth(1).click();
    await this.page.waitForLoadState();
  }
}