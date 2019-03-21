/* GET users listing. */
var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('user', { user: req.user });
});

module.exports = router;