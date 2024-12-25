import { expect, test } from "@playwright/test";
import { RegisterForm } from "../../PageObjectModel";
import { createCleanContext } from "../utils";

/** @type {RegisterForm} */
let registerForm;

const fakerUser = RegisterForm.generateFakerUser();
const longPassword = "VeryyyyyLoooooongPaaaasswoooord!!!!!!!!";
const firstName = "Scarlet-Scarlet";
const lastName = "O'ha ra";
const email = "aqaqqq-supertest123qazqazwoow@qwe.qwe";
const password = "Qa123123!!!";
const rePassword = "Qa123123!!!";
const storageStatePath = "session-storage.json";

test.describe("Checking validation register field", () => {
  test.beforeEach(async ({ browser }) => {
    const context = await createCleanContext(browser, storageStatePath);
    const page = await context.newPage();
    registerForm = new RegisterForm(page, context);
    await registerForm.navigateToPage();
    await registerForm.isVisiblebtnSignUp();
  });

  test("[POSITIVE] Register user", async () => {
    await registerForm.clickSignUpBtn();
    await registerForm.registerFormType(fakerUser);
    await registerForm.checkEqPasswords();
    await registerForm.clickBtnRegister();
    await registerForm.checkRegisterButtonVisible();
    await registerForm.checkUserIsOnExpectedUrl();
    await registerForm.validatePasswordPosAndNeg("to");
    await registerForm.isModalFormVsibility();
    await registerForm.validateNameAndLastNamePosAndNeg("to");
    await registerForm.showAlertSuccessIcon("Registration complete");
  });

  //Checking name with "-", " ' "
  test("[POSITIVE] Register user, v.2", async () => {
    await registerForm.clickSignUpBtn();
    await registerForm.registerFormType({
      firstName,
      lastName,
      email,
      password,
      rePassword,
    });
    await registerForm.clickBtnRegister();
    await registerForm.checkEqPasswords();
    await registerForm.checkRegisterButtonVisible();
    await registerForm.checkUserIsOnExpectedUrl();
    await registerForm.validateNameAndLastNamePosAndNeg("to");
  });

  test("[NEGATIVE] Checking the registration of an already logged in user", async () => {
    await registerForm.clickSignUpBtn();
    await registerForm.registerFormType({
      firstName,
      lastName,
      email,
      password,
      rePassword,
    });
    await registerForm.clickBtnRegister();
    await registerForm.validateNameAndLastNamePosAndNeg("to");
    await registerForm.isVisibleUserAlreadyExist();
  });

  test("[NEGATIVE] Checking Require norification", async () => {
    await registerForm.clickSignUpBtn();
    await registerForm.fillName("");
    await registerForm.fillLastname("");
    await registerForm.showAlertNotification("Name required");
    await registerForm.fillEmail("");
    await registerForm.showAlertNotification("Last name required");
    await registerForm.fillLastname("");
    await registerForm.showAlertNotification("Email required");
    await registerForm.fillPassword("");
    await registerForm.fillRepassword("");
    await registerForm.showAlertNotification("Password required");
    await registerForm.clickModalForm();
    await registerForm.showAlertNotification("Re-enter password required");
    await registerForm.isModalFormVsibility();
  });

  test("[NEGATIVE] Checking Invalid notification", async () => {
    await registerForm.clickSignUpBtn();
    await registerForm.fillName("1");
    await registerForm.fillLastname("1");
    await registerForm.showAlertNotification("Name is invalid");
    await registerForm.fillEmail("1");
    await registerForm.showAlertNotification("Last name is invalid");
    await registerForm.clickModalForm();
    await registerForm.showAlertNotification("Email is incorrect");
    await registerForm.clickModalForm();
    await registerForm.isModalFormVsibility();
  });

  test("[NEGATIVE] Checking password notification", async () => {
    await registerForm.clickSignUpBtn();
    await registerForm.fillPassword(password);
    await registerForm.fillRepassword("Qa123123");
    await registerForm.clickModalForm();
    await registerForm.showAlertNotification("Passwords do not match");
    await registerForm.fillPassword("111");
    await registerForm.clickModalForm();
    await registerForm.showAlertNotification(
      // eslint-disable-next-line max-len
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registerForm.fillPassword(longPassword);
    await registerForm.clickModalForm();
    await registerForm.showAlertNotification(
      // eslint-disable-next-line max-len
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registerForm.checkRegisterButtonDisabled();
    await registerForm.isModalFormVsibility();
  });

  test("[NEGATIVE] Checking Activity button Register", async () => {
    await registerForm.clickSignUpBtn();
    await registerForm.checkRegisterButtonDisabled();
    await registerForm.registerFormType(fakerUser);
    await registerForm.checkRegisterButtonEnable();
  });

  test("[NEGATIVE] Checking email notofication", async () => {
    const validEmail1 = "test@gmail.bg";
    const validEmail2 = "vict@gmail.com";
    const validEmail3 = "TESTSUPERTEST@GMAIL.bg";
    const invalidEmail1 = "sdsf.sddsf#df";
    const invalidEmail2 = "vict@@gmail.com.ua";
    const invalidEmail3 = "testn,@,<com.ua";
    await registerForm.clickSignUpBtn();
    expect(await registerForm.isValidEmail(validEmail1)).toBe(true);
    expect(await registerForm.isValidEmail(invalidEmail1)).toBe(false);
    expect(await registerForm.isValidEmail(validEmail2)).toBe(true);
    expect(await registerForm.isValidEmail(invalidEmail2)).toBe(false);
    expect(await registerForm.isValidEmail(validEmail3)).toBe(true);
    expect(await registerForm.isValidEmail(invalidEmail3)).toBe(false);
  });

  test("[NEGATIVE] Check the numbers of letters in the name and last name", async () => {
    await registerForm.isVisiblebtnSignUp();
    await registerForm.clickSignUpBtn();
    await registerForm.fillName(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
    await registerForm.fillLastname("QQQQQqqqqqqqqqqqqqqqqqqqqq");
    await registerForm.showAlertNotification(
      "Name has to be from 2 to 20 characters long"
    );
    await registerForm.clickModalForm();
    await registerForm.showAlertNotification(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("Negative validation (if this test starts to fail due to this error, need to investigate)", async () => {
    await registerForm.clickSignUpBtn();
    await registerForm.fillName("Ф");
    await registerForm.fillLastname("4");
    await registerForm.fillPassword(longPassword);
    await registerForm.validatePasswordPosAndNeg("not.to");
    await registerForm.validateNameAndLastNamePosAndNeg("not.to");
  });
});
