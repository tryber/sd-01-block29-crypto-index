const axiosist = require('axiosist');
const app = require('../../server');

describe('GET /currencies', () => {
  const axios = axiosist(app);

  describe('returns a XXX error message',() => {
    let response;

    beforeAll(async () => {
      response = await axios.get('/currencies');
      console.log(response);
    });
  });
});
