var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        location: String,
        price: Number
    }
);

module.exports = mongoose.model('Listing', ProductSchema);