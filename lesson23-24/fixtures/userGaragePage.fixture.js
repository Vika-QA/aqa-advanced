import { test as base } from "@playwright/test";
import { RegisterForm } from "../PageObjectModel";

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const registerForm = new RegisterForm(page);
    await registerForm.navigateToPage();
    await page.getByRole("button", { name: "Add car" }).click();
    await page.locator('[id="addCarBrand"]').selectOption("Ford");
    await page.locator('[id="addCarModel"]').selectOption("Focus");
    await page.locator('[id="addCarMileage"]').fill("600");
    await page.getByRole("button", { name: "Add" }).click();
    await use(page);
  },
});
