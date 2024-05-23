const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Coin } = require('./models/models');
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/coins', async (req, res) => {
    try {
        const coins = await Coin.find({});
        res.json(coins);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.post('/coin', async (req, res) => {
    
    
    try {
       const coin = await Coin.create(req.body);
       res.status(201).json(coin);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

app.delete('/coin/:id', async (req, res) => {
    try {
        const coin = await Coin.findByIdAndDelete(req.params.id);
        if (coin == null) {
            return res.status(404).json({message: "Coin not found"});
        }
        res.json({message: "Coin deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

mongoose.connect('mongodb+srv://admin:olimp@backenddb.niosxkb.mongodb.net/Crypto-Stats?retryWrites=true&w=majority&appName=backendDB', 
{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {console.log("server is running")});
}).catch((err) => {
    console.log("Failed to connect to MongoDB", err);
});