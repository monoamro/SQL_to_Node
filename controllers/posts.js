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
