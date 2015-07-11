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
        dest += '/haha/';
        try{
		    stat = fs.statSync(dest);
		}catch(err){
		    fs.mkdirSync(dest);
		}
        return dest;
    },
    onFileUploadStart: function(file){
        console.log('starting');
    }
}));

router.post('/', sendResponse);
function sendResponse(req, res){
    res.send('ok');
};


// router.post('/', controller.index);

module.exports = router;

// Some app.configure here