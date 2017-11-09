---
title: Start with your Ember application
---
## Start with your Ember application
In this guide, we are building a blogging app with two basic models - **posts** and **authors**. Our models are defined in our Ember app as follows:
```javascript
// app/models/post.js

import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    author: DS.belongsTo('user'),
});
```
```javascript
// app/models/user.js

import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    posts: DS.hasMany('post'),
});
```
This guide assumes a basic understanding of building with Ember. Our blogging app contains routes for viewing and creating posts and uses Ember Data to handle our requests. To view the detailed steps for creating our frontend app with Ember, click here.
