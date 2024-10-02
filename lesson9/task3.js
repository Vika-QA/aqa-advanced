const car1 = {
  brand: "Skoda",
  model: "Oktavia",
  year: 2020,
};

const car2 = {
  brand: "VW",
  model: "Arteon",
  year: 2021,
};

const car3 = { ...car1, ...car2 };

console.log(car3);
