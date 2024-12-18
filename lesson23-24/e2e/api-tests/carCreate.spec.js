import { test, expect } from "@playwright/test";
import { createCar } from "../utils";
import { carIDs, randomCar } from "../constants";

test.describe("Adding car with API", () => {
  test("[POSITIVE] Adding car", async () => {
    const { randomBrandID, randomModelID, randomMileageFrom10to10k } =
      randomCar(carIDs);
    const response = await createCar(
      randomBrandID,
      randomModelID,
      randomMileageFrom10to10k
    );
    const respJson = await response.json();
    const carData = respJson.data;

    expect(response.status()).toBe(201);
    expect(carData).toBeDefined();
    expect(carData.carBrandId).toBe(randomBrandID);
    expect(carData.carModelId).toBe(randomModelID);
    expect(carData.mileage).toBe(randomMileageFrom10to10k);
  });

  test("[NEGATIVE] Adding car with incorrect info v1", async () => {
    const response = await createCar(
      "invalidBrandID",
      "invalidModelID",
      999999999999999
    );
    const respJson = await response.json();

    expect(respJson.data).toBeUndefined();
    expect(response.status()).toBe(400);
    expect(respJson.status).toBe("error");
  });

  test("[NEGATIVE] Adding car with incorrect info v2", async () => {
    const { randomMileageFrom10to10k } = randomCar(carIDs);
    // Brand ID 1 includes Model IDs from 1 to 5. Model ID 7 does not exist for Brand ID 1.
    const response = await createCar(1, 7, randomMileageFrom10to10k);
    const respJson = await response.json();

    expect(respJson.data).toBeUndefined();
    expect(response.status()).toBe(404);
    expect(respJson.status).toBe("error");
  });
});
