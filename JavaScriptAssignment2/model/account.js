var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema(
    {
        username: String, //Creating a username and password to store as a "Login" page
        password: String
    }
);

module.exports = mongoose.model('Account', AccountSchema);