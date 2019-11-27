'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) { //Basic home page for them.
    res.render('home', { title: 'Express' });
});

module.exports = router;
