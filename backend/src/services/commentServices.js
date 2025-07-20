import { Comment } from '../models/commentModel.js';

export const createComment = async ({ comment, postId }) => {
  try {
    const comment = await Comment.create({ comment, postId });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
