import express from 'express';
import {
  createDocument,
  getDocumentById,
  getDocuments,
} from '../controllers/documentController.js';
import {
  createDocumentComment,
  getCommentsForDocument,
} from '../controllers/commentController.js';
import { getDummyUser } from '../controllers/userController.js';

const router = express.Router();

// Middleware to attach a fake user to requests (for testing)
router.use(getDummyUser);

// Document routes
router.route('/').post(createDocument).get(getDocuments);
router.get('/:documentId', getDocumentById);

// Comment routes specific to documents
router.post('/:documentId/comments', createDocumentComment); // Create a new top-level comment on a document
router.get('/:documentId/comments', getCommentsForDocument); // Get all comments for a specific document

export default router;
