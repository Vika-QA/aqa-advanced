export default class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').Context} context
   */
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  async navigateToPage() {
    await this.page.goto(this.url);
  }
}
