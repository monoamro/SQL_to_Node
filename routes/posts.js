const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

// get request to homepage
router.get('/', (req, res) => {
  console.log('redirecting from homepage');
  res.redirect('/posts');
});

// First endpoint: "../" & "../posts"
router.get(
  '/posts',
  // postsController.logRequest,
  postsController.getAll
);

//'/posts/search? title, description, topic
router.get('/posts/search', postsController.getPostBySearch);

// '/posts/id'
router.get(
  '/posts/:postId',
  // postsController.logRequest,
  postsController.getPostById
);

// '/posts/topics/topicid': show posts by topic
router.get(
  '/posts/topics/:topicId',
  // postsController.logRequest,
  postsController.getPostsByTopicId
);

// '/posts/users/userid': show posts by user
router.get(
  '/posts/users/:userId',
  // postsController.logRequest,
  postsController.getPostsByUserId
);

// '/posts/ratings/rating': show posts by rating
// '/posts/ratings/5': show best posts
router.get(
  '/posts/ratings/:rating',
  // postsController.logRequest,
  postsController.getPostsByRating
);


module.exports = router;
