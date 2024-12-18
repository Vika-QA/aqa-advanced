import { request as apiRequest } from "@playwright/test";

export const createCar = async (carBrandId, carModelId, mileage) => {
  const carContext = await apiRequest.newContext();
  return await carContext.post("api/cars", {
    data: { carBrandId, carModelId, mileage },
  });
};
