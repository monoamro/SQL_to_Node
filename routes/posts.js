const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

// First endpoint: "../" & "../posts"
router.get(
  '/',
  //   postsController.logRequest,
  postsController.logAllPostsRedirect
);

module.exports = router;

// ** Further endpoints that will be required:

// '/posts/id'
// '/posts/topics/topicid': show posts by topic
// '/posts/users/userid': show posts by user
// '/posts/ratings/ratingid': show posts by rating
// '/posts/ratings/5': show best posts
