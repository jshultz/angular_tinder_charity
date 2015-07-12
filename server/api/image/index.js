'use strict';

var express = require('express');
var controller = require('./image.controller');

var router = express.Router();

router.get('/:name', controller.index);

module.exports = router;