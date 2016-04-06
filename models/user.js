'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var dotenv = require('dotenv').config();
var moment = require('moment');
var User;

const JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    joined: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateToken = function() {
    var payload = {
        _id: this._id,
        iat: Date.now(),
        exp:moment().add(1,'day').unix()
    }
    var token = jwt.encode(payload, JWT_SECRET);
    return token;
}

userSchema.statics.register = function(userObj, cb) {
    bcrypt.hash(userObj.password, 10, function(err, hash) {
        if (err) {
            return cb(err);
        } else {
            userObj.password = hash;
            User.create(userObj, function(err, user) {
                if (err) {
                    cb(err);
                } else {
                    user.password = null;
                    cb(err, user);
                }
            });
        }
    });
}

userSchema.statics.authenticate = function(userObj, cb) {
    User.findOne({
        email: userObj.email
    }, function(err, user) {
        if (err || !user) {
            cb("Authenticaton failed!");
        } else {
            bcrypt.compare(userObj.password, user.password, function(err, success) {
                if (err || !success) {
                    cb("Authenticaton failed!");
                } else {
                    user.password = null;
                    cb(null, user);
                }
            });
        }
    })
}

userSchema.statics.authMiddleware = function(req, res, next) {
    var token = req.cookies.appcookie;
    try {
        var payload = jwt.decode(token, JWT_SECRET);
    } catch (err) {
        return res.clearCookie('appcookie').status(401).send('Authenticaton Failed');
    }

    User.findById(payload._id, function(err, user) {
        if (err || !user) {
            return res.clearCookie('appcookie').status(401).send('Authenticaton Failed');
        } else {
            var dbUser = user;
            dbUser.password = null;
            req.user = dbUser;
            next();
        }
    });

}

var User = mongoose.model('User', userSchema);

module.exports = User;