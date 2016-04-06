'user strict';

var mongoose = require('mongoose');

var BeerlistSchema = mongoose.Schema({
    description: String,
    userId: Schema.Types.ObjectId,
    added: {type: Date, default: Date.now},
    sampled:Boolean
});

var BeerList = new mongoose.model('BeerList',BeerlistSchema);

module.exports = BeerList;