---
title: Generate your backend app
---

So you've created your Authmaker instance and successfully implemented login for your Ember app - now what? You need to access your data. You need a backend server. And you need an API built for your app's unique needs. With Authmaker, fullstack development using Ember and Node is straightforward, productive, and beginner-friendly.

#### Generate app structure with Yeoman

From the terminal, create a new directory for your backend application and change into it.

```bash
$ mkdir my-app-backend
$ cd my-app-backend
```

Generate the project's structure using the **Authmaker Express Generator** for Yeoman with the command below. (Both Yeoman and the Authmaker Express Generator should already be installed. See the [Prerequisites](#) for installation instructions.)

```bash
$ yo @authmaker/express
```

The generator will prompt you for the database details mentioned in the previous steps. (Remember that the username and password are for the database user you created, _not_ your personal mLab credentials.) This information will be added to a non-tracked file `settings/secure.json`.

The following [Express](https://expressjs.com/) application structure will be generated for you:

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

The generator will also create two example files for reference, `models/example.js` (a model) and `server/routes/v1/example.js` (a route). You can use these for reference and eventually delete them.

#### Running the server locally

To start your backend application's server, simply run:

```bash
$ npm start
```

Your defined routes will automatically generate and the server will start on `http://localhost:3000`. Make sure that you have installed [PM2](http://pm2.keymetrics.io/), as the above command will initialize the project manager for you to more easily monitor your server's status.
