import { expect, test } from "@playwright/test";
import { Profile } from "../../PageObjectModel";

test.describe("Mock body user", () => {
  test("[POSITIVE] Mocking info user", async ({ page }) => {
    const profile = new Profile(page);
    const mockData = {
      userId: 164389,
      photoFilename: "default-user.png",
      name: "qa",
      lastName: "qa",
    };

    await page.route("**/api/users/profile", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "ok",
          data: mockData,
        }),
      });
    });
    await page.goto("panel/profile");
    const realResponse = await page.request.get("api/users/profile");
    const realData = await realResponse.json();
    const userName = `${mockData.name} ${mockData.lastName}`;

    // Cghecking UI
    await profile.isValidProfileName(userName);
    await profile.isVisibleProfilePhoto();

    // Checking API (real data)
    const { userId, photoFilename, name, lastName } = mockData;
    const { data } = realData;
    expect(data).toBeDefined();
    expect(data.userId).toEqual(userId);
    expect(data.photoFilename).toEqual(photoFilename);
    expect(data.name).toEqual(name);
    expect(data.lastName).toEqual(lastName);
  });
});
