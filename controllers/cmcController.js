// services/cmcService.js
const axios = require('axios');

const apiKey = 'your_coinmarketcap_api_key';

const cmcInstance = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1/',
  headers: {
    'X-CMC_PRO_API_KEY': apiKey,
  },
});

const getCoinData = async (coinId) => {
  try {
    const response = await cmcInstance.get(`cryptocurrency/info?id=${coinId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap:', error);
    throw error;
  }
};

module.exports = {
  getCoinData,
};
