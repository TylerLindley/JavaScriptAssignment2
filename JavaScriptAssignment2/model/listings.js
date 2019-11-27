var mongoose = require('mongoose');

var ListingSchema = new mongoose.Schema(
    {
        name: String, //Where I will display all of my listings, I need a name, description, location and price
        description: String,
        location: String,
        price: Number
    }
);

module.exports = mongoose.model('Listing', ListingSchema);