const fetch = require('node-fetch');

const getCoin = () => fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
    .then(res => res.json())
    .then(json => json)
    .catch(err => console.error(err));

module.exports = getCoin;
