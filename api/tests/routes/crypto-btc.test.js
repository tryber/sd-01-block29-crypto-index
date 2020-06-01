const nock = require('nock');
const axiosist = require('axiosist');
const fs = require('fs').promises;
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

  describe('when coinbase API returns an error', () => {
    let response;

    beforeAll(async () => {
      const token = await axios
        .post('/login', loginFixtures.validLogin)
        .then(({ data }) => data.token);


      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/v1/bpi/currentprice/BTC.json')
        .once()
        .reply(500, 'error 500');

      response = await axios.get('/crypto/btc', { headers: { Authorization: token },
      });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('returns a 500 HTTP status code', () => {
      expect(response.status).toBe(500);
    });

  });

  describe('when coinbase is offline', () => {
    let response;

    beforeAll(async () => {
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

    beforeAll(async () => {
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

describe('POST /crypto/btc', () => {
  const axios = axiosist(app);

  const readFileSpy = jest.spyOn(fs, 'writeFile');

  afterEach(() => {
    nock.cleanAll();
  });

  describe('when token is invalid', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/crypto/btc', { currency: 'BRL', value: 10 }, { headers: { Authorization: 9875 } });
    });

    it('returns a 401 HTTP status code', () => {
      expect(response.status).toBe(401);
    });

    it('returns a `Token Inválido` error message.', () => {
      expect(response.data.message).toBe('Token Inválido');
    });
  });

  describe('when currency is invalid', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', loginFixtures.validLogin)
        .then(({ data }) => data.token);

      response = await axios.post('/crypto/btc', { currency: 'BL', value: 10 }, { headers: { Authorization: token } });
    });

    it('returns a 400 HTTP error', () => {
      expect(response.status).toBe(400);
    });

    it('returns `Moeda Inválida` error message', () => {
      expect(response.data.message).toBe('Moeda Inválida');
    });
  });

  describe('when value is invalid', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', loginFixtures.validLogin)
        .then(({ data }) => data.token);

      response = await axios.post('/crypto/btc', { currency: 'BRL', value: -10 }, { headers: { Authorization: token } });
    });

    it('return a 400 HTTP error', () => {
      expect(response.status).toBe(400);
    });

    it('return `Valor Inválido` error message', () => {
      expect(response.data.message).toBe('Valor Inválido');
    });
  });

  describe('when dont read the file', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', loginFixtures.validLogin)
        .then(({ data }) => data.token);

      readFileSpy.mockRejectedValueOnce(new Error('Algo deu errado!'));

      response = await axios.post('/crypto/btc', { currency: 'BRL', value: 1000 }, { headers: { Authorization: token } });
    });

    it('return `Erro ao ler o arquivo` error message', () => {
      expect(response.data.message).toBe('Algo deu errado!');
    });
  });

  describe('when everything is ok', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', loginFixtures.validLogin)
        .then(({ data }) => data.token);

      response = await axios.post('/crypto/btc', { currency: 'BRL', value: 5200 }, { headers: { Authorization: token } });
    });

    it('returns 200', () => {
      expect(response.status).toBe(200);
    });

    it('return a `Valor alterado com sucesso!` message', () => {
      expect(response.data.message).toBe('Valor alterado com sucesso!');
    });
  });
});
