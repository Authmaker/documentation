---
title: Accessing Authmaker models
---

Authmaker uses its own internal models to manage authentication for you. You can access their schema using the `authmaker-verify-express` package, which exposes all internal models.

A common use case for accessing internal models is a **Users** route.

#### Adding a route for Users

Let's say you are working on an Ember app that allows users to create posts. Each `post` model has an author property that is associated with a `user` model.

If we define a [belongsTo()](https://guides.emberjs.com/current/models/relationships/) relationship between `post.author` and `user`, Ember Data will automatically make a GET request to a dedicated `/users` route if we include a reference like `{{post.author.username}}` in our template.

In a case like this, you need to create a route for an existing Authmaker internal model, whose schema has already been defined. Do not redefine the schema with a duplicate model file. Instead, access the internal model schema with `authmaker-verify-express` (this will already be pre-installed).

Below is an example of a `/users` route file, where the model is defined with `authmakerVerifyExpress.models.user`:

```javascript
// server/routes/v1/user.js

const autorouteJson = require('express-autoroute-json');
const authmakerVerifyExpress = require('authmaker-verify-express');

module.exports.autoroute = autorouteJson({
  // get the model from authmaker-verify-express
  model: authmakerVerifyExpress.models.user,
  resource: 'user',

  // only use these two attributes when sending response
  attributes: ['email', 'username'],

  // only allow for viewing of user data, do not create routes for any other request types
  find: {},
});
```

#### Filtering attributes and limiting request types

It is important to note that we **do not** want to expose the _entire_ user object. We can trim the server's response object by including an array of selected attributes to expose. In the example above, the server will respond to all requests with a `user` object that only has two attributes besides the id, **email** and **username**.

In almost _all_ cases, you do _not_ want to allow **create**, **update**, or **delete** request types on any route for Authmaker core models. Authmaker handles these actions for you separately and securely, like login. `express-autoroute-json` will only generate the route types that you explicitly define (**find**, **create**, **update**, **delete**). The above example route file only includes a definition for **find** routes, ensuring that the exposed data is read-only.
