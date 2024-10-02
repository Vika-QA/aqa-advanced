export const validateString = (value) => {
  if (typeof value !== "string" || value === "") {
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

export const validateFormat = (extension) => {
  const extensions = ["pdf", "txt", "doc", "jpg"];

  if (extensions.includes(extension.toLowerCase())) {
    return true;
  }

  console.log("It is not valid format file");
  return false;
};
