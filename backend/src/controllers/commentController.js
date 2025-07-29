import { Comment } from '../models/commentModel.js';
import { Document } from '../models/documentModel.js';
import { Post } from '../models/postModel.js';
import { buildCommentTree } from '../utils/commentTreeBuilder.js';

// Controller for creating a top-level comment on a Post
export const createPostComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const author = req.user._id; // Assuming req.user is set by auth middleware

    // Verify if a post exists
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = await Comment.create({
      text,
      author,
      parentEntityId: postId,
      onModel: 'Post', // Explicitly 'Post'
      parentId: null, // Top-level comment
    });

    // Populate the author for the response before sending
    await newComment.populate('author', 'username email');
    res.status(201).json(newComment);
  } catch (e) {
    console.error('Error creating post comment:', e);
    res
      .status(400)
      .json({ message: 'Error creating post comment', error: e.message });
  }
};

// Controller for creating a top-level comment on a Document
export const createDocumentComment = async (req, res) => {
  try {
    const { text } = req.body;
    const documentId = req.params.documentId;
    const author = req.user._id; // Assuming req.user is set by auth middleware

    // Verify if the document exists
    const documentExists = await Document.findById(documentId);
    if (!documentExists) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const newComment = await Comment.create({
      text,
      author,
      parentEntityId: documentId,
      onModel: 'Document', // Explicitly 'Document'
      parentId: null, // Top-level comment
    });

    await newComment.populate('author', 'username email');
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating document comment:', error);
    res.status(400).json({
      message: 'Error creating document comment',
      error: error.message,
    });
  }
};

// Controller for creating a reply to an existing comment
export const createCommentReply = async (req, res) => {
  try {
    const { text } = req.body;
    const parentCommentId = req.params.commentId; // The ID of the comment being replied to
    const author = req.user._id; // Assuming req.user is set by the auth middleware

    // Find the parent comment to inherit its parentEntityId and onModel
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    const newReply = await Comment.create({
      text,
      author,
      // Inherit the ultimate parent entity from the direct parent comment
      parentEntityId: parentComment.parentEntityId,
      onModel: parentComment.onModel,
      parentId: parentCommentId, // This is the ID of the direct parent comment
    });
    await newReply.populate('author', 'username email');
    res.status(201).json(newReply);
  } catch (e) {
    console.error('Error creating comment reply:', e);
    res
      .status(400)
      .json({ message: 'Error creating comment reply', error: e.message });
  }
};

// Controller for fetching comments for a Post (with nesting)
export const getCommentForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log('Fetching comments for postId:', postId);

    // Find all comments belonging to this post (top-level, and all replies)
    const comments = await Comment.find({
      parentEntityId: postId,
      onModel: 'Post',
    })
      .populate('author', 'username email')
      .sort({ createdAt: 1 }) // Sort from DB by creation date (important for buildCommentTree)
      .lean(); // Use .lean() for plain JavaScript objects for buildCommentTree performance

    // console.log('Raw comments found:', comments);

    const nestedComments = buildCommentTree(comments); // Use our imported helper
    // console.log('Nested comments:', nestedComments);
    res.status(200).json(nestedComments);
  } catch (e) {
    console.error('Error fetching comments for post:', e);
    res
      .status(500)
      .json({ message: 'Error fetching comments for post', error: e.message });
  }
};

// Controller for fetching comments for a Document (with nesting)
export const getCommentsForDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const comments = await Comment.find({
      parentEntityId: documentId,
      onModel: 'Document',
    })
      .populate('author', 'username email')
      .sort({ createdAt: 1 })
      .lean();

    const nestedComments = buildCommentTree(comments); // Use our imported helper
    res.status(200).json(nestedComments);
  } catch (error) {
    console.error('Error fetching comments for document:', error);
    res.status(500).json({
      message: 'Error fetching comments for document',
      error: error.message,
    });
  }
};
