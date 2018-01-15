---
title: Configure your app
---

After successfully creating your Authmaker instance, configure your existing Ember application to work with Authmaker.

#### Install addons

Authmaker works with [ember-simple-auth](https://ember-simple-auth.com/) to allow easy implementation of authentication and authorization in your app. From your Ember application directory, install ember-simple-auth and then authmaker-simple-auth:

```bash
$ ember install ember-simple-auth
$ ember install authmaker-ember-simple-auth
```

#### Add Authmaker config

Open `config/environment.js` and include the configuration details provided by Authmaker when you created your instance. These will be unique to your project. (Make sure to use the  _local_ configuration while in development.)

```javascript {data-filename=config/environment.js}

...

 if (environment === 'development') {
      ENV.authmaker = {
      domainUrl: "https://my-app-name.authmaker.com",
      redirectUri: "http://localhost:4200/login",
      clientId: "yourClientId"
      };
  }

...
```

#### Add ApplicationRouteMixin

Generate an application route if you do not already have one:

```bash
$ ember g route application
```

Include the `ApplicationRouteMixin` that ember-simple-auth provides, as shown below:

```javascript {data-filename=app/routes/application.js}

import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
});
```

#### Add DataAdapterMixin

Next, generate an application adapter if you do not already have one:

```bash
$ ember g adapter application
```

In order to automatically include authorization headers on all outgoing requests to the server, we need to include the `DataAdapterMixin` provided by ember-simple-auth in our application adapter. Add the following to `app/adapters/application.js`:

```javascript {data-filename=app/adapters/application.js}

import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:application',
});
```
