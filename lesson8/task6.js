const numbersList = [1, 10, 14, 2, 4, 5, 43, 34];
const numberListCopy = [...numbersList];
const sortedNumbersList = numberListCopy.sort((a, b) => a - b);

console.log(numbersList);
console.log(sortedNumbersList);
