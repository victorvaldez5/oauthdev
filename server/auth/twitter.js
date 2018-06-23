var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new TwitterStrategy({
  consumerKey: config.twitter.consumerKey,
  consumerSecret: config.twitter.consumerSecret,
  callbackURL: config.twitter.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  var searchQuery = {
    name: profile.displayName
  };
  
  var updates = {
    name: profile.displayName,
    someID: profile.id
  };

  var options = {
    upsert: true
  };

  User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
    if (err) {
      return done(err);
    } else {
      return done(null, user);
    }
  });
}));

init();

module.exports = passport;