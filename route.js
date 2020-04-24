const express = require('express')
const router = express.Router();
const userCalls = require('./controllers/userController')
const postCalls = require('./controllers/postController');


router.get('/', userCalls.homePage)

// register user

router.post('/register', userCalls.userRegister )
router.post('/login', userCalls.userLogin)
router.post('/logout', userCalls.userLogout)

// Post related routes

router.get('/create-post', userCalls.mustBeLoggedIn,  postCalls.viewCreateScreen);
router.post('/create-post', userCalls.mustBeLoggedIn, postCalls.create);
router.get('/post/:id', postCalls.viewSingle);

module.exports = router;