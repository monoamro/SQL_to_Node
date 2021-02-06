const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

// get request to homepage
router.get('/', (req, res) => {
  res.redirect('/posts');
});

// '/' & '/posts': all posts
router.get('/posts', postsController.getAll);

// '/posts/search?': title, description, topic
router.get('/posts/search', postsController.getPostBySearch);

// '/posts/id': shows post with id postId
router.get('/posts/:postId', postsController.getPostById);

// '/posts/topics/:topicid': show posts by topic
router.get('/posts/topics/:topicId', postsController.getPostsByTopicId);

// '/posts/users/userid': show posts by user
router.get('/posts/users/:userId', postsController.getPostsByUserId);

// '/posts/ratings/:rating': show posts by rating
// '/posts/ratings/5': show best posts
router.get('/posts/ratings/:rating', postsController.getPostsByRating);

module.exports = router;
