import { Expenses } from "../../../cypress/PageObjects/Expenses";
import { Garage } from "../../../cypress/PageObjects/Garage";
import { visitSiteWithAuth } from "../lesson18/constants";
import { expenseData, formattedDateDDMMYYYY } from "./constants";

let car;
let carId;
let carBrand;
let carModel;

let date;
let mileageValue;
let litersValue;
let totalCostValue;

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
    garage.addRandomCarToGarage();
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
    cy.createExpense(cookieValue, expenseData(carId)).then(
      ({
        status,
        statusText,
        body: {
          data: { reportedAt, mileage, liters, totalCost, carId, id },
        },
      }) => {
        cy.wrap({
          reportedAt,
          mileage,
          liters,
          totalCost,
          carId,
          id,
        }).as("expenseData");

        expect(status).to.eq(200);
        expect(statusText).to.eq("OK");

        cy.get("@expenseData").then(
          ({ reportedAt, mileage, liters, totalCost, carId, id }) => {
            date = reportedAt;
            mileageValue = mileage;
            litersValue = liters;
            totalCostValue = totalCost;

            expect(carId).to.eq(carId);
            expect(carId).to.be.a("number");
            expect(id).to.be.a("number").and.is.greaterThan(0);
            expect(liters).to.be.a("number").and.is.greaterThan(0);
            expect(mileage).to.be.a("number").and.is.greaterThan(0);
            expect(reportedAt).to.be.a("string").and.is.not.empty;
            expect(totalCost).to.be.a("number").and.is.greaterThan(0);
          }
        );
      }
    );
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
        expense.getRowExpensesCar(1, mileageValue);
        expense.getRowExpensesCar(2, `${litersValue}L`);
        expense.getRowExpensesCar(3, `${totalCostValue}.00 USD`);
      });
    });
  });
});
