const express = require('express');
const router = express.Router();
const {createPost,getAllPosts,getPostbyID,updatePostById,viewPostThruId,recentPosts} = require('../controllers/PostController');
const path = require('path');
const multer = require('multer')
const storage = multer.diskStorage([])
const uploadMiddleware = multer({ storage: storage });
router.post('/',uploadMiddleware.array("postImages"),createPost); // to create a post 
router.get('/recents',recentPosts) // to get recent 10 posts
router.get('/',getAllPosts); // to get all posts
router.get('/userposts',getPostbyID); // get post by id from token
router.get('/:id',viewPostThruId);
// using post id view post
router.put('/:id',uploadMiddleware.array("postImages"),updatePostById);
// updating post id coming form frontend
// router.delete('/:id',deletePostById);
// to delete a post
module.exports = router;