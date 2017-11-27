---
title: Define the schema
---

Similar to defining models with Ember, we need to define the schema for the model objects in our database. [Mongoose](http://mongoosejs.com/index.html) is a Javascript library that allows us to model data for MongoDB. In the models folder, create `post.js` and define the schema for the post model:

```javascript
// models/post.js

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = schema;
module.exports.modelName = 'Post';
```

We define the post's author as an ObjectId that will reference a specific User object in our database. We will add users later, but for now let's continue by creating the routes for our post model.
