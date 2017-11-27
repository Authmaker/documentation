---
title: Create an Authmaker instance
---

Visit [app.authmaker.com](https://app.authmaker.com) and create an account. From your dashboard, create a new Authmaker instance for this project. Fill out the the required details:

#### Name
Choose a name for this project instance.
(example: 'myblog')

#### Application Domain
Since our app is still in development and not hosted online yet, this can be a placeholder domain that will change later. (example: 'www.placeholder-blog-domain.com')

#### Authmaker Options
TODO: EXPLAIN here about the other social logins and their steps??

#### Database Credentials
These are your database details from mLab (the same ones we used to generate our backend server). If you used the Yeoman generator, you can refer to `settings/secure.json` which will contain the database information you previously provided.

```javascript
// settings/secure.json

{
  "database": {
    "mongo": {
      "db": "my-blog",
      "host": "ds12345.mlab.com",
      "port": 27017,
      "user": "my_db_user",
      "password": "my_db_user_password"
    }
  },

 ...

}

```

After successfully creating your Authmaker instance, you will have access to two unique configuration objects, one for development and one for production. We will use these to configure our Ember app to work with Authmaker.
