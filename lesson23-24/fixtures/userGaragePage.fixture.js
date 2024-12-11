import { test as base } from "@playwright/test";
import { GaragePage } from "../PageObjectModel/GaragePage";

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.navigateToPage();
    await garagePage.clickAddCarBtn();
    await garagePage.chooseBrandFord();
    await garagePage.chooseModelFocus();
    await garagePage.add600Mileage();
    await garagePage.clickAddBtn();
    await use(garagePage);
  },
});
