
const express = require('express');
const router = express.Router();
const { getCoinData, getCoinLogo, getQuotes } = require('../controllers/cmcController');
const { getCoins } = require('../controllers/coinController');
const { get } = require('mongoose');


// get latest market quote for 1 or more cryptocurrencies.
// req.id : 1 or more coin id
router.get('/quotes', async (req, res) => {
  try {
    const data = await getQuotes();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from CoinMarketCap!!');
  }
});

// get coin data
router.get('/:coinId', async (req, res) => {
  const { coinId } = req.params;
  try {
    const data = await getCoinData(coinId);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from CoinMarketCap!!');
  }
});


// get coin logo
router.get('/:coinId/logo', async (req, res) => {
  const { coinId } = req.params;
  try {
    const logo = await getCoinLogo(coinId);
    res.json(logo);
  } catch (error) {
    res.status(500).send('Error fetching data from CoinMarketCap');
  }
});



module.exports = router;
