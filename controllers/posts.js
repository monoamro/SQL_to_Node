const postsController = {
  logAllPosts: (req, res) => res.send('YOU have accessed AllPosts'),
  logAllPostsRedirect:
    ('/posts/all',
    (req, res) => {
      res.redirect('/posts/');
    }),

  logRequest: (req, res, next) => {
    console.log('There was a request made on /posts');
    console.log('IP INC: ' + req.ip);
    next();
  },
  getAll: (req, res) => {
    // sql work related stuff
    // send back the data as a json
  },
};

module.exports = postsController;
