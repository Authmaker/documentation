---
title: Define the schema
---

Similar to defining models with Ember, we need to define the schema for the models in our database. [Mongoose](http://mongoosejs.com/index.html) is a Javascript library that allows us to model data for MongoDB. Since the application structure has already been generated, creating a new model is as easy as making a new file.

Let's say we are working on the backend server for a blog and need to perform CRUD actions on posts. In the models folder, create `post.js` and define the schema for the **post** model as shown below. You can use the generated file `models/example.js` for formatting reference.

```javascript
// models/post.js

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  body: String,
  created: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = schema;
module.exports.modelName = 'Post';
```

In the above example, the post's author is defined as an ObjectId that points to a specific User object in our database. The ObjectId is a special value that MongoDB and Mongoose use to uniquely identify all data. When a user signs up for your application through Authmaker, they are stored in your database as a User model, each with their own ObjectId that can be referenced from other models.
