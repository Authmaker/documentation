---
title: Prerequisites
---

## Prerequisites

#### Yeoman

[Yeoman](http://yeoman.io/) is a tool for easily generating project scaffolding. To check if you have Yeoman already installed, run `yo --version`, otherwise install it globally via npm:
```bash
$ npm install -g yo
```
#### Stonecircle Express Generator
Authmaker uses a dedicated Yeoman generator to create your server application structure.
```bash
$ npm install -g @stonecircle/generator-express
```

#### PM2
[PM2](http://pm2.keymetrics.io/) is a process manager for Node.js applications. We will use it as we develop our server.
 ```bash
 $ npm install -g pm2
 ```

#### mLab
[mLab](https://mlab.com/) provides free online sandbox MongoDB databases for development and prototyping. You will need to create a free mLab account in order to create a development database later in this guide.
