const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
//write code here

module.exports = router;

// '/users/id': show user profile
router.get(
  '/:userId',
  // usersController.logRequest,
  usersController.getUserById
);
