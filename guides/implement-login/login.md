Now that we have our application created and the Authmaker addon installed we can create a login button

## Add login/logout actions

Next, generate a controller for the application route:

```bash
$ ember g controller application
```

In this controller, add the actions **'login'** and **'logout'** as shown below:

```javascript {data-filename=app/controllers/application.js}
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    login() {
      return this.get('session').authenticate('authenticator:authmaker');
    },
    logout() {
      return this.get('session').invalidate();
    }
  }
});

```

These actions are placed in the application controller so we can call them from our application template. In the example below, buttons for login/logout are placed in our header above the application outlet, so they will be visible and functional on all pages of our application.

```javascript {data-filename=app/templates/application.hbs}
<header>
  {{#if session.isAuthenticated}}
    <button {{action "logout"}}>Logout</button>
  {{else}}
    <button {{action "login"}}>Login</button>
  {{/if}}
</header>

<main>
  {{outlet}}
</main>
```

Now upon starting your local application server, users will be able to signup and login to your application in order to view any content that requires an authenticated session.
