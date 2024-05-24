
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

const getQuotes = async (id) => {
  id = [1,3, 4, 5];
  try {
    const response = await cmcInstance.get(`cryptocurrency/quotes/latest?id=${id}`);
    
    const data = response.data.data;
    const filteredData = {};
    for (const key in data) {
      const logo = await getCoinLogo(data[key].id);
      {
        filteredData[key] = {
          id: data[key].id,
          name: data[key].name,
          price: data[key].quote.USD.price,
          percent_change_1h: data[key].quote.USD.percent_change_1h,
          percent_change_24h: data[key].quote.USD.percent_change_24h,
          percent_change_7d: data[key].quote.USD.percent_change_7d,
          market_cap: data[key].quote.USD.market_cap,
          volume_24h: data[key].quote.USD.volume_24h,
          logo: logo,
        };
      }
    }
    return filteredData;
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap:', error);
    // print error
    console.log(error)
    throw error;
  }
}

module.exports = {
  getCoinData,
  getCoinLogo,
  getQuotes
};
