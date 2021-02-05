const pool = require('../dbconfig');
const buildResponse = require('../response');

const sqlAllPosts = `
SELECT ps.id, ps.title, ps.description, ps.rating, ps.image, ps.topicid,
       tp.title as topictitle,
(
  SELECT row_to_json(userinfo)
  FROM
    ( SELECT us.*, pm.level as premiumlevel
      FROM users us
      JOIN premiums AS pm
      ON us.premiumid=pm.id
      WHERE us.id = ps.userid
    ) userinfo
) AS user
FROM posts AS ps
LEFT JOIN topics AS tp
ON tp.id = ps.topicid `;

const validateId = (id, limit, data, idTitle) => {
  let response = {};

  if (id < limit) {
    response = buildResponse(400, `Wrong ${idTitle}Id`);
    throw response;
  }

  if (data.rows.length === 0) {
    response = buildResponse(404, 'No posts found');
    throw response;
  }
};

const validateRating = rating => {
  const parsedRating = parseInt(rating);

  if (
    !Number.isInteger(parsedRating) ||
    !(parsedRating >= 1 && parsedRating <= 5)
  ) {
    let response = buildResponse(
      400,
      `Rating must be an integer between 1 and 5`
    );
    throw response;
  }
};

const postsController = {
  logRequest: (req, res, next) => {
    console.log('There was a request made on /posts');
    next();
  },

  getAll: async (req, res) => {
    const query = {
      text: sqlAllPosts + ';',
    };

    try {
      const data = await pool.query(query);
      res.json(buildResponse(200, 'Fetched all posts', data.rows));
    } catch {
      if (e.status) {
        return res.status(e.status).json(e);
      } else {
        const response = buildResponse(500, 'Internal server error', e.message);
        return res.status(response.status).json(response);
      }
    }
  },
  getPostBySearch: async (req, res) => {
    let title = req.query.title;
    let topic = req.query.topic;
    let description = req.query.description;
    let query = {};
    if (title) {
      // title = title.toLowerCase();
      query = {
        text: `${sqlAllPosts} WHERE LOWER(posts.title) LIKE LOWER('%${title}%')`,
      };
    }
    if (description) {
      query = {
        text: `${sqlAllPosts} WHERE LOWER(posts.description) LIKE LOWER('%${description}%')`,
      };
    }
    if (topic) {
      query = {
        text: `${sqlAllPosts} WHERE LOWER(tp.title) LIKE LOWER('%${topic}%')`,
      };
    }
    try {
      const data = await pool.query(query);
      res.json(data.rows);
    } catch {
      return res.sendStatus(500);
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
      validateId(postId, 1, data, 'post');
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
      validateId(topicId, 1, data, 'topic');
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
    try {
      const data = await pool.query(
        `SELECT posts.title, posts.description, users.id FROM posts JOIN users ON users.id = posts.userid WHERE users.id=$1`,
        [userId]
      );
      validateId(userId, 1, data, 'user');
      res.json({
        message: 'Successfully fetched posts from user with id: ' + userId,
        code: 200,
        description: 'Array: Posts from user with id: ' + userId,
        data: data.rows,
      });
    } catch (e) {
      console.error(Error(e.message + ' Error: ' + e.code));
      res.status(e.code).send(e.message);
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
      validateRating(rating);
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

  getPostsByRatingDesc: (req, res) => {
    // sql work related stuff
    res.send(`here you have the posts with ordered by rating DESC`);
    // send back the data as a json
  },
};

module.exports = postsController;
