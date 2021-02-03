const pool = require('../dbconfig');

const usersController = {
  logRequest: (req, res, next) => {
    console.log('There was a request made on /users');
    next();
  },

  getUserById: async (req, res) => {
    // sql work related stuff

    try {
      const id = req.params.userId;
      const dbResponse = await pool.query(`SELECT * FROM users WHERE id=$1;`, [
        id,
      ]);
      res.json({
        message: 'Successfully found user',
        code: 200,
        description: 'Array: user by id',
        data: dbResponse.rows,
      });
    } catch (e) {
      console.error(Error(e));
      res.sendStatus(500).json('wrong turn');
    }
    // send back the data as a json
    // res.send(`here you have the user with id ${req.params.userId}`);
  },
};

module.exports = usersController;
