---
title: Configure your routes
---

#### Add authorization details to routes

Before we start the server and see our application in action, we need to define which routes require authorization and authentication. Here is the behavior we want from our app:

- Anyone can view posts. (No authentication or authorization required.)
- Only registered users who are logged-in can create, update, and delete posts. (Authentication required.)
- Only the author of the post can update or delete a post. (Authorization required.)

Adding authentication to a route is easy, simply include `authentication: authmakerVerifyExpress.mongo()` in your route and Authmaker handles the rest. Since we want only authenticated users to be able to create, update, or delete posts, we will include this authentication on all of those routes below.

Similarly, TODO: EXPLAIN MORE HERE ABOUT WHAT THE AUTHORIZATION IS DOING EXACTLY.

```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const authmakerVerifyExpress = require('authmaker-verify-express');
const models = require('../../../models').models;

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

#### Start your application

Now we are ready to go! To start your backend application, run `npm start` in your backend directory. PM2 will keep the server running for us. Then switch to your frontend Ember application directory and run `ember server` to start your Ember app.

#### Create a user and login!

Clicking on the login button will redirect you to an Authmaker page allowing you to sign up or login. You can create your first user....

