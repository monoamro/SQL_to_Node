const pool = require('../dbconfig');

const usersController = {
  logRequest: (req, res, next) => {
    console.log('There was a request made on /users');
    next();
  },

  getUserById: (req, res) => {
    // sql work related stuff
    res.send(`here you have the user with id ${req.params.userId}`);
    // send back the data as a json
  },
};

module.exports = usersController;
