import { expect } from "@playwright/test";
import BasePage from "./BasePage";

export class Profile extends BasePage {
  selectors = {
    userName: this.page.locator("[class='profile_name display-4']"),
    profilePhoto: this.page.locator('[class="profile_photo"]'),
  };

  async isValidProfileName(text) {
    await expect(this.selectors.userName).toHaveText(text);
  }

  async isVisibleProfilePhoto() {
    await expect(this.selectors.profilePhoto).toBeVisible();
  }
}
