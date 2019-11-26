var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        location: String,
        price: Number
    }
);

module.exports = mongoose.model('List', ListSchema);