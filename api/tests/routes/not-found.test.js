const axiosist = require("axiosist");
const app = require('../../server');

jest.setTimeout(10000);

describe('GET or POST Not Found', () => {
  const axios = axiosist(app);

  describe('when a url does not exist', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/lll', {});
    });

    it('returns a 404 HTTP status code', () => {
      expect(response.status).toBe(404);
    });

    it('returns a `Endpoint não encontrado.` error message', () => {
      expect(response.data.message).toBe('Endpoint não encontrado.');
    });
  });
});
