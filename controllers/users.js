const pool = require('../dbconfig');
const format = require('pg-format');
const verify = require('../verify');
const buildResponse = require('../response');

const sqlAllUsers = `SELECT users.* FROM users LEFT JOIN premiums ON users.premiumid=premiums.id `;
const userFields = `WHERE LOWER(username) || ' ' || LOWER(firstname) || ' ' || LOWER(lastname) || ' ' || LOWER(email) `;
const usersController = {
  getAll: async (req, res) => {
    let query = {
      text: sqlAllUsers + ';',
    };

    try {
      if (Object.keys(req.query).length) {
        const { orderby, sort } = req.query;
        verify.query(orderby, sort, 'users');
        query = {
          text: format(`${sqlAllUsers} ORDER BY %I %s`, orderby, sort),
        };
      }
      const data = await pool.query(query);
      res.json(
        buildResponse(200, `found ${data.rows.length} users`, data.rows)
      );
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, 'Internal server error', e.message);
      return res.status(response.status).json(response);
    }
  },

  // example-search: /users/search?who=aratust&fra
  getUserBySearch: async (req, res) => {
    let searchData = req.query.who;

    const query = {
      text: sqlAllUsers + userFields + 'ILIKE $1;',
      values: [`%${searchData}%`],
    };
    try {
      verify.searchData(searchData, 50, 'pattern');
      const data = await pool.query(query);

      res.json(
        buildResponse(
          200,
          `the search for *${searchData}* delivers data for ${data.rows.length} users(s)`,
          data.rows
        )
      );
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, 'not able to search', e.message);
      return res.status(response.status).json(response);
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.userId;
    const query = {
      text: sqlAllUsers + ' WHERE users.id=$1;',
      values: [userId],
    };
    try {
      const data = await pool.query(query);
      verify.id(userId, 1, data, 'user');
      res.json(
        buildResponse(
          200,
          `'the search for UserId:${userId} delivers data for ${data.rows.length} users(s)'`,
          data.rows
        )
      );
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(
        500,
        'not able to search user by Id',
        e.message
      );
      return res.status(response.status).json(response);
    }
  },
};

module.exports = usersController;
