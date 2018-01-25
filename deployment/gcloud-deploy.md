---
title: Deploying with Google Cloud
---

Deploying your Authmaker app is simple with [Google Cloud Platform](https://cloud.google.com/). With Google Cloud, hosting for small web applications is free (in most cases) - you won't have to pay until your application scales past their [free tier](https://cloud.google.com/free/).

If you don't have an existing Google Cloud account, you will need to create one before the next steps.

## Configure your DNS

You will need to own a domain name to use as the URL for your deployed application. You can register a new domain with [Google Domains](https://domains.google.com) if you do not already have one, but any DNS provider you choose is fine.

If you are using a DNS provider other than Google, you will need to verify ownership of the domain through [Google Webmaster Central](https://www.google.com/webmasters/verification/). If you created your domain with Google, this step is automatic.

#### Create a CNAME record

Navigate to your DNS provider's control panel to access your domain settings. If you are using Google Domains, select the 'Configure DNS' option for your domain. From here, create a new `CNAME` record that will point your domain to the the Google Storage servers where your app will be hosted, `c.storage.googleapis.com.`.

It will look something like this:

<table>
  <tr>
    <th>NAME</th>
    <th>TYPE</th>
    <th>TTL</th>
    <th>DATA</th>
  </tr>
  <tr>
    <td>my-app-domain-name.com</td>
    <td>CNAME</td>
    <td>1h</td>
    <td>c.storage.googleapis.com.</td>
  </tr>
</table>

For more information on `CNAME` redirects to Google Cloud Platform, [see the documentation here.](https://cloud.google.com/storage/docs/request-endpoints#cname)

## Create your storage bucket

From the Google Cloud console, create a new **project** for this application. Google Cloud Platform organizes your resources into projects - this makes it easy to manage permissions and settings for multiple deployments in one place. For example, _both_ our frontend application _and_ backend server deployments will belong to the same project.

From the navigation menu, select 'Storage' to access your project's Cloud Storage tools. From there, create a new storage **bucket** with the same name as your `CNAME` record. To continue our previous example, we would create a storage bucket with the name `my-app-domain-name.com`.

Keep note of both your project name and bucket name, as we will use them to configure our Ember app for deployment in the next step.

## Deploy your Ember app

In your Ember application's directory, install the following packages for deployment:

```bash
$ ember install ember-cli-deploy
$ ember install ember-cli-deploy-gcloud-pack
```
