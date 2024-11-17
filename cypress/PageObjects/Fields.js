import { faker } from "@faker-js/faker";

export class Fields {
  get btnSignUp() {
    return cy.get("[class*='btn-primary']");
  }

  get firstName() {
    return cy.get('[id="signupName"]');
  }

  get lastName() {
    return cy.get('[id="signupLastName"]');
  }

  get email() {
    return cy.get('[id="signupEmail"]');
  }

  get password() {
    return cy.get('[id="signupPassword"]');
  }

  get rePassword() {
    return cy.get('[id="signupRepeatPassword"]');
  }

  get registerButton() {
    return cy.get('[class*="btn-primary"]').contains("Register");
  }

  get requireField() {
    return cy.get('[class="invalid-feedback"]');
  }

  get modalForm() {
    return cy.get('[class="modal-footer"]');
  }

  get userPage() {
    return cy.url();
  }

  get userAlreadyExists() {
    return cy.get("[class='alert alert-danger']");
  }

  get alertSuccess() {
    return cy.get('[class*="alert-success"]');
  }

  get successfullyLoginUser() {
    return cy.get('[class*="alert-success"]');
  }

  showSuccessfullyLoginUser() {
    this.successfullyLoginUser;
    "contain.text", "You have been successfully logged in";
  }
  showAlertSuccessIcon() {
    this.alertSuccess.should("contain.text", "Registration complete");
  }

  validatePasswordPosAndNeg(partOfAssertion) {
    this.password
      .invoke("val")
      .should(
        `${partOfAssertion}match`,
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,15}$)/
      );
  }

  validateNamePosAndNeg(name, partOfAssertion) {
    name.invoke("val").should(`${partOfAssertion}match`, /^[a-zA-Z]{2,20}$/);
  }

  validateNameAndLastNamePosAndNeg(partOfAssertion) {
    this.validateNamePosAndNeg(this.firstName, partOfAssertion);
    this.validateNamePosAndNeg(this.lastName, partOfAssertion);
  }

  clickSignUp() {
    this.btnSignUp.click();
  }

  clickModalForm() {
    this.modalForm.click();
  }

  notifyRequireFieldByText(message) {
    return this.requireField
      .should("contain.text", message)
      .should("have.css", "border-color", "rgb(220, 53, 69)");
  }

  registerButtonClick() {
    this.registerButton.click();
  }

  checkRegisterButtonActivity(assertion) {
    this.registerButton.should(assertion);
  }

  checkUserPagePanel() {
    cy.url().should("eq", `${Cypress.config("baseUrl")}panel/garage`);
  }

  notifyUserAlreadyExists() {
    this.userAlreadyExists
      .should("be.visible")
      .and("contain.text", "User already exists");
  }

  validateFullName(thisName, name) {
    thisName.type(name.replace(/[-' ]/g, "")).should("not.include", /\d/);
  }

  checkEqPasswords() {
    this.password.invoke("val").then((password) => {
      this.rePassword.invoke("val").should("eq", password);
    });
  }

  registerForm({ firstName, lastName, email, password, rePassword }) {
    this.validateFullName(this.firstName, firstName);
    this.validateFullName(this.lastName, lastName);
    this.email.type(email);
    this.password.type(password);
    this.rePassword.type(rePassword);
    return this;
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
