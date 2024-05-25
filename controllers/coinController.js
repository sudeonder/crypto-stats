const { Coin } = require("../models/models");

const getCoins = async (req, res) => {
  try {
    const coins = await Coin.find({});
    res.json(coins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const addCoin = async (req, res) => {
  try {
    const data ={ crypto_id: req.params.id};
    const coin = await Coin.create(data);
    res.status(201).json(coin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteCoin = async (req, res) => {
  try {
    const coin = await Coin.findOneAndDelete({ crypto_id: req.params.id });
    if (coin == null) {
      return res.status(404).json({ message: "Coin not found" });
    }
    res.json({ message: "Coin deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCoins,
  addCoin,
  deleteCoin,
};
