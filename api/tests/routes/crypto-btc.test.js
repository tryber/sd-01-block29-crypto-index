const nock = require('nock');
const axiosist = require('axiosist');
const app = require('../../server');
const btcFixtures = require('../fixtures/crypto-btc');
const loginFixtures = require('../fixtures/login');

jest.setTimeout(100000);

const originalCoinbaseTimeout = `${process.env.COINBASE_API_TIMEOUT || '3000'}`;
process.env.COINBASE_API_TIMEOUT = 10;

describe('GET /crypto/btc', () => {
  const axios = axiosist(app);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('when coinbase is offline', () => {
    let response;

    beforeAll( async () => {
      const token = await axios.post('/login', loginFixtures.validLogin)
      .then(({ data }) => data.token); 
    
      nock('https://api.coindesk.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v1/bpi/currentprice/BTC.json')
      .delayConnection(1000)
      .reply(200, {});

      response = await axios.get('/crypto/btc', { headers: { Authorization: token } });
    });

    afterAll(() => {
      process.env.COINBASE_API_TIMEOUT = originalCoinbaseTimeout;
    });

    it('returns a 503 HTTP status code', () => {
      expect(response.status).toBe(503);
    });

    it('returns a `coinbase service not available` message', () => {
      expect(response.data.message).toBe('coinbase service not available');
    });
  });

  describe('when coinbase is online', () => {
    let response;

    beforeAll( async () => {
      const token = await axios.post('/login', loginFixtures.validLogin)
      .then(({ data }) => data.token);

      nock('https://api.coindesk.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v1/bpi/currentprice/BTC.json')
      .reply(200, btcFixtures.success);

      response = await axios.get('/crypto/btc', { headers: { Authorization: token } });
    });

    it('returns 200', () => {
      expect(response.status).toBe(200);
    });

    it('returns an object', () => {
      expect(typeof response.data).toBe('object');
    });
  });
});
