import { test as setup } from "@playwright/test";
import { RegisterForm } from "../../../PageObjectModel";

const user = "qaqa123@qa.qa";
const password = "Qa123123!!!";

/** @type {RegisterForm} */
let registerForm;

setup("login", async ({ page }) => {
  registerForm = new RegisterForm(page);
  await registerForm.navigateToPage();
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.locator('input[id="signinEmail"]').fill(user);
  await page.locator('input[id="signinPassword"]').fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  // Without this waitForTimeout the cookie sid does not have time to write to session-storage
  await page.waitForTimeout(500);
  // Or we can use some locator instead of waitForTimeout to make sure we are logged in (f.e. button "Add car")
  // const buttonLocator = page.locator('button:has-text("Add car")');
  // await buttonLocator.waitFor({ state: "visible" });
  await page.context().storageState({ path: "session-storage.json" });
});
