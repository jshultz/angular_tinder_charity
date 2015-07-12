'use strict';

var _ = require('lodash');

// Get list of images
exports.index = function(req, res, next) {
	// console.log('req', req)
	console.log('params',req.params)
	// console.log('query', req.query)
	var path = require('path');

	var options = {
	    root: __dirname + '/public/uploads/images/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
	};

	var fileName = req.params.name;
	  res.sendFile(fileName, { root: '/public/uploads/images/' }, function (err) {
	    if (err) {
	    	console.log('fileName', fileName);

	     	if (err.code === "ECONNABORT" && res.statusCode == 304) {
		      // No problem, 304 means client cache hit, so no data sent.
		      console.log('304 cache hit for ' + filename);
		      return;
		    }
		    console.error("SendFile error:", err, " (status: " + err.status + ")" + " (statusText: " + err.statusText + ")");
		    if (err.status) {
		      res.status(err.status).end();
		    }
	    }
	    else {
	      console.log('Sent:', fileName);
	    }
	});

  res.json([]);
};