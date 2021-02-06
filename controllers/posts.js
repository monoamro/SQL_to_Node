const pool = require('../dbconfig');
const format = require('pg-format');
const verify = require('../verify');
const buildResponse = require('../response');

const sqlAllPosts = `
  SELECT ps.id, ps.title, ps.description, ps.rating, ps.image, ps.topicid,
         tp.title as topictitle,
  (
    SELECT row_to_json(userinfo)
    FROM
      ( SELECT us.*, pm.level as premiumlevel
        FROM users us
        LEFT JOIN premiums AS pm
        ON us.premiumid=pm.id
        WHERE us.id = ps.userid
      ) userinfo
  ) AS user
  FROM posts AS ps
  LEFT JOIN topics AS tp
  ON tp.id = ps.topicid `;

const sqlPostsByUserId = `
  SELECT * FROM (
    SELECT row_to_json(userinfo) AS "user"
    FROM (
      SELECT us1.*, pm.level as premiumlevel
      FROM users us1
  	  LEFT JOIN premiums AS pm ON us1.premiumid=pm.id
      WHERE us1.id=$1
    ) AS userinfo
  ) AS userdata,
    (SELECT json_agg(row_to_json(postsinfo)) AS "posts"
    FROM (
    SELECT ps.id, ps.title, ps.description, ps.topicid, tp.title as topictitle
    FROM posts AS ps
    JOIN users us2 ON us2.id = ps.userid
    LEFT JOIN topics AS tp ON tp.id = ps.topicid
    WHERE us2.id=$1
    ) AS postsinfo
  ) AS postsdata `;

const postsController = {
  getAll: async (req, res) => {
    let query = { text: sqlAllPosts + ';' };
    try {
      if (Object.keys(req.query).length) {
        const { orderby, sort } = req.query;
        verify.query(orderby, sort);
        query = {
          text: format(`${sqlAllPosts} ORDER BY %I %s`, orderby, sort),
        };
      }
      const data = await pool.query(query);
      res.json(buildResponse(200, 'Fetched all posts', data.rows));
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, 'Internal server error', e.message);
      return res.status(response.status).json(response);
    }
  },
  getPostBySearch: async (req, res) => {
    const { title, description, topic } = req.query;
    let query = {};
    if (title) {
      query = {
        text: `${sqlAllPosts} WHERE ps.title ILIKE $1`,
        values: ['%' + title + '%'],
        name: 'title',
      };
    }
    if (description) {
      query = {
        text: `${sqlAllPosts} WHERE ps.description ILIKE $1`,
        values: ['%' + description + '%'],
        name: 'description',
      };
    }
    if (topic) {
      query = {
        text: `${sqlAllPosts} WHERE tp.title ILIKE $1`,
        values: ['%' + topic + '%'],
        name: 'topic',
      };
    }
    try {
      const data = await pool.query(query);
      res.json(
        buildResponse(200, 'Fetched all posts that match the search', data.rows)
      );
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, 'Internal server error', e.message);
      return res.status(response.status).json(response);
    }
  },

  getPostById: async (req, res) => {
    const { postId } = req.params;
    const query = {
      text: `${sqlAllPosts} WHERE ps.id=$1;`,
      values: [postId],
    };

    try {
      const data = await pool.query(query);
      verify.id(postId, 1, data, 'post');
      res.json(
        buildResponse(
          200,
          `Successfully fetched post with id: ${postId}`,
          data.rows
        )
      );
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, 'Internal server error', e.message);
      res.status(response.status).json(response);
    }
  },

  getPostsByTopicId: async (req, res) => {
    const { topicId } = req.params;
    const query = {
      text: `${sqlAllPosts} WHERE ps.topicid =$1;`,
      values: [topicId],
    };

    try {
      const data = await pool.query(query);
      verify.id(topicId, 1, data, 'topic');
      res.json(
        buildResponse(
          200,
          `Successfully fetched post with topic id: ${topicId}`,
          data.rows
        )
      );
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, 'Internal server error', e.message);
      res.status(response.status).json(response);
    }
  },

  getPostsByUserId: async (req, res) => {
    const { userId } = req.params;

    const query = {
      text: sqlPostsByUserId + ';',
      values: [userId],
    };

    try {
      const data = await pool.query(query);
      verify.id(userId, 1, data, 'user');
      res.json(
        buildResponse(
          200,
          `Successfully fetched posts from user with id: ${userId}`,
          data.rows
        )
      );
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, 'Internal server error', e.message);
      return res.status(response.status).json(response);
    }
  },

  getPostsByRating: async (req, res) => {
    const { rating } = req.params;
    const query = {
      text: `${sqlAllPosts} WHERE ps.rating=$1;`,
      values: [rating],
    };

    try {
      const data = await pool.query(query);
      verify.rating(rating);
      res.json(
        buildResponse(
          200,
          `Successfully fetched post with rating: ${rating}`,
          data.rows
        )
      );
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, 'Internal server error', e.message);
      res.status(response.status).json(response);
    }
  },
};

module.exports = postsController;
