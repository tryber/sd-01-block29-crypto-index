const axios = require('axios');

const axiosFetch = link =>
  axios.get(link, { timeout: 1000 }).then(data => data.data);

module.exports = axiosFetch;
