const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

// get request to homepage
router.get('/', (req, res) => {
    console.log('redirecting from hompage');
    res.redirect('/posts');
  });
  
// First endpoint: "../" & "../posts"
router.get(
  '/posts',
  // postsController.logRequest then get all posts
  postsController.logRequest,
  postsController.getAll
);



module.exports = router;

// ** Further endpoints that will be required:

// '/posts/id'
// '/posts/topics/topicid': show posts by topic
// '/posts/users/userid': show posts by user
// '/posts/ratings/ratingid': show posts by rating
// '/posts/ratings/5': show best posts
