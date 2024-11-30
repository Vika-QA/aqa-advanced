const today = new Date();

export const formattedDateDDMMYYYY = (isoDate) => {
  const date = new Date(isoDate);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  return formattedDate;
};

const randomNumberFrom100to10k = () => {
  return Math.floor(Math.random() * (Math.floor(10001) - 100) + 100);
};

export const randomNumberFrom10to100 = () => {
  return Math.floor(Math.random() * (Math.floor(101) - 10) + 10);
};

export const expenseData = (carId) => {
  return {
    carId,
    reportedAt: today,
    mileage: randomNumberFrom100to10k(),
    liters: randomNumberFrom100to10k(),
    totalCost: randomNumberFrom100to10k(),
    forceMileage: false,
  };
};

export const carData = {
  Audi: ["TT", "R8", "Q7", "A6", "A8"],
  BMW: ["3", "5", "X5", "X6", "Z3"],
  Fiat: ["Panda", "Scudo", "Punto", "Ducato", "Palio"],
  Ford: ["Fiesta", "Focus", "Mondeo", "Sierra", "Fusion"],
  Porsche: ["911", "Panamera", "Cayenne"],
};

export const randomDataCar = (carData) => {
  const brands = Object.keys(carData);
  const randomBrand = brands[Math.floor(Math.random() * brands.length)];
  const models = carData[randomBrand];
  const randomModel = models[Math.floor(Math.random() * models.length)];
  return { randomBrand, randomModel };
};
