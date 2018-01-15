---
title: Update application adapter
---

The application adapter for your Ember app should already exist after previously implementing login.

#### Specify your API's host and namespace

Open the same file, `app/adapters/application.js`, and specify the host and namespace that Ember Data should use when making requests to your API.

```javascript {data-filename=app/adapters/application.js}

import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:application',

    host: 'http://localhost:3000',
    namespace: 'v1',
});
```

Since we are in development and running our server locally, the host is `http://localhost:3000`.

The namespace is defined as `'v1'` because the routes are auto-generated using the file structure in our backend app. In the previous example we created the route file `server/routes/v1/post.js`, whose parent folder will be included in the url to which we make all requests. Keep in mind that if you change the directory structure within the routes folder (for example, creating a 'v2' folder for API versioning), the namespace will need to change also.

By specifying the host and namespace as we did above, Ember Data will send GET requests for all posts to `http://localhost:3000/v1/posts`, exactly as our backend server expects.
