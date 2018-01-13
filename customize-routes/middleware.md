---
title: Custom Middleware
---

Authmaker uses internal middleware to configure your application's routes as they have been defined. [Middleware](http://expressjs.com/en/guide/using-middleware.html) are functions used by Express to run code and inspect or modify server requests and responses. Think of your routes as a stack of middleware functions that execute sequentially (e.g. first perform authentication, then perform authorization, then...etc etc).

When your routes are generated, Authmaker handles your middleware configuration for you. However, `express-autoroute-json` allows us to add our own custom middleware before or after it executes its internal middleware, using the hooks `preMiddleware()` or `postMiddleware()`.

#### preMiddleware()

When included inside your route definitions, the `preMiddleware()` function will run before any work is done with Mongo (your database) but **after** authentication and authorization. The intention of pre-middleware is so that you might alter the request's body before it is passed into the rest of the system, e.g. to translate a parameter or attach additional data attributes.

```javascript
preMiddleware(req, res, next) {
   // do your magic here
   // always call next() to continue execution of middleware
   next();
}
```

A good example of using `preMiddleware()` is a scenario in which you want to add information about the current user to the request body. In the example below, `preMiddleware()` is used to attach two additional attributes to a new `post` before it is created in the database - **'author'** and **'created_at'**.

```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const authmakerVerifyExpress = require('authmaker-verify-express');
const { models } = require('../../../models');

module.exports.autoroute = autorouteJson({
  model: models.post,
  resource: 'post',
  authentication: authmakerVerifyExpress.mongo(),

  find: {},  
  create: {
    // before creating a new post in the database...
    preMiddleware(req, res, next) {
      // assign the current user as the post's author
      req.body.data.attributes.author = req.user.id;

      // add at 'created_at' attribute with the current timestamp
      req.body.data.attributes.created_at = new Date();

      // always call next() to continue execution of middleware
      next();
  },
  update: {},
  delete: {},
  },
});
```

#### postMiddleware()

Post-middleware happens _after_ all work is done, so the action **has already been committed to your database** and the response has been sent. For this reason, the 'find' action _does not_ have a postMiddleware() hook, because it does not make sense to do anything after a 'find' response has already been sent to the user. The hook is only available to use for 'create', 'update', and 'delete' routes.

`postMiddleware()` is **only** run on a successful http request and will be skipped over in the event of an error. Note that it will run after the response has already been sent, so be careful not to send headers again.

```javascript
postMiddleware(req, res, next) {
   // do your magic here
   // always call next() to continue execution of middleware
   next();
}
```

TODO: Include example use case for postMiddleware
