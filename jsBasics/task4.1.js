const radius = 5;
const pi = Math.PI;
const radiusSquare = Math.pow(radius, 2);
const squareRound = +(pi * radiusSquare).toFixed(2);

console.log(squareRound);

// another way
const newRadius = 7;
const newPi = Math.PI;
const newSquareRound = +(pi * newRadius ** 2).toFixed(2);

console.log(newSquareRound);
