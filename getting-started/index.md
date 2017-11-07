# Getting Started Guide

 This guide will walk you through using Authmaker to implement a backend for your Ember application.  For this example, we will create a server and add authentication to a simple blogging app.

## Prerequisites

#### Yeoman

[Yeoman](http://yeoman.io/) is a tool for easily generating project scaffolding. To check if you have Yeoman already installed, run `yo --version`, otherwise install it globally via npm:
```bash
$ npm install -g yo
```
#### Stonecircle Express Generator
Authmaker uses a dedicated Yeoman generator to create your server application structure.
```bash
$ npm install -g @stonecircle/generator-express
```

#### PM2
[PM2](http://pm2.keymetrics.io/) is a process manager for Node.js applications. We will use it as we develop our server.
 ```bash
 $ npm install -g pm2
 ```
 
#### mLab
[mLab](https://mlab.com/) provides free online sandbox MongoDB databases for development and prototyping. You will need to create a free mLab account in order to create a development database later in this guide.

## Start with your Ember application
In this guide, we are building a blogging app with two basic models - **posts** and **authors**. Our models are defined in our Ember app as follows:
```javascript
// app/models/post.js

import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    author: DS.belongsTo('user'),
});
```
```javascript
// app/models/user.js

import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    posts: DS.hasMany('post'),
});
```
This guide assumes a basic understanding of building with Ember. Our blogging app contains routes for viewing and creating posts and uses Ember Data to handle our requests. To view the detailed steps for creating our frontend app with Ember, click here.

## Creating your backend app
From the terminal, create a new directory for our backend application and change into it.
```bash
$ mkdir blog-backend
$ cd blog-backend
```
Generate the project's structure using the Stonecircle Express Generator for Yeoman with the command below:
```bash
$ yo @stonecircle/express
```
When prompted for the project name, make sure there are no spaces between words. For example, `blog-backend` instead of `blog backend`. This will be added as the project name in your package.json file.

The following application structure will be generated for you:
```text
|--init
|--models
|--server
   |--routes
      |--v1
|--settings

app.js
package.json
```
Install dependencies via npm:
```bash
$ npm install
```
The generator will create two example files for reference, an 'example' model in the models folder and an 'example' route in the server/routes folder. You can use these for reference and eventually delete them.

## Define the schema 

Similar to defining models with Ember, we need to define the schema for the model objects in our database. [Mongoose](http://mongoosejs.com/index.html) is a library that allows us to model data for MongoDB. In our models folder, create `post.js` and define the schema for the post model:

```javascript
// models/post.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new mongoose.Schema({
  title: String, 
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = schema;
module.exports.modelName = 'Post';
```
We define the post's author as an ObjectId that will reference a specific User object in our database. We will add users later, but for now let's continue by creating the routes for our post model.

## Create your routes

Authmaker's `express-autoroute-json` package will create your routes for you.....EXPLAIN PACKAGE MORE HERE.
```javascript
// server/routes/v1/post.js

const autorouteJson = require('express-autoroute-json');
const models = require('../../../models').models;

module.exports.autoroute = autorouteJson({
  model: models.post,
  resource: 'post', // this will be pluralised in the routes

  // default CRUD
  find: {},
  create: {},
  update: {},
  delete: {},
});
```
EXPLAIN MORE HERE about this default behaviour and how now we can perform CRUD actions for posts. And that we have not yet added authentication or authorisation, which is in the next steps.

## Add an Ember application adapter 
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
Since we are in development and running our server locally, the host will be `http://localhost:3000`. We define `namespace: 'v1'` because our routes are auto-generated using the file structure in our backend app. EXPLAIN MORE HERE about allowing versioning of APIs maybe and how it automatically generates routes from file structure?

## Create a database sandbox online
If you have not already created a free [mLab](https://mlab.com/) account, sign up now. Once signed up, create a new database for this project using their free Sandbox plan. TODO: Do we explicitly say to use Google Cloud Platform when mLab asks for cloud provider?  

After creating the database, click to view it's details. Under the 'Users' tab, create a new user for your database with a password. You will use these credentials to allow Authmaker access to your database. 

While viewing your newly created database details, you will notice instructions at the top of the page for connecting. They will look something like this:
```
To connect using the mongo shell:
  % mongo ds123456.mlab.com:27017/my-blog -u <dbuser> -p <dbpassword>
```
You won't need to connect using the mongo shell, but you will need to take note of some information we will need later. Our database name is 'my-blog', the port is 27017, and the host is 'ds123456.mlab.com'.

##  Create an Authmaker instance
Visit [app.authmaker.com](https://app.authmaker.com) and create an account. From your dashboard, create a new Authmaker instance for this project. Fill out the the required details:

##### Name
Choose a name for this project instance. 
(example: 'myblog')

##### Application Domain
Since our app is still in development and not hosted online yet, this can be a placeholder domain that can change later. (example: 'www.placeholder-blog-domain.com')

##### Authmaker Options
TODO: explain here about the other social logins? Facebook login requires a facebook developer account yes? I haven't actually gone through those steps yet.

##### Database Credentials
As mentioned in the previous step, we need to provide some information about our mLab sandbox. 

- **Database Name & Port:**
Here we will use the information provided by mLab (see previous step). In this example our database name is 'my-blog' and the port is 27017. 

- **User & Password:** 
Input the user and password we created for our database in the previous step. (Note: These are not your personal mLab account credentials.)

- **Database Hosts:** 
Again we will use the mLab information from the previous step. Our database is hosted at 'ds123456.mlab.com'. EXPLAIN more about adding multiple hosts?? 

After successfully creating your Authmaker instance, you will have access to two unique configuration objects, one for development and one for production. We will use these to configure our Ember app to work with Authmaker.

## Add Authmaker authentication to your Ember app

Switch to your Ember application's directory. From here we will work on adding Authmaker authentication to our frontend application.

#### Install addons

Authmaker works with [ember-simple-auth](https://ember-simple-auth.com/) to allow easy implementation of authentication and authorization in your app. From your Ember application directory, install ember-simple-auth and then authmaker-simple-auth:

```bash
$ ember install ember-simple-auth
$ ember install authmaker-ember-simple-auth
```

#### Add Authmaker config

Open your config/environment.js file and include the configuration details provided by Authmaker when you created your instance. (Make sure to use the  _local_ configuration for now.)

```javascript
// config/environment.js

...

 if (environment === 'development') {
      ENV.authmaker = { 
      domainUrl: "https://your-app-name.authmaker.com",
      redirectUri: "http://localhost:4200/login",
      clientId: "yourClientId" 
      };;
  }
  
...
```

#### Create application route and add ApplicationRouteMixin mixin

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
EXPLAIN MORE?

#### Create login route and add AuthmakerLoginRoute mixin

Generate a route called 'login' and add the `AuthmakerLoginRoute` mixin and our Authmaker configuration from `config/environment.js`.

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

EXPLAIN MORE about how this 'login' route functions as a tool for Authmaker....

#### Create application controller and add login/logout actions

Generate a controller for the application route:

```bash
$ ember g controller application
```

In this controller, add the actions 'login' and 'logout' as shown below:

```javascript
\\ app/controllers/application.js

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
\\ app/templates/application.hbs

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

#### Add DataAdapterMixin to application adapter

In order to automatically include authorization headers on all outgoing requests to the server, we need to include the DataAdapterMixin provided by ember-simple-auth in our application adapter. Add the following to your application adapter:

```javascript
\\ app/adapters/application.js

import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    host: 'http://localhost:3000',
    namespace: 'v1',

    authorizer: 'authorizer:application',
});
```

## Add authorization details to backend (rename this)

Switch back to the directory for our server, `blog-backend`, to implement the final steps. 

#### Add correct info to development.json

Open the generated file `settings/development.json` and replace the contents with the code below, making sure to change the database details to your own (these are the same details we used to create our Authmaker instance):

```json
{
    "database": {
      "mongo": {
        "db": "my-blog",
        "host": "ds123456.mlab.com",
        "port": 27017,
        "user": "the_user",
        "password": "the_password"
      }
    },

    "mongo":{
      "authmaker": {
        "db": "my-blog",
        "host": "ds123456.mlab.com",
        "port": 27017,
        "user": "the_user",
        "password": "the_password"
      }
    },

    "authmaker": {
      "mongo": {
        "db": "my-blog",
        "host": "ds123456.mlab.com",
        "port": 27017,
        "user": "the_user",
        "password": "the_password"
      }
    },

    "redis": {
        "port": 6379,
        "host": "127.0.0.1"
    },

    "server": {
        "useCors": true,
        "session_secret": "not_really_a_secure_secret"
    }
}
```
_Do not commit this file to source control_, since it contains sensitive user and password data. If you have been committing your changes until this point, you can use the command below to stop git from tracking the file:

```bash
$ git update-index --assume-unchanged settings/development.json
```

#### Initialize AuthmakerVerifyExpress

Open the previously generated file, `init/index.js` and add `AuthmakerVerifyExpress` as shown below (the two lines of code to add are marked with comments):

```javascript
\\ init/index.js

const mongoose = require('mongoose');
const mongooseConnect = require('mongoose-nconf-connect');
// STEP 1 OF 2: require AuthmakerVerifyExpress below
const authmakerVerifyExpress = require('authmaker-verify-express');
const Q = require('q');
const winston = require('winston');

const models = require('../models');

mongoose.Promise = Q.Promise;

let initialised = false;

module.exports = function initMongodb(nconf) {
  if (initialised) {
    return Q();
  }

  if (!nconf.get('database:mongo')) {
    throw new Error('NConf entry for database:mongo: requried to run this application');
  }

  return mongooseConnect.connectGlobalMongo(nconf, mongoose, {
    configPrefix: 'database:mongo:',
    logger: winston,
  })

  .then(() => models.init(mongoose))
  // STEP 2 OF 2: initialize it with the line below
  .then(() => authmakerVerifyExpress.connectMongo(nconf))
  .then(() => {
    initialised = true;
  })
  .then(null, (err) => {
    winston.error('Error During Initialisation', {
      error: err.message,
      stack: err.stack,
    });
  });
};
```

#### Add authorization details to routes
TODO: where is best place to include this?

#### Start up server and see application work
Create your first user for your development application.


## Deploy / Production 
