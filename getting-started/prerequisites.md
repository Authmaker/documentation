---
title: Prerequisites
---

#### Ember.js

Authmaker is built to work with [Ember.js](https://emberjs.com) applications. These guides will show you how to take an existing Ember application and use Authmaker to easily implement authentication and build your backend server and database. Authmaker is meant to be beginner friendly, but assumes a working knowledge of building with Ember and Javascript. The Ember [guides](https://guides.emberjs.com) are a fantastic resource for all Ember-related questions.

#### Node.js and npm

[Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) are dependencies of Ember, so most likely they are already installed on your computer. To check, run `node --version` from your terminal. If not, make sure to download the most recent LTS version of Node.js, which will also include npm.

#### Yeoman

[Yeoman](http://yeoman.io/) is a tool for easily generating project scaffolding. To check if you have Yeoman already installed, run `yo --version`, otherwise install it globally via npm:
```bash
$ npm install -g yo
```
#### Authmaker Express Generator

Authmaker uses a dedicated Yeoman generator to create your server application structure.
```bash
$ npm install -g @authmaker/generator-express
```

#### PM2

[PM2](http://pm2.keymetrics.io/) is a process manager for Node.js applications. We will use it as we develop our server.
 ```bash
 $ npm install -g pm2
 ```

#### mLab

[mLab](https://mlab.com/) provides free online sandbox MongoDB databases for development and prototyping. You will need to create a free mLab account in order to create a development database later in this guide.
