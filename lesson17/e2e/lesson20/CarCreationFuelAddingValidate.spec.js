import { Expenses } from "../../../cypress/PageObjects/Expenses";
import { Garage } from "../../../cypress/PageObjects/Garage";
import { visitSiteWithAuth } from "../lesson18/constants";
import {
  addRandomCarToGarage,
  expenseData,
  formattedDateDDMMYYYY,
} from "./constants";

let car;
let carId;
let carBrand;
let carModel;

let date;
let mileage;
let liters;
let totalCost;

let cookieValue;

const garage = new Garage();
const expense = new Expenses();

beforeEach(() => {
  visitSiteWithAuth();
  cy.login(Cypress.env("email"), Cypress.env("password"));
  cy.wait(500);
  cy.getCookie("sid")
    .should("exist")
    .then((cookie) => {
      cookieValue = cookie.value;
      cy.log(`Cookie sid: ${cookieValue}`);
    });
});

describe("Create car, adding fuel expense and validate info", () => {
  it("[POST][Intercepter] Create car with API", () => {
    cy.intercept("POST", "api/cars").as("createCar");
    addRandomCarToGarage();
    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      const car = response.body.data;
      carId = car.id;
      carBrand = car.brand;
      carModel = car.model;
    });
  });

  it("[GET] Checking list car", () => {
    cy.request({
      method: "GET",
      url: "api/cars",
      failOnStatusCode: false,
      headers: {
        Cookie: `sid=${cookieValue}`,
      },
    }).then(({ body: { data } }) => {
      car = data.find((car) => car.id === carId);
      expect(car).to.exist;
      expect(car.id).to.eq(carId);
      expect(car.brand).to.eq(carBrand);
      expect(car.model).to.eq(carModel);
    });
  });

  it("[POST] Adding expenses", () => {
    cy.createExpense(cookieValue, expenseData(carId)).then((response) => {
      const data = response.body.data;
      date = data.reportedAt;
      mileage = data.mileage;
      liters = data.liters;
      totalCost = data.totalCost;
      expect(response.status).to.eq(200);
      expect(response.statusText).to.eq("OK");
      expect(data.carId).to.eq(carId);
      expect(data.carId).to.be.a("number");
      expect(data)
        .to.have.property("id")
        .that.is.a("number")
        .and.is.greaterThan(0);
      expect(data)
        .to.have.property("liters")
        .that.is.a("number")
        .and.is.greaterThan(0);
      expect(data)
        .to.have.property("mileage")
        .that.is.a("number")
        .and.is.greaterThan(0);
      expect(data).to.have.property("reportedAt").that.is.a("string").and.is.not
        .empty;
      expect(data)
        .to.have.property("totalCost")
        .that.is.a("number")
        .and.is.greaterThan(0);
    });
  });

  it("Find my ID car and checking expense", () => {
    garage.showInfoAboutCar().contains(carBrand);
    garage.showInfoAboutCar().contains(carModel);
    expense.clickSidebar("Fuel expenses");
    expense.titleCarSelect(carBrand);
    expense.titleCarSelect(carModel);
    expense.isListExpensesCarAllTableVisible();
    expense.getListExpensesCar().each(($row) => {
      cy.wrap($row).within(() => {
        expense.getRowExpensesCar(0, formattedDateDDMMYYYY(date));
        expense.getRowExpensesCar(1, mileage);
        expense.getRowExpensesCar(2, `${liters}L`);
        expense.getRowExpensesCar(3, `${totalCost}.00 USD`);
      });
    });
  });
});
