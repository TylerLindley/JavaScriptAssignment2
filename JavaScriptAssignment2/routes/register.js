'use strict';
var express = require('express');
var router = express.Router();
var Account = require('../model/account');

/* GET register page. */
router.get('/', function (req, res) {
    res.render('register');
});


/* Create a User */
router.post('/', function (req, res) {
    Account.create({
        username: req.body.username,
        password: req.body.password
    }, function (err, Account) {
        if (err) console.log(err);
        else {
            console.log('Account added : ' + Account);
            res.redirect('/listings');
        }
    });
});


module.exports = router;
