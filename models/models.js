
const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    crypto_id: {
        type: String,
        required: true,
        unique: true
    },
    crypto_name: {
        type: String,
        required: true
    },
    crypto_symbol: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    // Schema definition
});


const Coin = mongoose.model('Coin', coinSchema);
const User = mongoose.model('User', userSchema);

module.exports = { User, Coin };