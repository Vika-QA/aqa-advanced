export const carIDs = {
  1: [1, 2, 3, 4, 5],
  2: [6, 7, 8, 9, 10],
  3: [11, 12, 13, 14, 15],
  4: [16, 17, 18],
  5: [19, 20, 21, 22, 23],
};

export const randomCar = (carIDs) => {
  const brandsID = Object.keys(carIDs);
  const randomBrandID = brandsID[Math.floor(Math.random() * brandsID.length)];
  const modelsID = carIDs[randomBrandID];
  const randomModelID = modelsID[Math.floor(Math.random() * modelsID.length)];
  const randomMileageFrom10to10k = Math.floor(
    Math.random() * (Math.floor(10001) - 10) + 10
  );

  return { randomBrandID, randomModelID, randomMileageFrom10to10k };
};
