function divide(numerator, denominator) {
  if (typeof numerator !== "number" || typeof denominator !== "number") {
    throw new Error("Arguments must be numbers");
  }

  if (denominator == 0) {
    throw new Error("Divide by zero is not possible");
  }

  return numerator / denominator;
}

function divideSafely(numerator, denominator) {
  try {
    let result = divide(numerator, denominator);
    console.log(Math.round(result * 100) / 100);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    console.log("The work is done");
  }
}

divideSafely(10, 3);
divideSafely(7, 0);
divideSafely(undefined, 3);
divideSafely("6", 3);
