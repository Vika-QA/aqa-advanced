import { expect } from "@playwright/test";
import BasePage from "./BasePage";

export class GaragePage extends BasePage {
  constructor(page, context) {
    super(page, context);
    this.page = page;
    this.context = context;
    this.url = "";
  }

  selectors = {
    btnAddCar: this.page.getByRole("button", { name: "Add car" }),
    brand: this.page.locator('[id="addCarBrand"]'),
    model: this.page.locator('[id="addCarModel"]'),
    mileage: this.page.locator('[id="addCarMileage"]'),
    btnAdd: this.page.getByRole("button", { name: "Add" }),
    carLogo: this.page.locator('[class="car_logo car-logo"]'),
    carInfo: this.page.locator('[class="car jumbotron"]'),
  };

  async clickAddCarBtn() {
    await this.selectors.btnAddCar.click();
  }

  async chooseBrandFord() {
    await this.selectors.brand.selectOption("Ford");
  }

  async chooseModelFocus() {
    await this.selectors.model.selectOption("Focus");
  }

  async add600Mileage() {
    await this.selectors.mileage.fill("600");
  }

  async clickAddBtn() {
    await this.selectors.btnAdd.click();
  }

  async isVisibleCarLogo() {
    await expect(this.selectors.carLogo.first()).toBeVisible();
  }

  async isVisibleCarInfo() {
    await expect(this.selectors.carInfo.first()).toBeVisible();
  }

  async isCarFordFocus() {
    await expect(this.selectors.carInfo.first()).toContainText("Ford");
    await expect(this.selectors.carInfo.first()).toContainText("Focus");
  }
}
