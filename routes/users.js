const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
//write code here

module.exports = router;
// show all users
router.get('/', usersController.getAll);

// search user by text
router.get('/search/', usersController.getUserBySearch);

// show user profile by ID
router.get('/:userId', usersController.getUserById);
