import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Polymorphic Reference: Which post or document this comment belongs to
    parentEntityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // This is the magic for polymorphic: 'refPath' tells Mongoose to use the value of 'onModel'
      refPath: 'onModel',
    },
    onModel: {
      type: String,
      required: true,
      enum: ['Post', 'Document'], // Specifies that it can only refer to a 'Post' or a 'Document'
    },

    // Adjacency List: For nested comments (replying to another comment)
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // Self-referencing: refers to another Comment document
      default: null, // If null, this is a top-level comment (not a reply to another comment)
    },
  },
  {
    timestamps: true,
  },
);

export const Comment = mongoose.model('Comment', commentSchema);
