---
title: Accessing Authmaker models
---

Authmaker uses its own internal models to manage authentication for you. You can access their schema using the `authmakerVerifyExpress` package, which exposes all internal models.

A common use case for accessing internal models is a **Users** route.

#### Adding a route for Users

TODO: Review and revise this...

Let's say our Ember application is a blog with posts and users. We create a [relationship](https://guides.emberjs.com/current/models/relationships/) between the two models (a post's author is a user) with Ember Data's `belongsTo()` method.

Since our post model has an 'author' attribute that is linked to a User, Ember Data will automatically make a request to a dedicated users route if we use `post.author` in our template. Create a new routes file called `server/routes/v1/user.js` for the existing User model as shown below:

```javascript
// server/routes/v1/user.js

const autorouteJson = require('express-autoroute-json');
const authmakerVerifyExpress = require('authmaker-verify-express');

module.exports.autoroute = autorouteJson({
  model: authmakerVerifyExpress.models.user,
  resource: 'user',

  attributes: ['email', 'username'], // only use these two attributes when sending response

  find: {},
  // only allow for viewing of user data, no other routes included besides 'find'
});
```

The attributes property allows us to specify which attributes of the User object the server will respond with. We only want to expose the user's 'email' and 'username' properties when sending a response. We are not including routes for create, update, or delete. Authmaker handles those actions separately, like login.
