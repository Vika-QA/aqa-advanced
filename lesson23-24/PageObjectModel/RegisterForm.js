import { faker } from "@faker-js/faker";
import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export class RegisterForm extends BasePage {
  constructor(page, context) {
    super(page, context);
    this.page = page;
    this.context = context;
    this.url = "";
  }

  selectors = {
    btnSignUp: this.page.getByRole("button", { name: "Sign Up" }),
    firstName: this.page.locator("input[id='signupName']"),
    lastName: this.page.locator("input[id='signupLastName']"),
    registerEmail: this.page.locator("input[id='signupEmail']"),
    registerPassword: this.page.locator("input[id='signupPassword']"),
    registerRepassword: this.page.locator("input[id='signupRepeatPassword']"),
    btnRegister: this.page.getByRole("button", { name: "Register" }),
    visibilityModalForm: this.page.locator('[class="modal-content"]'),
    alertNotification: this.page.locator('[class="invalid-feedback"]'),
    alertSuccess: this.page.locator('[class*="alert-success"]'),
    alertDanger: this.page.locator("[class='alert alert-danger']"),
    btnClose: this.page.locator('[class="close"]'),
  };

  async clickSignUpBtn() {
    await this.selectors.btnSignUp.click();
  }

  async checkRegisterButtonVisible() {
    await expect(this.selectors.btnRegister).toBeVisible();
  }

  async checkRegisterButtonEnable() {
    await expect(this.selectors.btnRegister).toBeEnabled();
  }

  async isVisibleUserAlreadyExist() {
    await expect(this.selectors.alertDanger).toHaveText("User already exists");
  }

  async checkRegisterButtonDisabled() {
    await expect(this.selectors.btnRegister).toBeDisabled();
  }

  async fillName(name) {
    await this.selectors.firstName.fill(name);
  }

  async fillLastname(lastName) {
    await this.selectors.lastName.fill(lastName);
  }

  async fillEmail(email) {
    await this.selectors.registerEmail.fill(email);
  }

  async fillPassword(password) {
    await this.selectors.registerPassword.fill(password);
  }

  async fillRepassword(repassword) {
    await this.selectors.registerRepassword.fill(repassword);
  }

  async clickBtnRegister() {
    await this.selectors.btnRegister.click();
  }

  async isVisiblebtnSignUp() {
    await expect(this.selectors.btnSignUp).toBeVisible();
  }

  async isModalFormVsibility() {
    await expect(this.selectors.visibilityModalForm).toBeVisible();
  }

  async clickModalForm() {
    await this.selectors.visibilityModalForm.click();
  }

  async showAlertNotification(text) {
    await expect(this.page.getByText(text)).toBeVisible();
    await expect(this.page.getByText(text)).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  }

  async isValidEmail(email) {
    const emailRegex =
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  async showAlertSuccessIcon(text) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async validateNamePosAndNeg(nameLocator, partOfAssertion) {
    const nameValue = await nameLocator.inputValue();
    const regex = /^[a-zA-Z]{2,20}$/;

    if (partOfAssertion === "to") {
      expect(nameValue).toMatch(regex);
    } else if (partOfAssertion === "not.to") {
      expect(nameValue).not.toMatch(regex);
    } else {
      throw new Error(
        `Invalid value for partOfAssertion: ${partOfAssertion}. Use "to" or "not.to".`
      );
    }
  }

  async validatePasswordPosAndNeg(partOfAssertion) {
    const passwordValue = await this.selectors.registerPassword.inputValue();
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,15}$)/;

    if (partOfAssertion === "to") {
      expect(passwordValue).toMatch(regex);
    } else if (partOfAssertion === "not.to") {
      expect(passwordValue).not.toMatch(regex);
    } else {
      throw new Error(
        `Invalid value for partOfAssertion: ${partOfAssertion}. Use "to" or "not.to".`
      );
    }
  }

  async validateNameAndLastNamePosAndNeg(partOfAssertion) {
    await this.validateNamePosAndNeg(this.selectors.firstName, partOfAssertion);
    await this.validateNamePosAndNeg(this.selectors.lastName, partOfAssertion);
  }

  async checkEqPasswords() {
    const passwordValue = await this.selectors.registerPassword.inputValue();
    const rePasswordValue =
      await this.selectors.registerRepassword.inputValue();
    expect(rePasswordValue).toBe(passwordValue);
  }

  async registerFormType({ firstName, lastName, email, password, rePassword }) {
    await this.validateFullName(this.selectors.firstName, firstName);
    await this.validateFullName(this.selectors.lastName, lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillRepassword(rePassword);
    return this;
  }

  async validateFullName(thisName, name) {
    const cleanedName = name.replace(/[-' ]/g, "");
    await thisName.fill(cleanedName);
    const hasNumbers = /\d/.test(cleanedName);
    expect(hasNumbers).toBe(false);
  }

  async checkUserIsOnExpectedUrl() {
    await expect(this.page).toHaveURL("/panel/garage");
  }

  static generateFakerUser() {
    return {
      firstName: faker.person.firstName().replace(/[-' ]/g, ""),
      lastName: faker.person.lastName().replace(/[-' ]/g, ""),
      email: faker.internet.email(),
      password: "Test123123!!!",
      rePassword: "Test123123!!!",
    };
  }
}
