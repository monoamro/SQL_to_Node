const pool = require('../dbconfig');

// const sqlAllUsers = `SELECT array_to_json(array_agg(userinfo))
const sqlAllUsers = `SELECT row_to_json(userinfo)
FROM
  (
    SELECT us.* from users us
  ) userinfo
`;

const usersController = {
  logRequest: (req, res, next) => {
    console.log('There was a request made on /users');
    next();
  },
  getAll: async (req, res) => {
    const query = {
      text: sqlAllUsers + ';',
    };

    try {
      const data = await pool.query(query);
      res.status(200).json({
        status: `'Successfully found ${data.rows.length} users'`,
        data: data.rows,
      });
    } catch {
      res.status(500).send(`wrong turn`);
    }
  },

  getUserBySearch: async (req, res) => {
    let usr = req.query.who;
    const query = {
      text:
        sqlAllUsers +
        " WHERE LOWER(username) || ' ' || LOWER(firstname) || ' ' || LOWER(lastname) || ' ' || LOWER(email) ILIKE $1;",
      values: [`%${usr}%`],
    };
    try {
      const data = await pool.query(query);
      res.status(200).json({
        status: `'Found ${data.rows.length} users with the requested data: ${usr}'`,
        data: data.rows,
      });
    } catch {
      res.status(500).send(`something went wrong, search again`);
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.userId;
    const query = {
      text: sqlAllUsers + 'WHERE id=$1;',
      values: [userId],
    };
    try {
      const data = await pool.query(query);
      res.json({
        message: 'Successfully found user',
        code: 200,
        description: 'Array: user by id',
        data: data.rows,
      });
    } catch (e) {
      console.error(Error(e));
      res.status(500).send(`wrong turn: not able to search user by ID`);
    }
  },
};

module.exports = usersController;
