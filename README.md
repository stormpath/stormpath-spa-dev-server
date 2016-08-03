# Stormpath SPA Development Server

[![NPM Version](https://img.shields.io/npm/v/stormpath-spa-dev-server.svg?style=flat)](https://npmjs.org/package/stormpath-spa-dev-server)
[![NPM Downloads](http://img.shields.io/npm/dm/stormpath-spa-dev-server.svg?style=flat)](https://npmjs.org/package/stormpath-spa-dev-server)

[Stormpath](https://stormpath.com/) development server that provides your Single-Page-App (SPA) or mobile app with a Stormpath integrated back-end.

Front-end applications can not communicate with the Stormpath API directly, and thus need an integrated back-end. Before your back-end has been integrated, use this development server when integrating Stormpath with your front-end app.  It will serve all the necessary JSON endpoints for your front-end application, and will integrate directly with our [Angular SDK](https://github.com/stormpath/stormpath-sdk-angularjs). and [React SDK](https://github.com/stormpath/stormpath-sdk-react).

## Install

1. Make sure you have [Node.js](https://nodejs.org/) installed
2. Install the server

  ```bash
  $ npm install -g stormpath-spa-dev-server
  ```

3. [Download an API Key Pair](https://docs.stormpath.com/rest/product-guide/latest/quickstart.html#create-an-api-key-pair) from the Stormpath Admin Console.

4. Login to the [Stormpath Admin Console](https://api.stormpath.com/) and find the **Application Href** (also called **REST URL**) of the Application that you will use for your project.  The default application is called "My Application" and you can use that to get started.


5. Provide the **API Key ID**, **API Key Secret**, and **Application Href** to your environment, with one of these strategies:

  **Unix Environment Variables:**

  ```bash
  export STORMPATH_CLIENT_APIKEY_ID=YOUR_ID_HERE
  export STORMPATH_CLIENT_APIKEY_SECRET=YOUR_SECRET_HERE
  export STORMPATH_APPLICATION_HREF=YOUR_APP_HREF
  ```

  **Unix Environment Variables:**

  ```bash
  set STORMPATH_CLIENT_APIKEY_ID=YOUR_ID_HERE
  set STORMPATH_CLIENT_APIKEY_SECRET=YOUR_SECRET_HERE
  set STORMPATH_APPLICATION_HREF=YOUR_APP_HREF
  ```

  **Place them in a file named `stormpath.yml`, in the directory where you run the dev server:**

  ```yaml
  client:
    apiKey:
      id: YOUR_API_KEY_ID
      secret: YOUR_API_KEY_SECRET
  application:
    href: https://api.stormpath.com/v1/applications/XXXX
  ```

## Usage

1. Start the server with the JSON API, and serve your SPA assets:

  ```bash
  $ stormpath-spa-dev-server /home/joe/dev/my-angular-app/
  ```

  It's now listening at <http://localhost:3000/> and ready to use with your front-end app


2. Or have it just serve the JSON API, and you can serve your SPA as you please:

  ```bash
  $ stormpath-spa-dev-server --origin http://localhost:4000
  ```

  Note: in this situation you need to tell us where your SPA is being run (the
  `origin` option), so that we can serve the necessary CORS headers.

## Support

We're here to help if you get stuck.  There are several ways that you an get in
touch with a member of our team:

* Send an email to [support@stormpath.com](mailto:support@stormpath.com)
* Open a Github Issue on this repository.
* Join us on our Slack channel: [https://talkstormpath.slack.com](https://talkstormpath.slack.com)

## License

Apache 2.0, see [LICENSE](LICENSE).
