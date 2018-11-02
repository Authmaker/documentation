---
title: Create a database
---

Authmaker uses a database that you provide to store your app's user information. To get started, create a free Mongo development database sandbox with mLab.

If you have not already created a free [mLab](https://mlab.com/) account, sign up now. Once signed up, create a new database for your project using their free Sandbox plan. When prompted to choose your cloud provider, select Google Cloud Platform. (This will make deployment using Google App Engine seamless later.)

After creating the database, click to view it's details. You will notice instructions at the top of the page for connecting. They will look something like this:

```bash
To connect using the mongo shell:
  % mongo ds123456.mlab.com:27017/my-database-name -u <dbuser> -p <dbpassword>
```

You won't need to connect using the mongo shell, but you will need to take note of some information we will need in the next step. Using the example shown above, our database details are as follows:

- host: `ds123456.mlab.com`
- port: `27017`
- database name: `my-database-name`

#### Create a dedicated database user for Authmaker

Next, under the 'Users' tab, create a new user for your database with a password. You will use these credentials to allow Authmaker access to your database, so remember them for the next step. It can be helpful to choose a username that references Authmaker, for extra clarification:

- user: `my_authmaker_user`
- password: `my_authmaker_user_password`
