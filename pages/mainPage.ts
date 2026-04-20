import { expect, Page } from '@playwright/test';
import { mainPageLocators as mainPageLocators } from '../locators/mainPageLocators';

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
    const searchInput = this.page.locator(mainPageLocators.searchInput);
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(searchTerm);
    await this.page.locator(mainPageLocators.searchButton).nth(1).click();
    await this.page.waitForLoadState();
  }
}