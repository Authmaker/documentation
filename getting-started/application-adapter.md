---
title: Add an application adapter
---

Return to your Ember application and create an application adapter.

```bash
$ ember g adapter application
```

In this file we will specify the host and namespace that Ember Data should use when making requests for data.

```javascript
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'v1',
});
```

Since we are in development and running our server locally, the host will be `http://localhost:3000`. We define `namespace: 'v1'` because our routes are auto-generated using the file structure in our backend app.
