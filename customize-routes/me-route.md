---
title: The 'me' route
---

A common API pattern for any application with users is often referred to as **the 'me' route**.

#### Requesting the current user

Let's say you want to display information about your app's current user, like their name or email address. Typically, your frontend application would make a GET request to `/users/:id` with the id of the desired user. But in this case, your app _doesn't know_ the id of the current user.

A solution for this common scenario is to create a designated route for requesting the current user, the 'me' route. With this solution, all requests to `/users/me` are interpreted by the server as requests for the _current_ user. The server then uses the authorization token included with the request to identify the current logged-in user and their id.

With Authmaker, adding a 'me' route to your API is done using the `translateId()` hook.

#### Translating the ID

Authmaker's `express-autoroute-json` package provides a `translateId()` method that allows you to access the id on all requests for individual records. Using this hook, we can inspect the request object and alter the id _before_ it is used to query your database. This is helpful when the request id is not a Mongo ObjectID, like a request for `/users/me`.

```javascript
translateId(id, req) {
  // write your custom logic here
  // return an Object Id for query
  return id;
}
```

If `translateId()` is defined in your route file, the function will execute before _all_ findOne queries to your database. If your conditions for translating the id are not met (for example, a valid Object Id is passed in), your function still must return the id.

#### Adding a 'me' route

The example below demonstrates how to create a 'me' route for **users** with the `translateId()` hook.

When a request to the server is authenticated by Authmaker, the current user's Object Id is added to the request object, as `req.user.id`.

Inside the hook we have access to the both the request id _and_ the request object, which includes the current user's id. If the request id is **'me'**, we simply return the current user's id instead. Instead of querying the database for a user with an id of 'me', which is invalid, the server will query the database with our new id value, `req.user.id`. The response, if authorized, will include the _current_ user's `email` and `displayName` attributes.

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
    // if id equals 'me', return the current user's id
    if (id === 'me') {
      return req.user.id;
    }
    // if id is valid Object Id, return it
    return id;
  },

  find: {
    // authorization runs after translateId
    authorisation(req) {
      // users can only view their own information
      return {
        userId: req.user.id,
      };
    },
  },

});
```
