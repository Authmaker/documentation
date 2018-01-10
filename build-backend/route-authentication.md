---
title: Route authentication
---

Chances are, you do not want your API to be fully accessible to anyone. If we were building a blog, we want to allow guests to read posts, but not to create or edit them. Additionally, we want to make sure we assign an authenticated user to each created post, so that only the post's author can edit it.

Continuing with the example of a blog application, let's add some authentication specifications to our **'post'** routes.

#### Requiring authentication for all routes

In the case that you want _all_ routes for a given model to be accessible only to an authenticated user, simply add `authentication: authmakerVerifyExpress.mongo()` to your route file as shown below. This will automatically handle the verification of all request types and appropriately reject non-authenticated requests.

```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const { models } = require('../../../models');
const authmakerVerifyExpress = require('authmaker-verify-express');

module.exports.autoroute = autorouteJson({
  model: models.post,
  resource: 'post',

  // access to ALL 'post' routes is only granted to an authenticated user
  authentication: authmakerVerifyExpress.mongo(),

  // default CRUD
  find: {},
  create: {},
  update: {},
  delete: {},
});
```

#### Authentication for individual routes

In the case of a blog, we do want to allow guests to _view_ posts. In this situation, authentication requirements are individually specified within each route type definition. In the below example, authentication is only required for creating, updating, and deleting posts.

```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const authmakerVerifyExpress = require('authmaker-verify-express');
const { models } = require('../../../models');

module.exports.autoroute = autorouteJson({
  model: models.post,
  resource: 'post',

  // no authentication needed to view posts
  find: {},  

  create: {
    // user must be authenticated to create a new post
    authentication: authmakerVerifyExpress.mongo(),
  },

  update: {
    // user must be authenticated to edit a post
    authentication: authmakerVerifyExpress.mongo(),
  },

  delete: {
    // user must be authenticated to delete a post
    authentication: authmakerVerifyExpress.mongo(),
    },
  },
});
```

#### Associating a User

After a user logs in to your application with Authmaker, all requests to the server are automatically sent with the appropriate authorization headers to identify the user. In addition to verifying authentication, this allows us to associate the user with any data they create.

In the example below, we add an **'author** property to our **'post'** model schema, in order to declare that the author of a post will be an existing user from our database.

```javascript
// models/post.js

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  body: String,
  created: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = schema;
module.exports.modelName = 'Post';
```

The post's author is defined as an ObjectId that points to a specific User object in our database. The ObjectId is a special value that MongoDB and Mongoose use to uniquely identify all data. When a user signs up for your application through Authmaker, they are stored in your database as a User model, each with their own ObjectId that can be referenced from other models.

Now that the schema for our post model is updated, the database is expecting a valid user's ObjectId for its 'author' property. [Middleware](http://expressjs.com/en/guide/using-middleware.html) is used by Express to inspect or modify server requests and responses. `express-autoroute-json` allows us to add our own custom middleware before or after it executes its internal middleware, using the hooks `preMiddleware()` or `postMiddleware()`.

In the example below, we attach the authenticated user's id to any new posts they create using the `preMiddleware()` hook that gives us access to the request object received by the server.

```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const authmakerVerifyExpress = require('authmaker-verify-express');
const { models } = require('../../../models');

module.exports.autoroute = autorouteJson({
  model: models.post,
  resource: 'post',

  find: {},  
  create: {
    // user must be authenticated to create a new post
    authentication: authmakerVerifyExpress.mongo(),

    // assign the current user as the new post's author
    preMiddleware(req, res, next) {
      req.body.data.attributes.author = req.user.id;
      next();
  },
  update: {
    authentication: authmakerVerifyExpress.mongo(),
  },
  delete: {
    authentication: authmakerVerifyExpress.mongo(),
    },
  },
});
```

Assigning the user's id to all posts they create allows us to not only search posts by author, but we can further protect our API by specifying authorization rules in the next step.
