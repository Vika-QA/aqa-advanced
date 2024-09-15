//function declaration
function calculateRectangleArea1(width, height) {
  return width * height;
}
console.log(calculateRectangleArea1(5, 10));

//function expression
const calculateRectangleArea2 = function (width, height) {
  return width * height;
};
const rectangleArea = calculateRectangleArea2(5, 10);
console.log(rectangleArea);

//arrow function
const calculateRectangleArea3 = (width, height) => width * height;

console.log(calculateRectangleArea3(5, 10));
