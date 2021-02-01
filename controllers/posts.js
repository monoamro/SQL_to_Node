const postsController = {
  logRequest: (req, res, next) => {
    console.log("There was a request made on /posts");
    next();
  },
  getAll: (req, res) => {
    // sql work related stuff
    res.send("here are all the posts")
    // send back the data as a json
  },
};

module.exports = postsController;
