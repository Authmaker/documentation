---
title: Update application adapter
---

Our Ember application adapter should already have been created when we implemented login with the previous steps.

Open the same file and specify the host and namespace that Ember Data should use when making requests for data.

Since we are in development and running our server locally, the host will be `http://localhost:3000`. We define `namespace: 'v1'` because our routes are auto-generated using the file structure in our backend app.

```javascript
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:application',

    host: 'http://localhost:3000',
    namespace: 'v1',
});
```
