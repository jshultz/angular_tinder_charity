/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var express = require('express');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/images/', require('./api/image'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/things', require('./api/thing'));
  app.use('/static', express.static('public'));
  app.use('/images', express.static('public/uploads/images'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  var path = require('path');
  app.route('/*')
    .get(function(req, res) {
      // res.sendFile(path.join(__dirname, ''./client/index.html''));
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
      // res.sendfile(app.get('appPath') + '/index.html');
    });
};
