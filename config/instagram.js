var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user');

var instaOpt = {
  clientID: "aad229e3597643be92568acb46efb40d",
  clientSecret: "5563070a33394e0fafada92a16ec2e71",
  callbackURL: "http://localhost:8000/auth/instagram/callback"
};

var instagramInit = function(accessToken, refreshToken, profile, callback) {
  User.findOne({ "instagram.id" : profile.id } , function(err, user) {
    if (err) return callback(err);

    if (user) {
      return callback(null, user); // User already exist
    }

    var newUser = new User();
    newUser.instagram.id = profile.id;
    newUser.instagram.token = accessToken;
    newUser.instagram.email = profile.email;
    newUser.instagram.displayName = profile.displayName;
    newUser.instagram.name = profile.name;
    newUser.instagram.username = profile.username;
    // newUser.instagram.picture = profile.picture;

    newUser.save(function(err) {
      if (err) {
        throw err;
      }
      return callback(null, newUser);
    });
  });
}

passport.use(new InstagramStrategy(instaOpt, instagramInit));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


module.exports = {
  instagramLogin: passport.authenticate("instagram"),
  instagramCallback: passport.authenticate("instagram", {
    successRedirect: "/profile",
    failureRedirect: "/"
  })
}
