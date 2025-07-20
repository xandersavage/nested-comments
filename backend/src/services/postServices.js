import { Post } from '../models/postModel.js';

export const getAllPosts = async () => {
  try {
    const posts = await Post.find({}).populate('comments');
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPost = async ({ title, description }) => {
  try {
    const newPost = await Post.create({ title, description });
    return newPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
