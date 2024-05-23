
const axios = require('axios');

require('dotenv').config(); 

const apiKey = process.env.COINMARKETCAP_API_KEY; 

const cmcInstance = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v2/',
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

const getCoinLogo = async (coinId) => {
  try {
    const response = await cmcInstance.get(`cryptocurrency/info?id=${coinId}`);
    return response.data.data[coinId].logo;
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap:', error);
    throw error;
  }
};

module.exports = {
  getCoinData,
  getCoinLogo,
};
