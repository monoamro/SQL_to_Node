const express = require('express');
const app = express();
const port = 3000;

const postsRoutes = require('./routes/posts');

app.use("/posts", postsRoutes);