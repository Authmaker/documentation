---
title: Accessing Authmaker models
---

TODO: Sort out this page...

#### Add a route for Users

Since our post model has an 'author' attribute that is linked to our Users, Ember Data will automatically make a request to a dedicated users route if we include the author's information when displaying a post. Authmaker gives access to it's User model through `authmakerVerifyExpress`. Create a new routes file called `server/routes/v1/user.js` for the existing User model as shown below:

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
