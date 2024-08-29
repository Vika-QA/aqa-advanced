const radius = 12;
const height = 10;
const pi = Math.PI;
const radiusSquare = Math.pow(radius, 2);
const volumeCylinder = +(pi * radiusSquare * height).toFixed(2);

console.log(volumeCylinder);

// another way

const newRadius = 4;
const newHeight = 7;
const newPi = Math.PI;
const newVolumeCylinder = +(pi * newRadius ** 2 * height).toFixed(2);

console.log(newVolumeCylinder);
