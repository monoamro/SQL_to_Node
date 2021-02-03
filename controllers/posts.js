const pool = require('../dbconfig');

const postsController = {
  logRequest: (req, res, next) => {
    console.log('There was a request made on /posts');
    next();
  },
  getAll: (req, res) => {
    // sql work related stuff
    res.send('here are all the posts');
    // send back the data as a json
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
