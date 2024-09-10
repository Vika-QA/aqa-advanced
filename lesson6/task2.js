//------variant 1
const isAdult1 = (age) => age >= 18;

console.log(isAdult1(25));
console.log(isAdult1(15));

//------variant 2
const isAdult2 = (age) => {
  if (age >= 18) {
    return "Person is adult";
  }
  return "Person is not adult";
};

console.log(isAdult2(25));
console.log(isAdult2(15));
