var mongoose = require('mongoose');

var ListingSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        location: String,
        price: Number
    }
);

module.exports = mongoose.model('Listing', ListingSchema);