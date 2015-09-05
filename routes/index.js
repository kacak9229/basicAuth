var router = require('express').Router();
var auth = require('../config/facebook');
var User = require('../models/user');
var config = require('../config/config');
var secretKey = config.secretKey;
var jwt = require('jsonwebtoken');

function createToken(user) {
  var token = jwt.sign({
    id: user._id,
    displayName: user.facebook.displayName,
  }, secretKey, {
    expiresInMinute: 1440
  });

  return token
}

function ensureAuthenticated(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secretKey, function(err, user) {
      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        // if everything is good save request for use in another request
        req.user = user;
        next();
      }
    });
  } else {
    // if there is no token
    res.status(403).send({
      success: false,
      message: 'No token Provided'
    });
  }
}

// function isFriend(displayName) {
//     User.findOne({ "facebook.displayName": })
//
//
// }

router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/register', function(req, res) {
  res.render('register.ejs');
});

router.get('/profile', function(req, res) {
  res.render('profile.ejs', {
    user: req.user
  });
});

// router.post('/friendships/create/:facebook_name', ensureAuthenticated, function(req, res) {
//
//   User.findOneAndUpdate({"facebook.displayName": facebook_name}, function(err, user) {
//
//     socket.emit('add a friend', {
//       message: 'add a friend',
//       username: req.user.facebook.displayName
//     });
//   });
// });

router.get('/chat', function(req, res) {
  res.render('chat.ejs', {
    user: req.user,
  });
});

router.get('/facebook', auth.facebookLogin);
router.get('/facebook/callback', auth.facebookCallback);

module.exports = function(io) {
  return router;
}
