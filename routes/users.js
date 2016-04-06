var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/users', function(req, res) {
    User.find({}).select("-password").exec(function(err, data) {
        if (err || !data) return res.status(400).send(err);
        res.send(data);
    })
});

router.post('/register', function(req, res) {
    User.register(req.body, function(err, user) {
        if (err || !user) {
            return res.status(400).send();
        } else {
            var token = user.generateToken();
            res.cookie('appcookie', token).status(200).send(user);
        }
    })
});

router.put('/login', function(req, res) {
    User.authenticate(req.body, function(err, user) {
        if (err || !user) {
            return res.status(400).send();
        } else {
            var token = user.generateToken();
            res.cookie('appcookie', token).status(200).send(user);
        }
    })
});

router.use(User.authMiddleware);

router.put('/profile', function(req, res) {
    return res.send(req.user);
});

router.delete('/logout', function(req, res) {
    res.clearCookie('appcookie').send();
});



module.exports = router;