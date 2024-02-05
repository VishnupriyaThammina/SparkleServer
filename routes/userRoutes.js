const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getUserbyUsername, updateUserByUsername,logoutUser,current } = require('../controllers/UserController');
const { login } = require('../controllers/authController');
const jwt = require('../jwt/jwt'); // JWT played a major role
const path = require('path');
const multer = require('multer')
const storage = multer.diskStorage([])
const uploadMiddleware = multer({ storage: storage });
router.post('/register', createUser); // to create or register a user
router.post('/login', login); // route to login
router.get('/', getAllUsers);// to get all users
router.get('/current',current); // to get details of current user
router.get('/:username', getUserbyUsername); // to get user data
router.put('/update', updateUserByUsername);//to update user data
router.post('/logout',logoutUser)//route for loging out
module.exports = router;
