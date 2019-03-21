const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();
var passportTwitter = require('../twitter');
var TwitterStrategy = require('passport-twitter').Strategy;
let Account = require("../models/account");
let Profile = require("../models/profile");

//////////////////TWITTWR///////////////////
router.get('/twitter',
  passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.body.username = req.user.twitter.username
    req.session.user = req.body.username
    res.redirect('../');
});
////////////////////////////////////////////


module.exports = router;