---
title: Deploying with Google Cloud
---

Deploying your Authmaker app is simple with [Google Cloud Platform](https://cloud.google.com/). With Google Cloud, hosting for small web applications is free (in most cases) - you won't have to pay until your application scales past their [free tier](https://cloud.google.com/free/).

If you don't have an existing Google Cloud account, you will need to create one before the next steps.

You will also need to have the [Google Cloud SDK](https://cloud.google.com/sdk/docs/) already installed, as we will be using the command line tools to easily deploy.

## Create a new Google Cloud project

From the Google Cloud console, create a new **project** for this application. Google Cloud Platform organizes your resources into projects - this makes it easy to manage permissions and settings for multiple deployments in one place. For example, _both_ our frontend application _and_ backend server deployments will belong to the same project.

## Deploy your backend app

First, let's get our backend deployed. From your backend app directory, simply run the command below using your project name:

```bash
$ gcloud app deploy --project=PROJECT_NAME
```
You will see a prompt asking you to select the region for your app. Since we are deploying to Google's large network of servers, we need to select the region in which Google will store our application. A good rule of thumb is to choose the region closest to where your app's users will be (in order to reduce latency).

Next, you will be asked to confirm your deployment details, including the project name and the **target url**, the location where your app will be deployed. It will look something like `https://[PROJECT_NAME].appspot.com`. This is your new production API host.

## Update your Ember adapter

Before you deploy your Ember app, update your application adapter with your newly deployed API host. A great way to implement this is to declare different host values for production _and_ development inside `config/environment.js` and import from your application adapter. This allows you to easily pivot between local development and production builds without continually reassigning your host value.

In your application adapter, make the following changes:

```javascript {data-filename=app/adapters/application.js}

import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
// import the environment config
import Config from 'my-blog/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:application',

    // assign host value depending on environment
    host: Config.apiHost,
    namespace: 'v1',
});
```
Then, attach the variable `apiHost` to your environment config, as shown below:

```javascript {data-filename=config/environment.js}

...

 if (environment === 'development') {
      ENV.apiHost = 'http://localhost:3000';
      ...
  },

 if (evironment === 'production') {
      ENV.apiHost = 'https://[PROJECT_NAME].appspot.com';
      ...
 }

...
```

This ensures that your _production_ build will send all API requests to your deployed backend app, but your local _development_ build will continue making requests to `http://localhost:3000`.

## Configure your DNS

You will need to own a domain name to use as the URL for your deployed frontend application. You can register a new domain with [Google Domains](https://domains.google.com) if you do not already have one, but any DNS provider you choose is fine.

If you are using a DNS provider other than Google, you will need to verify ownership of the domain through [Google Webmaster Central](https://www.google.com/webmasters/verification/). If you created your domain with Google, this step is automatic.

**NOTE:** This deployment method requires deployment to a **subdomain**, such as `www.mydomain.com` or `app.mydomain.com`, instead of the root domain, `mydomain.com`.

#### Create a CNAME record

Navigate to your DNS provider's control panel to access your domain settings. If you are using Google Domains, select the 'Configure DNS' option for your domain. From here, create a new `CNAME` record that will redirect your subdomain to the the Google Storage servers where your app will be hosted, `c.storage.googleapis.com.`.

It will look something like this:

<table>
  <tr>
    <th>NAME</th>
    <th>TYPE</th>
    <th>TTL</th>
    <th>DATA</th>
  </tr>
  <tr>
    <td>www.mydomain.com</td>
    <td>CNAME</td>
    <td>1h</td>
    <td>c.storage.googleapis.com.</td>
  </tr>
</table>

For more information on `CNAME` redirects to Google Cloud Platform, [see the documentation here.](https://cloud.google.com/storage/docs/request-endpoints#cname)

## Create your storage bucket

From the navigation menu, select 'Storage' to access your project's Cloud Storage tools. From there, create a new storage **bucket** with the same name as your `CNAME` record for your subdomain. To continue our previous example, we would create a storage bucket with the name `www.mydomain.com`.

Keep note of both your project name and bucket name, as we will use them to configure our Ember app for deployment in the next step.

## Deploy your Ember app

In your Ember application's directory, install the following packages for deployment:

```bash
$ ember install ember-cli-deploy
$ ember install ember-cli-deploy-gcloud-pack
```

This will generate the file `config/deploy.js` for your app. Open the file and add your **project name** as the value for `gcloudProjectId` and your **bucket name** as the value for `productionBucket`, as shown below:


```javascript {data-filename=config/deploy.js}
'use strict';

// add your project name and bucket name here
const gcloudProjectId = '** YOUR PROJECT ID **';
const productionBucket = '** YOUR BUCKET **';

module.exports = function(deployTarget) {
  ...
};
```
