---
title: Create your database
---

Get started by creating a database. If you have not already created a free [mLab](https://mlab.com/) account, sign up now. Once signed up, create a new database for this project using their free Sandbox plan. When prompted to choose your cloud provider, select Google Cloud Platform. (This will make deployment using Google App Engine seamless later.)

After creating the database, click to view it's details. You will notice instructions at the top of the page for connecting. They will look something like this:

```bash
To connect using the mongo shell:
  % mongo ds123456.mlab.com:27017/my-blog -u <dbuser> -p <dbpassword>
```

You won't need to connect using the mongo shell, but you will need to take note of some information we will need in the next step. Using the example shown above, our database details are as follows:

- host: `ds123456.mlab.com`
- port: `27017`
- database name: `my-blog`

Next, under the 'Users' tab, create a new user for your database with a password. You will use these credentials to allow Authmaker access to your database, so remember them for later. 