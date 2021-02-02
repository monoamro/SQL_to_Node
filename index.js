// Create entry point
const express = require('express');
const dotenv = require('dotenv');
// init of dotenv
dotenv.config();

const app = express();
const { PORT } = process.env;

// const port = 3000;

// import routes
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

// use postsRoutes
app.use('/', postsRoutes);
app.use('/users', usersRoutes);

// Starting server
app.listen(port, () => console.log(`Server listening on port ${port}`));

// mainpage shows all posts:
// http://localhost:3000/ --> should get redirected to http://localhost:3000/posts
