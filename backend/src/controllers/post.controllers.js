import Post from '../models/posts.model';
import { postValidate } from '../validates/posts.validate';

export const postController = {
  /* create post */
  createPost: async (req, res) => {
    try {
      const body = req.body;
      /* validate */
      const { error } = postValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* create post */
      const post = await Post.create(body);
      if (!post) {
        return res.status(400).json({ message: 'Create post failed' });
      }
      return res.status(200).json({ message: 'Create post successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* get all post */
  /**
   *@swagger
   * /posts:
   *    get:
   *      summary: Get all posts
   *    responses:
   *      200:
   *        description: The list of posts
   *       content:
   *          application/json:
   *           schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Post'
   */
  getAllPosts: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
      };
      const query = q
        ? {
            $and: [
              {
                $or: [
                  { title: { $regex: new RegExp(q), $options: 'i' } },
                  { content: { $regex: new RegExp(q), $options: 'i' } },
                ],
              },
              { deleted: false },
            ],
          }
        : { deleted: false };
      const posts = await Post.paginate(query, options);
      if (!posts) {
        return res.status(400).json({ message: 'Get all posts failed' });
      }
      return res.status(200).json({ message: 'Get all posts successfully', posts });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* get post by id */
  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById({ _id: id });
      if (!post) {
        return res.status(400).json({ message: 'Get post by id failed' });
      }
      return res.status(200).json({ message: 'Get post by id successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* update post */
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      /* validate */
      const { error } = postValidate.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }
      /* update post */
      const post = await Post.findByIdAndUpdate({ _id: id }, body, { new: true });
      if (!post) {
        return res.status(400).json({ message: 'Update post failed' });
      }
      return res.status(200).json({ message: 'Update post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* delete fake */
  fakeDeletPost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndUpdate({ _id: id }, { deleted: true }, { new: true });
      if (!post) {
        return res.status(400).json({ message: 'Delete post failed' });
      }
      return res.status(200).json({ message: 'Delete post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* undo delete fake */
  undoDeletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndUpdate({ _id: id }, { deleted: false }, { new: true });
      if (!post) {
        return res.status(400).json({ message: 'Undo delete post failed' });
      }
      return res.status(200).json({ message: 'Undo delete post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  /* delete post */
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete({ _id: id });
      if (!post) {
        return res.status(400).json({ message: 'Delete post failed' });
      }
      return res.status(200).json({ message: 'Delete post successfully', post });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
