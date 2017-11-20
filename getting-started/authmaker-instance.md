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
These are the database details provided by mLab (the same ones we used to generate our backend server).

- **Database Name & Port:**
Here we will use the information provided by mLab (when we created our database). In this example our database name is `my-blog` and the port is `27017`.

- **User & Password:**
Input the user and password we created for our database in the previous step. (Note: These are not your personal mLab account credentials.)

- **Database Hosts:**
Again we will use the mLab information from the previous step. Our database is hosted at `ds123456.mlab.com`.

After successfully creating your Authmaker instance, you will have access to two unique configuration objects, one for development and one for production. We will use these to configure our Ember app to work with Authmaker.
