import express from 'express';
import { createCommentReply } from '../controllers/commentController.js';
import { getDummyUser } from '../controllers/userController.js';

const router = express.Router();

// Middleware to attach a fake user to requests (for testing)
router.use(getDummyUser);

// Route to reply to an existing comment
router.post('/:commentId/replies', createCommentReply); // Create a reply to an existing comment

export default router;
