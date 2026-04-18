import { Page, expect } from '@playwright/test';
import { FastworkLocators } from '../locators/FastworkLocators';

export class FastworkPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://fastwork.co/');
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle("Fastwork.co แหล่งรวมฟรีแลนซ์คุณภาพอันดับ 1 ที่ธุรกิจทั่วไทยเลือกใช้");
  }

  async searchForLogo() {
    const searchInput = this.page.locator(FastworkLocators.searchInput);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('รับทํา logo');
  }
}