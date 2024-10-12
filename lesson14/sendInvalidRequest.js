import axios from "axios";

export const sendInvalidRequest = async (invalidUrl) => {
  try {
    const response = await axios.get(invalidUrl);
    return response;
  } catch (error) {
    const errorDescription = `ERROR from ${invalidUrl} ${error.message}`;
    console.log(errorDescription);
    throw new Error(errorDescription);
  }
};
