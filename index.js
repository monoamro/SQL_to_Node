// Create entry point
const express = require('express');
const dotenv = require('dotenv');
// init of dotenv
dotenv.config();

const app = express();
const { PORT } = process.env || 3000;

// import routes
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

// use postsRoutes
app.use('/', postsRoutes);
app.use('/users', usersRoutes);

// Starting server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
