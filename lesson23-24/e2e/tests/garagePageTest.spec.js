import { test } from "../../fixtures/userGaragePage.fixture";

test("Checking the car", async ({ userGaragePage }) => {
  await userGaragePage.isVisibleCarLogo();
  await userGaragePage.isVisibleCarInfo();
  await userGaragePage.isCarFordFocus();
});
