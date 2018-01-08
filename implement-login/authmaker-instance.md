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
These are your database details from mLab (created in the previous step). Remember that the username and password are for the database user you created, _not_ your personal mLab credentials.

- database name: `my-blog`
- port: `27017`
- user:  `my_db_user`
- password: `my_db_user_password`
- host: `ds123456.mlab.com`

After successfully creating your Authmaker instance, you will have access to two unique configuration objects, one for development and one for production. We will use these to configure our Ember app to work with Authmaker.
