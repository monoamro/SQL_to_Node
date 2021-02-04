const pool = require('../dbconfig');
const buildResponse = require('../response');

const sqlAllPosts = `
  SELECT *,
  ( SELECT row_to_json(userinfo)
    FROM
    ( SELECT *
      FROM users WHERE users.id = posts.userid
    ) userinfo
  ) as user FROM posts `;

const validateId = (id, limit, data, idTitle) => {
  if(id < limit) throw { code: 400, message: `Wrong ${idTitle}Id` };
  if (data.rows.length === 0) throw { code: 404, message: "No posts found" };
}

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
      res.json(buildResponse(200, "Fetched all posts", data.rows));
    } catch {
      if (e.status) {
        return res.status(e.status).json(e);
      } else {
        const response = buildResponse(500, "Internal server error", e.message);
        return res.status(response.status).json(response);
      }
    }
  },

  getPostById: async (req, res) => {
    const { postId } = req.params;
    const query = {
      text: `${sqlAllPosts} WHERE id=$1;`,
      values: [postId],
    };

    try {
      const data = await pool.query(query);
      validateId(postId, 1, data, "post");
      res.json( buildResponse(200, `'Successfully fetched post with id: ${postId}`, data.rows));
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, "Internal server error", e.message); 
      res.status(response.status).json(response);
    }
  },

  getPostsByTopicId: async (req, res) => {
    const { topicId } = req.params;
    const query = {
      text: `${sqlAllPosts} WHERE posts.topicid =$1;`,
      values: [topicId],
    };

    try {
      const data = await pool.query(query);
      validateId(topicId, 1, data, "topic");
      res.json( buildResponse(200, `'Successfully fetched post with topic id: ${topicId}`, data.rows));
    } catch (e) {
      if (e.status) return res.status(e.status).json(e);
      const response = buildResponse(500, "Internal server error", e.message); 
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
        validateId(userId, 1, data, "user");
        res.json({
        message: 'Successfully fetched posts from user with id: ' + userId,
          code: 200,
          description: 'Array: Posts from user with id: ' + userId,
          data: data.rows,
      });
    } catch (e) {
      console.error(Error(e.message + " Error: " + e.code))
      res.status(e.code).send(e.message);
    }
  },

  getPostsByRating: (req, res) => {
    // sql work related stuff
    res.send(`here you have the posts with rating ${req.params.rating}`);
    // send back the data as a json
  },

  getPostsByRatingDesc: (req, res) => {
    // sql work related stuff
    res.send(`here you have the posts with ordered by rating DESC`);
    // send back the data as a json
  },
};

module.exports = postsController;
