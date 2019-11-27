'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login page. */
router.get('/', function (req, res) {
    res.render('login');
});

//Try to login with passport
router.post('/', passport.authenticate('local', {
    successRedirect: '/listings', //Redirect to listings page
    failureRedirect: '/login', //reload the login and try again
    failureMessage: 'Invalid Login' 
}));

module.exports = router;
