---
title: Define your routes
---

Authmaker's generator creates a fully functioning application structure for your backend server. To build your API, simply define your **schema** (models of your data) and **routes**.

[Routes](http://expressjs.com/en/guide/routing.html) determine how your app will respond to requests sent to a particular endpoint. With the library `express-autoroute-json`, you define all routes for a given resource in a single, declarative file. Authmaker handles the heavy lifting and your routes are generated for you at runtime.

#### Define your schema

Similar to defining models with Ember, we need to define the schema for the models in our database. [Mongoose](http://mongoosejs.com/index.html) is a Javascript library that allows us to model data for MongoDB. Since the application structure has already been generated, creating a new model is as easy as making a new file.

Let's say we are working on a blog and need to perform CRUD actions on posts. In the models folder, create `post.js` and define the schema for the **post** model as shown below. You can use the generated file `models/example.js` for formatting reference.

```javascript {data-filename=models/post.js}

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  body: String,
  created: Date,
});

module.exports = schema;
module.exports.modelName = 'Post';
```

#### Create your routes

The package `express-autoroute-json` will create your routes for you. It has already been installed by the project generator, so you don't need to install it again. Traditionally, Express routes are individually defined using:

```javascript
app.get('/blah', blahHandlerFunction);
```

For complex applications with many resources, managing route definitions and handlers like this quickly becomes repetitive, convoluted, and cumbersome. `express-autoroute-json` lets you define all routes for a given resource in a single file, using the declarative action blocks `find`, `create`, `update`, and `delete`.

Simply including the block `find: {}` in your route file will generate fully functioning 'Find All' and 'Find By Id' endpoints for accessing your database - no configuration needed.

Using the `server/routes/v1/example.js` file as a guide, create a new file to define the routes for the `post` model we created in the previous step:

```javascript {data-filename=server/routes/v1/post.js}

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

The above example is the most basic implementation of route creation with `express-autoroute-json`. Upon starting your backend application, it will automatically generate dedicated routes for all CRUD actions on posts. Making a GET request to `/posts` or `/posts/1` will now return the appropriate data from your database.

Additionally, you can limit your route definitions to certain request types. `express-autoroute-json` will only generate the route types that you explicitly define. To completely forbid a particular request type, such as DELETE, simply omit the entire block `delete: {}` from your route file.
