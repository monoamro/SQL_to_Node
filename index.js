// Create entry point
const express = require('express');
const app = express();
const port = 3000;
// import routes
const postsRoutes = require('./routes/posts');

// use postsRoutes
app.use('/posts', postsRoutes);

// get request to homepage
app.get('/', (req, res) => {
  console.log('redirecting from hompage');
  res.redirect('/posts');
});

// Starting server
app.listen(port, () => console.log(`Server listening on port ${port}`));

// test our first endpoint:
// http://localhost:3000/posts --> should be redirected to http://localhost:3000/
