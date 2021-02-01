const postsController = {
  logRequest: (req, res, next) => {
    res.end('There was a request made on /posts');
  },
  getAll: (req, res) => {
    // sql work related stuff
    // send back the data as a json
  },
};

module.exports = postsController;
