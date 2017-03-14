#!/usr/bin/env node

'use strict';

require('colors');
var cors = require('cors');
var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var fs = require('fs');
var ora = require('ora');
var argv = require('yargs')
  .usage('$0 [args] <spa-asset-path>')
  .option('port', {
    alias: 'p',
    describe: 'Port to run the dev server on'
  })
  .option('origin', {
    alias: 'o',
    describe: 'Location of SPA, for serving CORS headers'
  })
  .help('help')
  .argv;

var PORT = argv.port || 3000;
var SPA_ROOT = argv._[0]; // The path to the SPA app to serve.
var ORIGIN = argv.origin;

var spinner = ora({
  interval: 100
});

var app = express();

function isValidPath(path) {
  try {
    return path && fs.lstatSync(SPA_ROOT).isDirectory() === true;
  } catch (error) {
    return false;
  }
}

function failAndExit(err) {
  spinner.fail();
  console.error(err.stack);
  process.exit(1);
}

if (SPA_ROOT) {
  spinner.text = 'Locate SPA assets in ' + SPA_ROOT;
  if (!isValidPath(SPA_ROOT)) {
    failAndExit(new Error('Error: First argument must be a valid path to your SPA app.'));
  }
  spinner.succeed();
}

if (ORIGIN) {
  spinner.text = 'Provide CORS headers to ' + ORIGIN;
  app.use(cors({
    origin: ORIGIN,
    credentials: true
  }));
  spinner.succeed();
}

app.use(stormpath.init(app, {
  // Disable logging until startup, so that we can catch errors
  // and display them nicely
  debug: 'none',
  web: {
    produces: ['application/json'],
    me: {
      expand: {
        customData: true,
        groups: true,
        groupMemberships: true
      }
    }
  }
}));

if (SPA_ROOT) {
  app.use(express.static(SPA_ROOT));

  // All undefined asset or api routes should return a 404.
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(function (req, res) {
    res.status(404).end();
  });

  // All other routes should redirect to the index.html.
  app.route('/*').get(function (req, res) {
    res.sendFile(path.join(SPA_ROOT, 'index.html'));
  });
}

// spinner.start();

spinner.text = 'Starting Dev Sever on port ' + PORT,

app.listen(PORT, function(){
  spinner.succeed();
  spinner.text = 'Fetching Stormpath Application';
  spinner.start();
}).on('error', failAndExit);

app.on('stormpath.error', failAndExit);

app.on('stormpath.ready', function () {
  var msg = SPA_ROOT ? 'Navigate to' : 'JSON API available at';
  spinner.succeed();
  console.log('\nReady!'.green);
  console.log('\n'+msg+': http://localhost:'+PORT);
  // Now bring back error logging
  app.get('stormpathLogger').transports.console.level = 'error';
});
