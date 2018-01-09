---
title: Route authentication
---

Chances are, you do not want your API to be fully accessible to anyone. If we were building a blog, we don't want to allow guests to create or edit the posts that they can read. Additionally, we want to make sure we assign an authenticated user to each created post, so that only the post's author can edit it.

Continuing with the example of a blog application, let's add some authentication and authorization specifications to our **'post'** route.

#### Referencing a User

TODO: Explain referencing a user and update this section

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

In the above example, the post's author is defined as an ObjectId that points to a specific User object in our database. The ObjectId is a special value that MongoDB and Mongoose use to uniquely identify all data. When a user signs up for your application through Authmaker, they are stored in your database as a User model, each with their own ObjectId that can be referenced from other models.

#### Add authorization details to routes

TODO: update this section

We need to explicitly define which routes require authorization and authentication. Here is the behavior we want from our app:

- Anyone can view posts. (No authentication or authorization required.)
- Only registered users who are logged-in can create, update, and delete posts. (Authentication required.)
- Only the author of the post can update or delete a post. (Authorization required.)

Adding authentication to a route is easy, simply include `authentication: authmakerVerifyExpress.mongo()` in your route and Authmaker handles the rest. Since we want only authenticated users to be able to create, update, or delete posts, we will include this authentication on all of those routes below.

Similarly, we need to include authorization rules for certain routes. An authenticated user should only be permitted to edit or delete their own posts, no one else's. We include specifications for authorization on the 'update' and 'delete' routes below. TODO: Explain in one or two sentences what is happening with the authorization hook.

```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const authmakerVerifyExpress = require('authmaker-verify-express');
const { models } = require('../../../models');

module.exports.autoroute = autorouteJson({
  model: models.post,
  resource: 'post',

  // no authentication/authorization needed to view all posts
  find: {},  

  create: {
    // assign the current user as the new post's author
    preMiddleware(req, res, next) {
      req.body.data.attributes.author = req.user.id;
      next();
    },

    // user must be authenticated to create a new post
    authentication: authmakerVerifyExpress.mongo(),
  },

  update: {
    // user must be authenticated to edit a post
    authentication: authmakerVerifyExpress.mongo(),

    // user is only authorized to edit their own posts
    authorisation(req) {
      return {
        author: req.user.id,
      };
    },
  },

  delete: {
    // user must be authenticated to delete a post
    authentication: authmakerVerifyExpress.mongo(),

    // user is only authorized to delete their own posts
    authorisation(req) {
      return {
        author: req.user.id,
      };
    },
  },
});
```

You will notice above in the 'create' route, we assign the current user as the author of the newly created post. After a user logs in, each request to the server will be sent with the user's token that allows the server to authenticate them. Authmaker's express-autoroute-json package provides a `preMiddleware()` hook that allows us to access the request and response objects. We use this hook to attach a new author property onto the request with the value of the current user id. For more detailed info on using middleware, see the Express [documentation](http://expressjs.com/en/guide/using-middleware.html). TODO: review this statement - is there a better way to say this? Is this correct?
