import { Fields } from "../../../cypress/PageObjects/Fields";
import { email, password, visitSiteWithAuth } from "./constants";

let fakerUser;
const fields = new Fields();
const firstName = "Scarlet-Scarlet";
const lastName = "O'ha ra";
const longPassword = "VeryyyyyLoooooongPaaaasswoooord!!!!!!!!";
const emailRegex =
  // eslint-disable-next-line max-len
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

describe("Validate registration form", () => {
  beforeEach(() => {
    visitSiteWithAuth();
    fields.clickSignUp();
    fakerUser = Fields.generateFakerUser();
  });

  context("Positive scenario", () => {
    it("Successful registration with valid data", () => {
      fields.registerForm(fakerUser);
      fields.checkRegisterButtonActivity("be.enabled");
      fields.registerButtonClick();
      fields.validateNameAndLastNamePosAndNeg("");
      fields.validatePasswordPosAndNeg("");
      fields.showAlertSuccessIcon();
      fields.checkUserPagePanel();
      fields.checkEqPasswords();
    });

    //Checking name with "-", " ' "
    it("Successful registration with valid data, v.2", () => {
      fields.registerForm({
        firstName,
        lastName,
        email,
        password,
        rePassword: password,
      });
      fields.checkRegisterButtonActivity("be.enabled");
      fields.validateNameAndLastNamePosAndNeg("");
      fields.validatePasswordPosAndNeg("");
      fields.registerButtonClick();
      fields.checkUserPagePanel();
      fields.showAlertSuccessIcon();
      fields.checkEqPasswords();
    });
  });

  context("Negative scenario", () => {
    it("Checking the registration of an already logged in user", () => {
      fields.registerForm({
        firstName,
        lastName,
        email,
        password,
        rePassword: password,
      });
      fields.registerButtonClick();
      fields.notifyUserAlreadyExists();
    });

    it("Checking required fields", () => {
      fields.firstName.clear();
      fields.lastName.clear();
      fields.email.clear();
      fields.password.clear();
      fields.rePassword.clear();
      fields.clickModalForm();
      fields.notifyRequireFieldByText("Name required");
      fields.notifyRequireFieldByText("Last name required");
      fields.notifyRequireFieldByText("Email required");
      fields.notifyRequireFieldByText("Password required");
      fields.notifyRequireFieldByText("Re-enter password required");
      fields.checkRegisterButtonActivity("be.disabled");
    });

    it("Checking not fully correct data", () => {
      fields.firstName.type("A");
      fields.lastName.type(
        "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      );
      fields.email.type("invalidEmail@@");
      fields.password.type("11111");
      fields.rePassword.type("11111");
      fields.clickModalForm();
      fields.notifyRequireFieldByText(
        "Name has to be from 2 to 20 characters long"
      );
      fields.notifyRequireFieldByText(
        "Last name has to be from 2 to 20 characters long"
      );
      fields.notifyRequireFieldByText("Email is incorrect");
      fields.notifyRequireFieldByText(
        // eslint-disable-next-line max-len
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      fields.password.clear().type(password);
      fields.rePassword.clear().type("Hello123");
      fields.notifyRequireFieldByText("Passwords do not match");
      fields.password.clear().type(longPassword);
      fields.notifyRequireFieldByText(
        // eslint-disable-next-line max-len
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      fields.firstName.clear().type(4);
      fields.lastName.clear().type("Hello 123");
      fields.notifyRequireFieldByText("Name is invalid");
      fields.notifyRequireFieldByText("Last name is invalid");
      fields.checkRegisterButtonActivity("be.disabled");

      it("Checking not activity btn", () => {
        fields.checkRegisterButtonActivity("be.disabled");
      });
      it("Checking email", () => {
        const validEmail1 = "test@gmail.bg";
        const validEmail2 = "vict@gmail.com";
        const validEmail3 = "TESTSUPERTEST@GMAIL.bg";
        const invalidEmail1 = "sdsf.sddsf#df";
        const invalidEmail2 = "vict@@gmail.com.ua";
        const invalidEmail3 = "testn,@,<com.ua";

        fields.email.clear().type(validEmail1);
        expect(emailRegex.test(validEmail1)).to.be.true;
        fields.email.type(invalidEmail1);
        expect(emailRegex.test(invalidEmail1)).to.be.false;
        fields.email.clear().type(validEmail2);
        expect(emailRegex.test(validEmail2)).to.be.true;
        fields.email.clear().type(invalidEmail2);
        expect(emailRegex.test(invalidEmail2)).to.be.false;
        fields.email.clear().type(validEmail3);
        expect(emailRegex.test(validEmail3)).to.be.true;
        fields.email.clear().type(invalidEmail3);
        expect(emailRegex.test(invalidEmail3)).to.be.false;
      });
    });
  });

  context(
    "Negative validation (if this test starts to fail due to this error, need to investigate)",
    () => {
      it("Negative checks fields", () => {
        fields.firstName.type("Ф");
        fields.lastName.type(4);
        fields.password.type(longPassword);
        fields.validatePasswordPosAndNeg("not.");
        fields.validateNameAndLastNamePosAndNeg("not.");
      });
    }
  );
});
