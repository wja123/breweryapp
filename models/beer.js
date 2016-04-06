'user strict';

const BREWS_KEY = process.env.BREW_URL;


var mongoose = require('mongoose');
var User = require('./user');
var request =require('request');
var dotenv = require('dotenv').config();
var Schema = mongoose.Schema;
var BeerList;

var BeerListSchema = new mongoose.Schema({
    beerdata: Schema.Types.Mixed,
    beerDbId:String,
    userId: Schema.Types.ObjectId,
    sampled:Boolean,
    rating:Number,
    comments:String
});


BeerListSchema.methods.getRandomBeer = function(){
      request.get(BREWS_KEY, function(err, beer) {
        if (err) {
            console.log(err);
        } else {
            return beer;
        }
    });
}

BeerListSchema.statics.addBeer = function(){
      request.get(BREWS_KEY, function(err, beer) {
        if (err) {
            console.log(err);
        } else {
            return beer;
        }
    });
}


var BeerList = mongoose.model('BeerList',BeerListSchema);


module.exports = BeerList;