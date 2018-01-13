---
title: Route authorization
---

Even if a user is authenticated, there will likely be content in your app that you do not want them to access, such as data belonging to another user. To further protect your API, you can also add authorization requirements to your routes.

#### Requiring authorization for all routes

We can choose to require authorization for _all_ routes for a given model, in the same way as authentication. Inside the `authorisation(req)` hook, use the request object to determine how you limit access to the data.

```javascript
  authorisation(req) {
    // return only the data you wish to grant access to here
    // for example, using the req.user.id to query specific data
  }
```

The example below demonstrates how you would authorize a user to only view and edit their _own_ profile object.  

```javascript {data-filename=server/routes/v1/profile.js}

const autorouteJson = require('express-autoroute-json');
const { models } = require('../../../models');
const authmakerVerifyExpress = require('authmaker-verify-express');

module.exports.autoroute = autorouteJson({
  model: models.profile,
  resource: 'profile',

  // access to all 'profile' routes is only granted to an authenticated user
  authentication: authmakerVerifyExpress.mongo(),


  // only authorize access to the profile object belonging to the user
  // by returning the profile with a user property that matches the req.user.id
  authorisation(req) {
    return {
          user: req.user.id,
        };
  }

  find: {},
  create: {},
  update: {},
  delete: {},
});
```

#### Adding authorization to individual routes

To demonstrate adding authorization to selected individual routes, let's continue working with the **'post'** routes from the previous example.

An authenticated user should only be authorized to edit or delete their _own_ posts, no one else's. We include those specifications for authorization on the 'update' and 'delete' routes below, by only exposing posts with an 'author' property that matches the user's id.

```javascript {data-filename=server/routes/v1/post.js}

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

Reviewing the example above, we now have a single file that defines the behavior for all 'post' routes of our server. When you start your application using `npm start`, the routes will be automatically generated for you with all authentication, authorization, and custom middleware logic included.
