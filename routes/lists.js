'use strict'

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var User = require('../models/list');

router.use(User.authMiddleware);


module.exports = router;
