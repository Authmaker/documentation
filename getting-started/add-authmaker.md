---
title: Add Authmaker authentication
---

Switch to your Ember application's directory. From here we will work on adding Authmaker authentication to our frontend application.

#### Install addons

Authmaker works with [ember-simple-auth](https://ember-simple-auth.com/) to allow easy implementation of authentication and authorization in your app. From your Ember application directory, install ember-simple-auth and then authmaker-simple-auth:

```bash
$ ember install ember-simple-auth
$ ember install authmaker-ember-simple-auth
```

#### Add Authmaker config

Open `config/environment.js` and include the configuration details provided by Authmaker when you created your instance. These will be unique to your project. (Make sure to use the  _local_ configuration for now.)

```javascript
// config/environment.js

...

 if (environment === 'development') {
      ENV.authmaker = {
      domainUrl: "https://your-app-name.authmaker.com",
      redirectUri: "http://localhost:4200/login",
      clientId: "yourClientId"
      };
  }

...
```

#### Add ApplicationRouteMixin

Generate an application route:

```bash
$ ember g route application
```

Include the `ApplicationRouteMixin` that ember-simple-auth provides, as shown below:

```javascript
// app/routes/application.js

import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
});
```

#### Add AuthmakerLoginRoute

Generate a route called **'login'** and add the `AuthmakerLoginRoute` mixin and our Authmaker configuration from `config/environment.js`.

```bash
$ ember g route login
```

```javascript
// app/routes/login.js

import Ember from 'ember';
import AuthmakerLoginRoute from 'authmaker-ember-simple-auth/mixins/login-route';
import Config from 'my-blog/config/environment';

export default Ember.Route.extend(AuthmakerLoginRoute, {
    config: Config.authmaker,
});
```

TODO: EXPLAIN MORE about how this 'login' route functions as a tool for Authmaker....

#### Add login/logout actions

Generate a controller for the application route:

```bash
$ ember g controller application
```

In this controller, add the actions **'login'** and **'logout'** as shown below:

```javascript
// app/controllers/application.js

import Ember from 'ember';
import Config from 'my-blog/config/environment';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),

  actions: {
      login() {
        return this.get('session').authenticate('authenticator:authmaker', Config.authmaker);
      },
      logout() {
        return this.get('session').invalidate();
      }
    }
});
```

These actions are placed in the application controller so we can call them from our application template. In the example below, we place buttons for login/logout in our header above the application outlet, so they will be visible and functional on all pages of our application.

```javascript
// app/templates/application.hbs

<header>
  {{#if session.isAuthenticated}}
    <button {{action 'logout'}}>Logout</button>
  {{else}}
    <button {{action 'login'}}>Login</button>
  {{/if}}
</header>

<main>
  {{outlet}}
</main>
```

#### Add DataAdapterMixin

In order to automatically include authorization headers on all outgoing requests to the server, we need to include the DataAdapterMixin provided by ember-simple-auth in our application adapter. Add the following to `app/adapters/application.js`:

```javascript
// app/adapters/application.js

import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    host: 'http://localhost:3000',
    namespace: 'v1',

    authorizer: 'authorizer:application',
});
```

Now that our Ember application is set up to work with Authmaker, we need to add authentication and authorization to our backend routes.
