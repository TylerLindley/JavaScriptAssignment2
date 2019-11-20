'use strict';
var express = require('express');
var router = express.Router();
var Listing = require('../model/listings');

/* GET the home page */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

//Get all listings
router.get('/listings', function (req, res) {
    Listing.find(function (err, listings) {
        if (err) console.log(err);
        else res.render('listings', { allListings: listings });
    });
});

/* GET listings page (Item marketplace) */
router.get('/listings/add', function (req, res) {
    res.render('add');
});

//Add a listing to DB
router.post('/listings/add', function (req, res) {
    Listing.create({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price
    }, function (err, Listing) {
        if (err) console.log(err);
        else {
            console.log('Listing Added: ' + Listing);
            res.render('added', { listing: Listing.title });
        }
    });
});

//Delete a Listing
router.get('/listings/delete/:id', function (req, res) {
    var id = req.params.id;

    Listing.deleteOne({ _id: id }, function (err) {
        console.log(id);
        if (err)
            console.log('Listing : ' + id + 'not found!');
        else
            res.redirect('/listings');
    });
});

//Edit A Listing
router.get('/listings/edit/:id', function (req, res) {
    var id = req.params.id;

    Listing.findById(id, function (err, listing) {
        if (err)
            res.send('Listing : ' + id + 'not found!');
        else
            res.render('edit', { listing: listing });
    });
});

//Edit a listing and save to DB
router.post('/listings/edit', function (req, res) {
    var id = req.body.id;
    var editedListing = {
        _id: id,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price
    };
    Listing.updateOne({ _id: id }, editedListing, function (err) {
        if (err) res.send('Listing: ' + id + ' not found!');
        else {
            console.log('Listing' + id + ' updated!');
            res.redirect('/listings');
        }
    });
});


module.exports = router;
