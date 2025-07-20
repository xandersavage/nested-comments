import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/:id`, { postId });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
