const firstArray = [123, "Viktoriia"];
const secondArray = ["Kiselova", "QA"];

//----------variant 1
const fullArray = firstArray.concat(secondArray);
console.log(fullArray);

//-----------variant 2
const fullArray2 = [...firstArray, ...secondArray];
console.log(fullArray2);
