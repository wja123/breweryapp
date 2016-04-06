'use strict'

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var BeerList = require('../models/beer');
var dotenv = require('dotenv').config();
var request = require('request');
const BREWS_KEY = process.env.BREW_URL;

router.use(User.authMiddleware);

router.get('/beer', function(req, res) {
    getRandomBeer(req.beers,function(beer) {
        res.status(200).send(beer);
    });
});


function getRandomBeer(beers,cb) {
    request.get(BREWS_KEY, function(err, beer) {
        if (err) {
            cb(false);
        } else {
            cb(beer);
        }
    });
}

router.post('/beer', function(req, res) {
    var newPost = req.body;
    newPost.userId = req.user._id;
    BeerList.create(newPost, function(err, beer) {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).send(beer);
        }
    })
});

router.put('/beer/:id', function(req, res) {
    BeerList.findByIdAndUpdate(req.body._id, req.body, {
        new: true
    }, function(err, beer) {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).send(beer);
        }
    })
});

router.delete('/beer/:id', function(req, res) {
    BeerList.findByIdAndRemove(req.body._id, function(err, beer) {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).send("Successfully Removed!");
        }
    })
});



module.exports = router;