'use strict';
var express = require('express');
var router = express.Router();

/* GET Page for Adding items to the marketplace */
router.get('/', isLoggedIn, function (req, res) {
    res.render('add');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); //If the user is not logged in, they cannot add to my database.
    }
    console.log('Not authenticated!');
    res.redirect('/login');
}

module.exports = router;

