# Create a ...

WBS Coding School - Team-Project 6 (week 8-10)

> Main goals while working with git and github in a remote team:
>
> **Create Endpoints using Express, NodeJS and Postgres**
>
> Time to accomplish: 2 weeks (2h+/day) | Team-Size: 4

---

### Table of Contents

- [Project Overview](#project-overview)
- [Requirements & Installation](#requirements-and-installation)
- [Technologies & Tools](#technologies-and-tools)
- [Resources](#resources)

---

# Project Overview

### Instructor-Guidance for developing this project

**Database Migration**

- Create a written schema of the data structure (data types, name of tables, fields)
- Create an elephantsql database
- Create tables (posts, users)
- Create specific columns for each table
- Add users (2 of them must be of different premium levels)
- Add posts and reference the users
- Create different queries to retrieve relevant data from the database

**API Definition**

- Create a repo, initialise the project as a nodejs project, install ExpressJS
- Create folder structure: controller, router
- Define different endpoints that might be required
- Separate those endpoints in route files and the corresponding middlewares in controller files
- Test-1: All the created endpoints can just send a basic string

**PG integration with express**

- Create pg queries at least for:
  - Get all posts
  - Get posts ordered by rating
  - Get posts by title partial filter
  - Get partial topic filtering
  - Join user tables on the posts pg requests
  - Create .env file and add dotenv to the server
- Test-2: All created endpoints retrieve the requested data from a database

---

**Endpoints that are now available with this application**

| HTTP Method | ENDPOINTS - URI path with {query params that are available}                    | Description                                   |
| :---------- | :----------------------------------------------------------------------------- | :-------------------------------------------- |
| GET         | `/posts`                                                                       | retrieves all posts                           |
| GET         | `/posts/{postId}`                                                              | retrieves posts with the requested id         |
| GET         | `/posts?orderby={rating or topicId}&sort={desc or asc}`                        | retrieves posts in specific order             |
| GET         | `/posts/search?{title, description, topic}={text}`                             | runs a search on posts based on query params  |
| GET         | `/posts/ratings/{integer, range 1-5}`                                          | retrieves posts filtered by rating (1-5)      |
| GET         | `/posts/users/{userId}`                                                        | retrieves posts of user with the requested id |
| GET         | `/posts/topics/{topicId}`                                                      | retrieves posts with the requested topicid    |
|             |                                                                                |                                               |
| GET         | `/users`                                                                       | retrieves all users                           |
| GET         | `/users/{userId}`                                                              | retrieves data of user with the requested id  |
| GET         | `/users?orderby={username, firstname, username or premiumid}&sort={desc, asc}` | retrieves users in specific order             |
| GET         | `/users/search?who={text&text}`                                                | runs a search on users based on query params  |

---

### Demo

For a DEMO, go to: [Heroku](https://flaky-tales-api.herokuapp.com/)

Test available endpoints for **POSTS**

- [All posts](https://flaky-tales-api.herokuapp.com/posts)
- [Post with postId 4](https://flaky-tales-api.herokuapp.com/posts/4)
- [All posts ordered by {rating} and sorted in {desc}ending order](https://flaky-tales-api.herokuapp.com/posts?orderby=rating&sort=desc)
- [All posts with a rating of 4](https://flaky-tales-api.herokuapp.com/posts/ratings/4)
- [All posts and the users data from user with userId 2](https://flaky-tales-api.herokuapp.com/posts/users/2)
- [All posts with topicId 2](https://flaky-tales-api.herokuapp.com/posts/topics/2)
- [Search for posts of which the title contains Cook](https://flaky-tales-api.herokuapp.com/posts/search?title=Cook)

Test available endpoints for **USERS**

- [All users](https://flaky-tales-api.herokuapp.com/users)
- [User with userId 2](https://flaky-tales-api.herokuapp.com/users/2)
- [All users orderd by {username} and sorted in {desc}ending order](https://flaky-tales-api.herokuapp.com/users?orderby=username&sort=desc)
- [Search for users of which fields contain _"tustra anz"_](https://flaky-tales-api.herokuapp.com/users/search/?who=tustra&anz)

# Requirements and Installation

This project requires [Node.js](https://nodejs.org/en/) v14.x.x to be installed on your machine.
To check your actual version, run:

```bash
$ node --version
```

### Installation

If you want to clone this repository, run:

```bash
$ git clone https://github.com/monoamro/SQL_to_Node.git
$ cd SQL_to_Node
$ npm install
```

To run the application (databse required!): `$ node .`

### Database

sample schema (will be provided soon)

# Technologies and Tools

| Technologies / Tools          | Used               | Notes                                         |
| :---------------------------- | :----------------- | :-------------------------------------------- |
|                               |                    |                                               |
| Express                       | :white_check_mark: | Minimalist web framework for Node.js          |
| Node                          | :white_check_mark: | Server Side JavaScript (asynchronous))        |
| ElephantSQL                   | :white_check_mark: | PostgreSQL as a Service                       |
| PostgreSQL (Postgres)         | :white_check_mark: | RDBMS - relational database management system |
| pgAdmin                       | :white_check_mark: | GUI for PostgreSQL                            |
|                               |                    |                                               |
| Github                        | :white_check_mark: | Version Control                               |
| Postman                       | :white_check_mark: | Testing queries for fetching data             |
|                               |                    |                                               |
| Editor (VS Code) + Extensions | :white_check_mark: | Extension recommended: Prettier               |
|                               |                    |                                               |
| Trello                        | :white_check_mark: | Quick & easy Project-Management               |
| Discord / Google Meet         | :white_check_mark: | Team Communication                            |
|                               |                    |                                               |
| Heroku                        | :white_check_mark: | Publishing                                    |

---

# Resources

Guidance from wbs-instructor for developing the project, see above

### Important resources

**ElephantSQL - PostgreSQL (Postgres)**

- [ElephantSQL Docs](https://www.elephantsql.com/docs/)
- [PostgreSQL-Docs - datatypes](https://www.postgresql.org/docs/9.5/datatype.html)
- [techonthenet - postgresql - datatypes](https://www.techonthenet.com/postgresql/datatypes.php)
- [postgresql - tutorial](https://www.postgresqltutorial.com/)
- [pgAdmin Client - the GUI for your PostgreSQL-database](https://www.pgadmin.org/)

**Express NodeJS**

- [mdn docs - Express_NodeJS - Intro](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [pg module with express](https://node-postgres.com/)
- [Query parameters with express](https://stackabuse.com/get-query-strings-and-parameters-in-express-js/)
- [Query params with express](https://expressjs.com/en/guide/routing.html) _(> Route parameters)_
- [Handle GET and POST Request in Express](https://codeforgeek.com/handle-get-post-request-express-4/)

**Node.js - Learning Resource**

- [Learn You The Node.js](https://github.com/workshopper/learnyounode)
- [Learn Node.js eBook](https://riptutorial.com/ebook/node-js)

**Packages installed in this project**

- [npmjs - express - minimalist web framework for node](https://www.npmjs.com/package/express)
- [npmjs - node-postgres - PostgreSQL client for Node.js](https://www.npmjs.com/package/pg)
- [npmjs - module for environment variables](https://www.npmjs.com/package/dotenv)
- [npmjs - nodemon - automatic restart of node application](https://www.npmjs.com/package/nodemon)
- [npmjs - pg-format](https://www.npmjs.com/package/pg-format)

**Postman - Simplify API Development**

- [Postman](https://www.postman.com/)
- [Learning Postman](https://learning.postman.com/)
- [Installing Postman - recommended](https://learning.postman.com/docs/getting-started/installation-and-updates/)

**Publish Application**

- [Heroku](https://devcenter.heroku.com/articles/git)

### Further resources

**Pictures**

- [Unsplash - image links](https://unsplash.com/)
- [Robohash - generate unique images](https://robohash.org/)
