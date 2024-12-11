import { expect } from "@playwright/test";
import { test } from "../../fixtures/userGaragePage.fixture";

test("Checking the car", async ({ userGaragePage }) => {
  await expect(
    userGaragePage.locator('[class="car_logo car-logo"]').first()
  ).toBeVisible();
  await expect(
    userGaragePage.locator('[class="car jumbotron"]').first()
  ).toBeVisible();
  await expect(
    userGaragePage.locator('[class="car jumbotron"]').first()
  ).toContainText("Ford");
  await expect(
    userGaragePage.locator('[class="car jumbotron"]').first()
  ).toContainText("Focus");
});
