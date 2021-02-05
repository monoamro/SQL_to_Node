const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
//write code here

module.exports = router;
// show all users
router.get(
  '/',
  // usersController.logRequest,
  usersController.getAll
);
// show user profile by ID
router.get(
  '/:userId',
  // usersController.logRequest,
  usersController.getUserById
);
