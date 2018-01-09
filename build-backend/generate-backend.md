---
title: Generate your backend app
---

TODO: Introduction paragraph bridging basic login with generating backend...

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

The generator will also create two example files for reference, `models/example.js` (a model) and `server/routes/v1/example.js` (a route). You can use these for reference and eventually delete them.
