---
title: Create an Authmaker instance
---

Visit [app.authmaker.com](https://app.authmaker.com) and create an account. From your dashboard, create a new Authmaker instance for this project. Fill out the the required details:

#### Instance Name
Choose a name for this project instance. This will be included in the url used to login to your app via Authmaker.
(example: 'my-app-name' will become 'my-app-name.authmaker.com')

#### Application Domain & Name
While your app is still in development and not hosted online yet, these can be placeholders that will change later. (example: 'www.placeholder-app-domain.com' and 'My Placeholder App Name')

#### Database Credentials
These are your database details from mLab (created in the previous step). Remember that the username and password are for the database user you created for Authmaker, _not_ your personal mLab credentials.

- db: `my-database-name`
- port: `27017`
- user:  `my_authmaker_user`
- password: `my_authmaker_user_password`
- host: `ds123456.mlab.com`

After successfully creating your Authmaker instance, you will have access to two unique configuration objects, one for local development and one for live production. These are used to configure your Ember app to work with your Authmaker instance.
