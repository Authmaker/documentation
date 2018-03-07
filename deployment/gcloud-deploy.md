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

### Create a CNAME record

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

Next, navigate to your Google Storage 'Browser' view to see all buckets. You should see your frontend application bucket listed, along with some others that have been auto-generated for your backend deployment. At the far right of each bucket listing, you will see a vertical menu that you can click to access **'Edit Website Configuration'**. Click and fill both your **'Main page'** and **'404 (not found) page'** options with `index.html`, since we are about to deploy a single-page app and want any 404 errors to be handled by our Ember app.

Your bucket is now ready for deploying our frontend from the command line.

## Configure your Ember deployment

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

This sets your deployment location for your Ember app.

### Update your Authmaker instance app domain

Make sure your Authmaker instance for this project has the correct url for your production application domain. If you used a placeholder domain when you created your instance, update the value to match your production domain - in the case of this example, the same subdomain we used when naming our Google bucket, `www.mydomain.com`.

After you've updated your application domain, save your changes and click to view your updated _live_ Ember config object. You should see your production domain reflected as part of the object's `redirectUri`. Copy the full object to use for your app.

Open `config/environment.js` and include your unique live config object inside the **production** block. _(Make sure you place it inside the **production** block. We are **not** changing the development block or local config object.)_

```javascript {data-filename=config/environment.js}

...

 if (environment === 'production') {
      // this object will be *UNIQUE* for your instance
      ENV.authmaker = {
      domainUrl: "https://my-app-name.authmaker.com",
      redirectUri: "https://www.mydomain.com/login",
      clientId: "yourClientId"
      };
  }

...
```

## Deploy your Ember app

To deploy your frontend application, run the following command from your frontend directory:

```bash
$ ember deploy production --activate
```

Your app will build and deploy to your Google storage bucket!

**NOTE:** If you run into any permissions errors from GCloud, you might need to first login via the command line by running:

```bash
$ gcloud auth application-default login
```

You will be prompted to login, after which you shouldn't get any permissions errors when you run the deploy command. For more on GCloud command line authentication, see [here](https://cloud.google.com/sdk/gcloud/reference/auth/application-default/login).

## Deployment Iterations

The Authmaker curriculum was designed to be used as part of an iterative development process, continually developing and deploying as your application expands and improves. In the steps above, you updated your app for deployment **_in addition to_** the existing development config. You can continue to develop your application locally without changing any configuration details in the code.

### Running locally

To start your backend application locally, run:

```bash
$ npm run start-local
```

To start your Ember frontend locally, run:

```bash
$ ember serve
```

### Future deployments

To deploy a new version of your backend app, run:

```bash
$ gcloud app deploy --project=PROJECT_NAME
```

To deploy a new version of your frontend Ember app, run:

```bash
$ ember deploy production --activate
```
