---
title: The 'me' route
---

A common API pattern for any application with users is often referred to as **the 'me' route**.

#### Requesting the current user

Let's say you want to display information about your app's current user, like their name or email address. Typically, your frontend application would make a GET request to `/users/:id` with the id of the requested user. But in this case, your app _doesn't know_ the id of the current user.

A solution for this common scenario is to have a designated route for requesting the current user, the 'me' route. All requests to `/users/me` are interpreted by the server as requests for the _current_ user. The server then uses the authorization token included with the request to identify the current logged-in user and their id.

With Authmaker, implementing a 'me' route is simple using the `translateId` hook in your route file.

#### translateId

Authmaker's `express-autoroute-json` package provides a `translateId` hook that allows you to access the id on all requests for individual records. Using this hook, we can inspect and alter the request object.

TODO: Continue with this page...currently WIP

```javascript
// server/routes/v1/user.js

const autorouteJson = require('express-autoroute-json');
const authmakerVerifyExpress = require('authmaker-verify-express');

module.exports.autoroute = autorouteJson({
  model: authmakerVerifyExpress.models.user,
  resource: 'user',
  authentication: authmakerVerifyExpress.mongo(),
  attributes: ['email', 'displayName'],

  translateId(id, req) {
    if (id === 'me') {
      return req.user.id;
    }
    return id;
  },

  find: {
    authorisation(req) {
      return {
        userId: req.user.id,
      };
    },
  },

});
```
