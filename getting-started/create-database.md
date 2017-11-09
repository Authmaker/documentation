## Create a database sandbox online
If you have not already created a free [mLab](https://mlab.com/) account, sign up now. Once signed up, create a new database for this project using their free Sandbox plan. TODO: Do we explicitly say to use Google Cloud Platform when mLab asks for cloud provider?  

After creating the database, click to view it's details. Under the 'Users' tab, create a new user for your database with a password. You will use these credentials to allow Authmaker access to your database.

While viewing your newly created database details, you will notice instructions at the top of the page for connecting. They will look something like this:
```
To connect using the mongo shell:
  % mongo ds123456.mlab.com:27017/my-blog -u <dbuser> -p <dbpassword>
```
You won't need to connect using the mongo shell, but you will need to take note of some information we will need later. Our database name is 'my-blog', the port is 27017, and the host is 'ds123456.mlab.com'.
