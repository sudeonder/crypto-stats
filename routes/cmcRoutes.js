// routes/cmcRoutes.js
const express = require('express');
const router = express.Router();
const { getCoinData } = require('../services/cmcService');

router.get('/:coinId', async (req, res) => {
  const { coinId } = req.params;
  try {
    const data = await getCoinData(coinId);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from CoinMarketCap');
  }
});

module.exports = router;
