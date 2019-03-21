const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    twitter : {
        id : String,
        token : String,
        displayName : String,
        username : String
    },
});

module.exports = mongoose.model('Account', accountSchema);