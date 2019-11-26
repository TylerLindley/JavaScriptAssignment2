'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', isLoggedIn, function (req, res) {
    res.send('respond with a resource');
});

//Is the user logged in?
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Not authenticated!');
    res.redirect('/login');
}
module.exports = router;
