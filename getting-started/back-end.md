---
title: Create your backend
---

From the terminal, create a new directory for our backend application and change into it.

```bash
$ mkdir blog-backend
$ cd blog-backend
```

Generate the project's structure using the Stonecircle Express Generator for Yeoman with the command below:

```bash
$ yo @stonecircle/express
```

When prompted for the project name, make sure there are no blank spaces between words. For example, `blog-backend` instead of `blog backend`. This will be added as the project name in your package.json file.

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

The generator will create two example files for reference, an 'example' model in the models folder and an 'example' route in the server/routes folder. You can use these for reference and eventually delete them.

