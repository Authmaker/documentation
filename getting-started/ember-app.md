---
title: Start with your Ember app
---

Authmaker was created to work with Ember applications. Our starting point for this guide is a simple blogging app with two basic models - `posts` and `users`. The models are defined in our Ember app as follows:

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

This guide assumes a basic understanding of building with Ember. Our blogging app contains routes for viewing and creating blog posts and uses Ember Data to handle our requests. The full code for the demo Ember app created for this guide can be viewed [here](https://github.com/Authmaker/authmaker-blog) for further reference.