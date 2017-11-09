## Create your routes

Authmaker's `express-autoroute-json` package will create your routes for you.....EXPLAIN PACKAGE MORE HERE.
```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const models = require('../../../models').models;

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
EXPLAIN MORE HERE about this default behaviour and how now we can perform CRUD actions for posts. And that we have not yet added authentication or authorisation, which is in the next steps.
