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

  async inputSearchTerm(searchTerm: string) {
    const searchInput = this.page.locator(mainPageLocators.searchInput);
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(searchTerm);
  }

  async searchForService() {
    await this.page.locator(mainPageLocators.searchButton).nth(1).click();
    await this.page.waitForLoadState();
  }

  async searchForServiceWithEnter(searchTerm: string) {
    const searchInput = this.page.locator(mainPageLocators.searchInput);
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(searchTerm);
    await searchInput.press('Enter');
    await this.page.waitForLoadState();
  }

  async clearSearchInput() {
    const searchInput = this.page.locator(mainPageLocators.searchInput);
    const clearButton = this.page.locator(mainPageLocators.clearButton);
    await clearButton.click();
    await expect(searchInput).toHaveValue('');
  }

  async login() {
    await this.page.getByRole('button', { name: 'เข้าสู่ระบบ' }).nth(1).click();
    await this.page.getByRole('textbox', { name: 'ระบุอีเมลหรือเบอร์โทร' }).fill('ekaphatata@gmail.com');
    await this.page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
    await this.page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('testpassword123');
    await this.page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
    await this.page.waitForLoadState();
  }
}