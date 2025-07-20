import { Post } from '../models/postModel.js';

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id;

    const newPost = await Post.create({ title, author, content });
    res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({
      message: 'Error creating post',
      error: e.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    // Populate the author field to get the user details
    const posts = await Post.find().populate('author', 'username email');
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({
      message: 'Error fetching posts',
      error: e.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      'author',
      'username email',
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching posts', error: e.message });
  }
};
