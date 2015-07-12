'use strict';

var express = require('express');
var controller = require('./upload.controller');

var fs = require('fs');

// var router = express.Router();

var express = require('express');
var multer = require('multer');
var router = module.exports = express.Router();
router.use(multer({
    dest: './public/uploads',
    changeDest: function(dest, req, res){
        dest += '/images/';
        return dest;
    },
    onFileUploadStart: function(file){
        console.log('starting');
    }
}));

router.post('/', sendResponse);
function sendResponse(req, res){
    var result = {};
    result.filename = req.files.file.name;
    result.status = 'ok';
    res.send(result);
};

// router.post('/', controller.index);

module.exports = router;

// Some app.configure here