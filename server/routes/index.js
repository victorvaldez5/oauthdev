var express = require('express');
var router = express.Router();
var { ObjectId } = require("mongodb");

var passportGithub = require('../auth/github');
var passportTwitter = require('../auth/twitter');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.send('Go back and register!!!!');
});

router.get('/auth/github', passportGithub.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
   res.redirect('/');
  }
);

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));
router.get('/auth/twitter/callback', 
  passportTwitter.authenticate('twitter', { failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
    res.json(req.user);
  });

module.exports = router;
