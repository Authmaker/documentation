---
title: Create login route
---

Authmaker uses a dedicated login route to redirect users to a secure login and signup page for your app.

#### Add AuthmakerLoginRoute

Generate a route called **'login'** and add the `AuthmakerLoginRoute` mixin and our Authmaker configuration from `config/environment.js`.

```bash
$ ember g route login
```

```javascript {data-filename=app/routes/login.js}

import Ember from 'ember';
import AuthmakerLoginRoute from 'authmaker-ember-simple-auth/mixins/login-route';
import Config from 'my-blog/config/environment';

export default Ember.Route.extend(AuthmakerLoginRoute, {
    config: Config.authmaker,
});
```

This route is used solely by Authmaker to connect your application with Authmaker's login and signup tools. You will not need to add any template, controller, or route logic aside from the configuration shown above.

#### Add login/logout actions

Next, generate a controller for the application route:

```bash
$ ember g controller application
```

In this controller, add the actions **'login'** and **'logout'** as shown below:

```javascript {data-filename=app/controllers/application.js}

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

These actions are placed in the application controller so we can call them from our application template. In the example below, buttons for login/logout are placed in our header above the application outlet, so they will be visible and functional on all pages of our application.

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

Now upon starting your local application server, users will be able to signup and login to your application in order to view any content that requires an authenticated session.
