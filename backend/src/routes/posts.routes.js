import express from 'express';
import { postController } from '../controllers/post.controllers.js';
import { authorUser } from '../middleware/author.js';

const router = express.Router();

// Toi sua lai router cua ong 1 chut nhe
// router.post('/posts', authorUser, postController.createPost);
// router.get('/posts', postController.getAllPosts);
// router.get('/posts/:id', postController.getPostById);
// router.put('/posts/:id', postController.updatePost);
// router.put('/posts/delete-fake/:id', postController.fakeDeletPost);
// router.put('/posts/restore/:id', postController.undoDeletePost);
// router.delete('/posts/:id', postController.deletePost);

router.post('/', authorUser, postController.createPost);
router.get('/', authorUser, postController.getAllPosts);
router.get('/:id', authorUser, postController.getPostById);
router.put('/:id', authorUser, postController.updatePost);
router.put('/delete-fake/:id', authorUser, postController.fakeDeletPost);
router.put('/restore/:id', authorUser, postController.undoDeletePost);
router.delete('/:id', authorUser, postController.deletePost);

export default router;

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 * /posts:
 *  get:
 *    summary: Returns the list of all the posts
 *    tags:
 *      - Posts
 *    responses:
 *      200:
 *        description: The list of the posts
 *        content:
 *          application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some server error
 *  post:
 *    summary: Create a new post
 *    tags: [Posts]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *        description: The post was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      500:
 *        description: Some server error
 * /posts/{id}:
 *  get:
 *    summary: Get the post by id
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *        description: The post description by id
 *        contens:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some error happened
 */