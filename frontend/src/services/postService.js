import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

export const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPosts = async (title, description) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, {
      title,
      description,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
