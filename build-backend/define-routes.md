---
title: Define your routes
---

Authmaker's generator creates a fully functioning application structure for your backend server. To build your API, simply define your schema and routes. Authmaker's package `express-autoroute-json` does the heavy lifting and generates your routes for you.

#### Define your schema

Similar to defining models with Ember, we need to define the schema for the models in our database. [Mongoose](http://mongoosejs.com/index.html) is a Javascript library that allows us to model data for MongoDB. Since the application structure has already been generated, creating a new model is as easy as making a new file.

Let's say we are working on a blog and need to perform CRUD actions on posts. In the models folder, create `post.js` and define the schema for the **post** model as shown below. You can use the generated file `models/example.js` for formatting reference.

```javascript
// models/post.js

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  body: String,
  created: Date,
});

module.exports = schema;
module.exports.modelName = 'Post';
```

#### Create your routes

Authmaker's `express-autoroute-json` package will create your routes for you. It has already been installed by the project generator, so you don't need to install it again. Using the `server/routes/v1/example.js` file as a guide, create a new file to define the routes for the `post` model we created in the previous step:

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

The above example is the most basic implementation of route creation with `express-autoroute-json`. Upon starting your backend application, it will automatically generate dedicated routes for all CRUD actions on posts. Making a GET request to `/posts` or `/posts/1` will now return the appropriate data from your database.

Additionally, you can limit your route definitions to certain request types. To completely forbid a particular request type, such as DELETE, simply omit the key for `delete: {}` from your route file.
