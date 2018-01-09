---
title: Create your routes
---

Authmaker's `express-autoroute-json` package will create your routes for you. It has already been installed automatically by the project generator, so you don't need to install it again. Using the `server/routes/v1/example.js` file as a guide, create a new file to define the routes for the `post` model we created in the previous step:

```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const { models } = require('../../../models');

module.exports.autoroute = autorouteJson({
  model: models.post,
  resource: 'post', // this will be pluralized in the routes

  // default CRUD
  find: {},
  create: {},
  update: {},
  delete: {},
});
```

The above example is the most basic implementation of route creation with `express-autoroute-json`. Upon starting your backend server, the package will automatically generate dedicated routes for all CRUD actions on posts. Making a GET request to `/posts` or `/posts/1` will now return the appropriate data from your database.
