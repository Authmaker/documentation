---
title: Custom Middleware
---

TODO: Figure out how to better introduce this....with different example...and go through and edit the chaos

[Middleware](http://expressjs.com/en/guide/using-middleware.html) is used by Express to inspect or modify server requests and responses. `express-autoroute-json` allows us to add our own custom middleware before or after it executes its internal middleware, using the hooks `preMiddleware()` or `postMiddleware()`.

#### preMiddleware

Pre-middleware happens before any work has been done with mongo but **after** authentication and authorization. The intention of pre-middleware is so that you might alter the request's body before it is passed into the rest of the system e.g. to translate a parameter or add extra data that the frontend didn't know about like the logged in user's email.

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

#### postMiddleware

Post-middleware happens **after all work is done** so the action has been committed to the database. For this reason the find action **does not have a postMiddleware** because it does not make sense to do anything after a find has already been sent to the user.

Post-middleware is also only run **on a successful http request** and will be skipped over in the event of an error.

```javascript
// server/routes/v1/
module.exports.autoroute = autorouteJson({
  model: Project,
  create: {
    postMiddleware(req, res, next) {
       // do your magic here
    }
  },
  find: {},
});
```
**Note:** the response has already been sent to the user so be careful not to send headers again.
