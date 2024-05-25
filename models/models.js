
const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    crypto_id: {
        type: String,
        required: false,
        unique: true
    },
    crypto_name: {
        type: String,
        required: false,
        unique: false
    },
    crypto_symbol: {
        type: String,
        required: false,
        unique: false
    }
});

const userSchema = new mongoose.Schema({
    // Schema definition
});


const Coin = mongoose.model('Coin', coinSchema);
const User = mongoose.model('User', userSchema);

module.exports = { User, Coin };