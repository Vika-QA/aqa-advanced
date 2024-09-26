export const validateString = (value) => {
  if (typeof value !== "string") {
    console.log("It is not a string");
    return false;
  }
  return true;
};

export const validateNumber = (value) => {
  if (typeof value !== "number") {
    console.log("It is not a number");
    return false;
  }
  return true;
};
