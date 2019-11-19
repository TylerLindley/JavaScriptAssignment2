'use strict';
var express = require('express');
var router = express.Router();

/* GET Page for Adding items to the marketplace */
router.get('/', function (req, res) {
    res.render('add', { title: 'Express' });
});

module.exports = router;
