const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// CONTROLLERS
let post_controller = require('../controllers/post_controller')
let comment_controller = require('../controllers/comment_controller')
let subreddit_controller = require('../controllers/subreddit_controller')

// POSTS ROUTES

router.put('/vote/post/:id', post_controller.vote);
router.get('/check/states/posts', post_controller.check);

// COMMENTS ROUTES

router.put('/vote/comment/:id', comment_controller.vote);
router.get('/check/states/comments', comment_controller.check);

// SUBBREDDIT ROUTES
router.get('/submit/check/:subreddit', subreddit_controller.check_subreddit);

module.exports = router;