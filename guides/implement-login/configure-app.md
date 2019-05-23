After successfully creating your Authmaker instance, it is time to create your
app and configure it to use your new Authmaker Instance.

## Create your app

The quickest way to create your new application is to use the following npm init command:

```bash
npm init ember-app your-amazing-app
```

This will create a new application for you in the folder `your-amazing-app`. You can make sure that it has initialised correctly by navigating to that app and starting it:

```bash
cd your-amazing-app
npm start
```

You should be prompted to visit http://localhost:4200 which should look something like this when you visit it:

![Ember Dummy App](/images/dummy-app.png)

Next we need to install the Authmaker addon.

## Installing Authmaker Simple Auth

To get you started as quickly as possible we provide an Ember Addon that provides a lot of the functionality you would need. It is built to extend [ember-simple-auth](https://ember-simple-auth.com/) to allow easy implementation of authentication and authorization in your app.

From your Ember application directory, install [authmaker-ember-simple-auth](https://github.com/Authmaker/authmaker-ember-simple-auth) as follows:

```bash
ember install authmaker-ember-simple-auth
```

This will create a bunch of files in your application for you and update your environment config with example config that you will need to update before the Addon will start working.

### Update Authmaker config

If you open `config/environment.js` you will see that there are sections that will look something like this:


```javascript {data-filename=config/environment.js}
if (environment === 'development') {
  ENV.authmaker = {
    domainUrl: 'REPLACE_ME',
    redirectUri: 'REPLACE_ME',
    clientId: 'REPLACE_ME'
  };
}
```

You will need to replace these example configurations with the real config for your Authmaker application. To get the real configuration you should [login to your Authmaker dashboard](https://app.authmaker.com/instances) and click the button marked "Local Ember Config":

![Example Authmaker Instance](/images/instance.png)

When you click the button there will be a pop up with your specific config for your Authmaker app and you should replace the example config in the `development` section of your `environment.js` file to reflect this specific config.
