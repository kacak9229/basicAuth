var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

var facebookConfig = {
  clientID: '457298921114717',
  clientSecret: '5627b0a913c4dcc5fd9bd1377fc3cb96',
  callbackURL: 'http://localhost:8080/facebook/callback',
  profileFields: ['email', 'displayName']
};


var facebookInit = function(token, refreshToken, profile, callback) {
  User.findOne({ "facebook.id": profile.id }, function(err, user) {
    if (err) return callback(err);

    if (user) {
      return callback(null, user);
    }

    var newUser = new User();
    newUser.facebook.email = profile.emails[0].value || null;
    newUser.facebook.id = profile.id;
    newUser.facebook.token = token;
    newUser.facebook.displayName = profile.displayName;
    newUser.facebook.photo = 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';

    newUser.save(function(err) {
      if (err) {
        throw err;
      }
      return callback(null, newUser);
    });
  });
}

passport.use(new FacebookStrategy(facebookConfig, facebookInit));

passport.serializeUser(function(user, callback) {
  callback(null, user.id)
});

passport.deserializeUser(function(id, callback) {
  User.findById(id, function(err, user) {
    callback(err, user);
  });
});

module.exports = {
  facebookLogin: passport.authenticate("facebook", {scope: 'email'}),
  facebookCallback: passport.authenticate("facebook", {
    successRedirect: "/chat",
    failureRedirect: "/"
  })
}
