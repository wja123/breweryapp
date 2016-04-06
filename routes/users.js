var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
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

/* GET users listing. */
router.get('/users', function(req, res) {
    User.find({}).select("-password").exec(function(err, data) {
        if (err || !data) return res.status(400).send(err);
        res.send(data);
    })
});

router.put('/profile/update', function(req, res) {
    User.findByIdAndUpdate(req.user._id, req.body, {
        new: true
    }, function(err, user) {
        if (err) {
            return res.status(400).send(err);
        } else {
            res.status(200).send(user);
        }
    });
});


router.put('/profile', function(req, res) {
    return res.send(req.user);
});

router.delete('/logout', function(req, res) {
    res.clearCookie('appcookie').send();
});



module.exports = router;