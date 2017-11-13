---
title: Configure your backend
---

Switch back to the directory for our server, `blog-backend`, to implement the final steps.

#### Update your development.json file

Open the generated file `settings/development.json` and replace the contents with the code below, making sure to change the database details to your own (these are the same details you used to create your Authmaker instance):

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
