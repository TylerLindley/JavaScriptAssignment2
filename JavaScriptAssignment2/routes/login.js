'use strict';
var express = require('express');
var router = express.Router();

/* GET Login Page (Authenticate they have an account via database */
router.get('/', function (req, res) {
    res.render('login', { title: 'Express' });
});

module.exports = router;
