---
title: Create your routes
---

Authmaker's `express-autoroute-json` package will create your routes for you. It has already been installed automatically by the project generator, so you don't need to install it again. Using the `server/routes/v1/example.js` file as a guide, create a new file to define the routes for our `post` model:

```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const { models } = require('../../../models');

module.exports.autoroute = autorouteJson({
  model: models.post,
  resource: 'post', // this will be pluralised in the routes

  // default CRUD
  find: {},
  create: {},
  update: {},
  delete: {},
});
```

TODO: EXPLAIN PACKAGE AND WHAT IS HAPPENING IN MORE DETAIL HERE
