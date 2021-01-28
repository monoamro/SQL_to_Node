// Create entry point
const express = require('express');
const app = express();
const port = 3000;

// const postsRoutes = require('./routes/posts');
// app.use('/posts', postsRoutes);

// Defining an endpoint and handler for the endpoint
// app.get requires two params: path, callback (middleware)
app.get('/', (req, res) => res.send('YOU have accessed / on my api'));

// Starting server
app.listen(port, () => console.log(`Server listening on port ${port}`));
