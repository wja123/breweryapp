'use strict'

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var BeerList = require('../models/beer');
var dotenv = require('dotenv').config();

router.use(User.authMiddleware);


router.get('/beer', function(req, res) {
    request.get(BREWS_KEY, function(err, beer) {
        if (err) {
            cb(err);
        } else {
            cb(err, beer);
        }

    });
});

// router.post('/beer', function(req, res) {
// (req.user._id, function(err,user){

// })
// });



module.exports = router;