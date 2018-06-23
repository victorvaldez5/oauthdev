var passport = require('passport');
var User = require('../models/user');

module.exports = function() {
  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log(id);
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

};