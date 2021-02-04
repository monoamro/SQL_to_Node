const pool = require('../dbconfig');

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

  getPostsByTopicId: async (req, res) => {
    const topicId = parseInt(req.params.topicId);
    if (isNaN(topicId) || topicId < 1) return res.sendStatus(400);

    const query = {
      text: `${sqlAllPosts} WHERE ps.topicid =$1;`,
      values: [topicId],
    };

    try {
      const data = await pool.query(query);

      if (data.rows.length === 0) return res.sendStatus(404);

      res.json(data.rows);
    } catch {
      return res.sendStatus(500);
    }
  },

  getPostsByUserId: async (req, res) => {
    // sql work related stuff
    try {
      const id = req.params.userId;
      const dbResponse = await pool.query(
        `SELECT posts.title, posts.description, users.id FROM posts JOIN users ON users.id = posts.userid WHERE users.id=$1`,
        [id]
      );
      res.json({
        message: 'Successfully found user',
        code: 200,
        description: 'Array: post by db',
        data: dbResponse.rows,
      });
    } catch (e) {
      console.error(Error(e));
      res.sendStatus(500).json('wrong turn');
    }
    // send back the data as a json
    // res.send(`here you have the posts with user id ${req.params.userId}`);
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
