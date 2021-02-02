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

  getPostById: async (req, res) => {
    const {postId} = req.params;
    console.log(req.params)
    try {
      const data = await pool.query("SELECT * FROM posts WHERE id=$1", [postId])
      res.json({
        status: 'success',
        code: 200,
        message: 'Fetched post with id: ' + postId,
        data: data.rows
      })
    } catch (e) {
      console.error(Error(e))
      res.status(500).send('Make sure you have the right post ID!!')
    }
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

  getPostsByRatingDesc: async (_, res) => {
    try {
      const data = await pool.query("SELECT * FROM posts ORDER BY rating DESC")
      res.json({
        status: 'success',
        code: 200,
        message: 'Fetched all posts with rating descending order',
        data: data.rows
      })
    } catch (e) {
      console.error(Error(e))
      res.status(500).send("Something must've seriously gone webkitConvertPointFromNodeToPage, don't panic, restart your computer")
    }
  },
};

module.exports = postsController;
