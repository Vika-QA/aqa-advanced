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
    // chrome more faster, but firefox need more time to load all the page
    await this.page.goto(this.url, { waitUntil: "load", timeout: 5000 });
  }
}
