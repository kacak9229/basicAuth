var router = require('express').Router();
var authConfig = require('../config/auth-config');
var auth = require('../config/instagram');

router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/login', function(req, res) {
  res.render('login.ejs');
});

router.post('/login', authConfig.localLogin);

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

router.post('/register', authConfig.localRegister);

router.get('/facebook', authConfig.facebookLogin);
router.get('/facebook/callback', authConfig.facebookCallback);

router.get('/auth/instagram', auth.instagramLogin);
router.get('/auth/instagram/callback', auth.instagramCallback);


module.exports = router;
