
const express = require('express');
const router = express.Router();
const { getCoinData, getCoinLogo } = require('../controllers/cmcController');

// get coin data
router.get('/:coinId', async (req, res) => {
  const { coinId } = req.params;
  try {
    const data = await getCoinData(coinId);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from CoinMarketCap');
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
