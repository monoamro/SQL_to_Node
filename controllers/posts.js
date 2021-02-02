const pool = require('../dbconfig');

const postsController = {
  logRequest: (req, res, next) => {
    console.log('There was a request made on /posts');
    next();
  },
  getAll: async (req, res) => {
    const getAllSQL = `
      SELECT *,
      ( SELECT row_to_json(userinfo)
        FROM
        ( SELECT *
          FROM users WHERE users.id = posts.userid
        ) userinfo
      ) as user FROM posts;`;

    const query = {
      text: getAllSQL,
    };

    try {
      const data = await pool.query(query);
      res.json(data.rows);
    } catch {
      return res.sendStatus(500);
    }
  },

  getPostById: (req, res) => {
    // sql work related stuff
    res.send(`here you have the post with id ${req.params.postId}`);
    // send back the data as a json
  },

  getPostsByTopicId: (req, res) => {
    // sql work related stuff
    res.send(`here you have the posts with topic id ${req.params.topicId}`);
    // send back the data as a json
  },

  getPostsByUserId: (req, res) => {
    // sql work related stuff
    res.send(`here you have the posts with user id ${req.params.userId}`);
    // send back the data as a json
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
