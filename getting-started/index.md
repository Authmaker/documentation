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
#### MongoDB
Authmaker uses MongoDB as a database. 

Install MongoDB. You can find instructions on how to do this [here](https://docs.mongodb.com/master/administration/install-community/).

#### PM2
[PM2](http://pm2.keymetrics.io/) is a process manager for Node.js applications. We will use it as we develop our server.
 ```bash
 $ npm install -g pm2
 ```
 
  
 

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

## Connect your frontend & backend locally
Return to your Ember application and create an application adapter. In this file we will specify the host and namespace that Ember Data should use when making requests for data. 
```javascript
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'v1',
});
```
We define `namespace: 'v1'` because our routes are auto-generated using the file structure in our backend app. EXPLAIN MORE HERE about allowing versioning of APIs maybe and how it automatically generates routes from file structure?

NOT SURE if we should explain now how to run mongo database locally, perhaps we just skip to creating an mLab sandbox (in which case do we need to require them to download mongodb??) because we end up doing that right aftewards anyways?

## Create a database sandbox online
mLab provides free development database sandboxes...
##  Create an Authmaker instance
Explain each input field here....
## Add Authmaker authentication to your Ember app
#### Install addons
Authmaker works with [ember-simple-auth](https://ember-simple-auth.com/) to allow easy implementation of authentication and authorization in your app. From your Ember application directory, install ember-simple-auth and then authmaker-simple-auth:
```bash
$ ember install ember-simple-auth
$ ember install authmaker-ember-simple-auth
```
#### Add Authmaker config
Open your config/environment.js file and include the configuration details provided by Authmaker when you created your instance.
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
#### Create login route and add AuthmakerLoginRoute mixin
#### Create application controller and add login/logout actions
#### more steps.....

## Deploy / Production 
