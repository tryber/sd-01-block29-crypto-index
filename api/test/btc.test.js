const nock = require('nock');
const axiosist = require('axiosist');
const app = require('../server');
const { validEmail } = require('./fixtures');

jest.setTimeout(100000);

const originalCoinbaseTimeout = `${process.env.COINBASE_API_TIMEOUT || '3000'}`;
process.env.COINBASE_API_TIMEOUT = 10;

describe('GET /crypto/btc', () => {
  const axios = axiosist(app);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('when coinbase API is offline', () => {
    let response;

    beforeAll(async () => {
      const token = await axios
        .post('/login', validEmail)
        .then(({ data }) => data.token);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/v1/bpi/currentprice.json')
        .delayConnection(1000)
        .reply(200, {});

      response = await axios.get('/crypto/btc', {
        headers: {
          Authorization: token,
        },
      });
    });

    afterAll(() => {
      process.env.COINBASE_API_TIMEOUT = originalCoinbaseTimeout;
    });

    it('returns a 503 HTTP status code', () => {
      expect(response.status).toBe(503);
    });

    it('returns a `coinbase service not available` message', () => {
      expect(response.data.mensagem).toBe('coinbase service not available');
    });
  });

  describe('when coinbase API is online', () => {
    let response;

    beforeAll(async () => {
      const token = await axios
        .post('/login', loginFixtures.validData)
        .then(({ data }) => data.token);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/v1/bpi/currentprice.json')
        .reply(200, fixtures.success);

      response = await axios.get('/crypto/btc', {
        headers: { Authorization: token },
      });
    });

    it('returns 200', () => {
      expect(response.status).toBe(200);
    });

    it('returns an object', () => {
      expect(typeof response.data.data).toBe('object');
    });

    describe('the object', () => {
      it('has a `bpi` property', () => {
        expect(response.data.data).toHaveProperty('bpi');
      });

      it('has BTC value in BRL', () => {
        expect(response.data.data.bpi).toHaveProperty('BRL');
        expect(response.data.data.bpi.BRL).toHaveProperty('rate_float');
        expect(typeof response.data.data.bpi.BRL.rate_float).toBe('number');
      });

      it('has BTC value in USD', () => {
        expect(response.data.data.bpi).toHaveProperty('USD');
        expect(response.data.data.bpi.USD).toHaveProperty('rate_float');
        expect(typeof response.data.data.bpi.USD.rate_float).toBe('number');
      });

      it('has BTC value in CAD', () => {
        expect(response.data.data.bpi).toHaveProperty('CAD');
        expect(response.data.data.bpi.CAD).toHaveProperty('rate_float');
        expect(typeof response.data.data.bpi.CAD.rate_float).toBe('number');
      });
    });
  });
});
