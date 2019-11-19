'use strict';
var express = require('express');
var router = express.Router();

/* GET listings page (Item marketplace) */
router.get('/', function (req, res) {
    res.render('listings', { title: 'Express' });
});

module.exports = router;
