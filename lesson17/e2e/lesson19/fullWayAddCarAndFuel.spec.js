import { Expenses } from "../../../cypress/PageObjects/Expenses";
import { Garage } from "../../../cypress/PageObjects/Garage";
import { visitSiteWithAuth } from "../lesson18/constants";

const garage = new Garage();
const expenses = new Expenses();

const getTodayDateDDMMYYYY = () => {
  const now = new Date();
  const today = new Date(now.getTime());
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDateToday = `${day}.${month}.${year}`;
  return formattedDateToday;
};

const addSpecificCarToGarage = () => {
  garage.clickAddCar();
  garage.chooseBrand("Fiat");
  garage.chooseModel("Panda");
  garage.addMileage("123");
  garage.clickAddCarPopup();
};

beforeEach(() => {
  visitSiteWithAuth();
  cy.login(Cypress.env("email"), Cypress.env("password"));
  cy.url().then((currentUrl) => {
    cy.task("log", `Current URL: ${currentUrl}`);
  });
});

describe("Full Way", () => {
  afterEach(() => {
    garage.deleteAllCars();
  });

  context("POSITIVE, full way", () => {
    it("Add a car and add an expense", () => {
      addSpecificCarToGarage();
      garage.showInfoAboutCar();
      expenses.clickSidebar("Fuel expenses");
      expenses.isFuelExpensesTextVisible();
      expenses.clickAddAnExpense();
      expenses.showReportDate();
      expenses.typeReportDate(getTodayDateDDMMYYYY());
      expenses.addNumberOfLiters("123");
      expenses.addTotalCost("300");
      expenses.addMileageFuel().clear().type("200");
      expenses.clickAddFuel();
      expenses.showAlertNotification("Fuel expense added");
      expenses.showAlertNotification("Car added");
      expenses.clickSidebar("Garage");
    });
  });

  context("NEGATIVE, checking notification", () => {
    it("First expense mileage must not be less or equal to car initial mileage", () => {
      addSpecificCarToGarage();
      garage.showInfoAboutCar();
      expenses.clickSidebar("Fuel expenses");
      expenses.isFuelExpensesTextVisible();
      expenses.clickAddAnExpense();
      expenses.showReportDate();
      expenses.addNumberOfLiters("123");
      expenses.addTotalCost("300");
      expenses.clickAddFuel();
      expenses.showAlertDangerNotification(
        "First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 123"
      );
      expenses.clickBtnClose();
      expenses.clickSidebar("Garage");
    });

    it("Checking notification with 26 cars (limit 25)", () => {
      addSpecificCarToGarage();
      garage.showInfoAboutCar().then(($cars) => {
        const currentCarCount = $cars.length;
        const carData = {
          Audi: ["TT", "R8", "Q7", "A6", "A8"],
          BMW: ["3", "5", "X5", "X6", "Z3"],
          Fiat: ["Panda", "Scudo", "Punto", "Ducato", "Palio"],
          Ford: ["Fiesta", "Focus", "Mondeo", "Sierra", "Fusion"],
          Porsche: ["911", "Panamera", "Cayenne"],
        };

        if (currentCarCount < 25) {
          const carsToAdd = 25 - currentCarCount;
          for (let i = 1; i <= carsToAdd; i++) {
            const brands = Object.keys(carData);
            const randomBrand =
              brands[Math.floor(Math.random() * brands.length)];

            const models = carData[randomBrand];
            const randomModel =
              models[Math.floor(Math.random() * models.length)];

            garage.clickAddCar();
            // Without it Brand's IDs overlap (2 ones IDs) and the test does not select the correct selector
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(500);
            garage.chooseBrand(randomBrand);
            garage.chooseModel(randomModel);
            // random miles from 100 to 10000
            garage.addMileage(
              Math.floor(Math.random() * (Math.floor(10001) - 100) + 100)
            );
            garage.clickAddCarPopup();
          }
        }
        garage.showInfoAboutCar().should("have.length", 25);
        garage.clickAddCar();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);
        // Add 26nd car, when limit car is 25
        garage.chooseBrand("Audi");
        garage.chooseModel("R8");
        garage.addMileage("547");
        garage.clickAddCarPopup();
        cy.contains("Cars limit reached").should("be.visible");
      });
    });
  });
});

describe("[NEGATIVE] Full way, Another group test (without delete all cars)", () => {
  it("Checking disable btn 'Add an expense'", () => {
    addSpecificCarToGarage();
    expenses.clickSidebar("Fuel expenses");
    expenses.visibleCarSelect("to.be.visible");
    expenses.visibleAddAnExpense("to.be.enabled");
    expenses.clickSidebar("Garage");
    garage.deleteAllCars();
    expenses.clickSidebar("Fuel expenses");
    expenses.visibleAddAnExpense("to.be.disabled");
    expenses.visibleCarSelect("not.exist");
  });
  it("Checking notification modal popup Add an expense", () => {
    addSpecificCarToGarage();
    garage.showInfoAboutCar();
    expenses.clickSidebar("Fuel expenses");
    expenses.isFuelExpensesTextVisible();
    expenses.clickAddAnExpense();
    expenses.showReportDate();
    expenses.typeReportDate("21.11.2024");
    expenses.addNumberOfLiters("1234");
    expenses.addTotalCost("1234");
    expenses.clickAddFuel();
    expenses.showAlertDangerNotification(
      "New expense date must not be less than car creation date. "
    );
    expenses.typeReportDate("21.12.2024");
    expenses.clickAddFuel();
    expenses.showAlertDangerNotification(
      "Report date has to be less than tomorrow"
    );
    expenses.addNumberOfLiters("1234").clear().type("111110");
    expenses.showAlertDangerNotification("Liters has to be from 0.01 to 9999");
    expenses.addTotalCost("1234").clear().type("111111111111111");
    expenses.showAlertDangerNotification(
      "Total cost has to be from 0.01 to 1000000"
    );
  });
});
