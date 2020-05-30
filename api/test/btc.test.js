const nock = require('nock');
const axiosist = require('axiosist');
const app = require('../server');
const {
  validEmail,
  success,
  validData,
  invalidDataCurrency,
  invalidDataValue,
} = require('./fixtures');

jest.setTimeout(100000);

const fs = require('fs').promises;

fs.readFile = jest.fn().mockResolvedValue(
  JSON.stringify({
    BRL: '5.400',
    EUR: '0.920',
    CAD: '1.440',
  }),
);

fs.writeFile = jest.fn().mockReturnValue(Promise.resolve());

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
        .post('/login', validEmail)
        .then(({ data }) => data.token);

        
      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/v1/bpi/currentprice.json')
        .once()
        .reply(500, 'error 503');

      response = await axios.get('/crypto/btc', {
        headers: {
          Authorization: token,
        },
      });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('returns a 500 HTTP status code', () => {
      expect(response.status).toBe(500);
    });

    // it('returns a `coinbase service not available` message', () => {
    //   expect(response.data.message).toBe('error 503');
    // });
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
        .delayConnection(20)
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
      expect(response.data.message).toBe('coinbase service not available');
    });
  });

  describe('when coinbase API is online', () => {
    let response;

    beforeAll(async () => {
      const token = await axios
        .post('/login', validEmail)
        .then(({ data }) => data.token);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/v1/bpi/currentprice.json')
        .reply(200, success);

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

describe('POST /crypto/btc', () => {
  const axios = axiosist(app);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('Request of post api', () => {
    let response;

    beforeAll(async () => {
      const token = await axios
        .post('/login', validEmail)
        .then(({ data }) => data.token);

      response = await axios.post('/crypto/btc', validData, {
        headers: {
          Authorization: token,
        },
      });
    });

    afterAll(() => {
      process.env.COINBASE_API_TIMEOUT = originalCoinbaseTimeout;
    });

    it('if request ok', () => {
      expect(response.status).toBe(200);
    });

    it('returns a `Valor alterado com sucesso!` message', () => {
      expect(response.data.message).toBe('Valor alterado com sucesso!');
    });
  });

  describe('if request false Moeda inválida', () => {
    let response;

    beforeAll(async () => {
      const token = await axios
        .post('/login', validEmail)
        .then(({ data }) => data.token);

      // nock('https://api.coindesk.com')
      //   .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      //   .get('/v1/bpi/currentprice.json')
      //   .reply(200, success);

      response = await axios.post('/crypto/btc', invalidDataCurrency, {
        headers: { Authorization: token },
      });
    });

    it('if currency error', () => {
      expect(response.status).toBe(400);
    });

    it('returns `Moeda inválida`', () => {
      expect(response.data.message).toBe('Moeda inválida');
    });

    describe('if request false', () => {
      let response;

      beforeAll(async () => {
        const token = await axios
          .post('/login', validEmail)
          .then(({ data }) => data.token);

        // nock('https://api.coindesk.com')
        //   .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        //   .get('/v1/bpi/currentprice.json')
        //   .reply(200, success);

        response = await axios.post('/crypto/btc', invalidDataValue, {
          headers: { Authorization: token },
        });
      });

      it('if data error', () => {
        expect(response.status).toBe(400);
      });

      it('returns `invalidDataValue`', () => {
        expect(response.data.message).toBe('Valor inválido');
      });
    });
  });
});
