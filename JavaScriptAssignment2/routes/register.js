'use strict';
var express = require('express');
var router = express.Router();

/* GET Register page (Let user's create an account then store in the database) */
router.get('/', function (req, res) {
    res.render('register', { title: 'Express' });
});

module.exports = router;
