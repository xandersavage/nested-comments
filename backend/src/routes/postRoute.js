import express from 'express';
import {
  createPost,
  getPostById,
  getPosts,
} from '../controllers/postController.js';
import {
  createPostComment,
  getCommentForPost,
} from '../controllers/commentController.js';
import { getDummyUser } from '../controllers/userController.js';

const router = express.Router();

// Middleware to attach a fake user to requests (for testing)
// In a real app, this would be an authentication middleware
router.use(getDummyUser);

// Post routes
router.route('/').post(createPost).get(getPosts);
router.get('/:postId', getPostById);

// Comment routes specific to posts
router.post('/:postId/comments', createPostComment); // Create a new top-level comment on a post
router.get('/:postId/comments', getCommentForPost); // Get all comments for a specific post

export default router;
