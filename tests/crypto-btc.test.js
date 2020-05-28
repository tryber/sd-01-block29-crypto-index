const nock = require('nock');
const axiosist = require('axiosist');
const app = require('../api/server');

const res = {
  time: {
    updated: 'May 28, 2020 20:07:00 UTC',
    updatedISO: '2020-05-28T20:07:00+00:00',
    updateduk: 'May 28, 2020 at 21:07 BST'
  },
  disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
  bpi: {
    USD: {
      code: 'USD',
      rate: '9,460.0896',
      description: 'United States Dollar',
      rate_float: 9460.0896
    },
    BTC: {
      code: 'BTC',
      rate: '1.0000',
      description: 'Bitcoin',
      rate_float: 1
    }
  }
};

jest.setTimeout(10000);

describe('GET /crypto/btc', () => {
  const axios = axiosist(app);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('when token is invalid', () => {
    let response;

    beforeAll(async () => {
      response = await axios.get('/crypto/btc', { headers: { Authorization: '123313' } });
    });

    it('returns a 401 HTTP status code', () => {
      expect(response.status).toBe(401);
    });

    it('returns a `Token inválido` message', () => {
      expect(response.data.message).toBe('Token inválido');
    });
  });

  describe('when coinbase API is offline', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', { email: 'guiiluiz44@gmail.com', password: '123456' })
        .then(({ data }) => data);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/v1/bpi/currentprice/BTC.json')
        .delayConnection(3200)
        .reply(200, {});

      response = await axios.get('/crypto/btc', { headers: { Authorization: token } });
    });

    it('returns a 503 HTTP status code', () => {
      expect(response.status).toBe(503);
    });

    it('returns a `coinbase service not available` message', () => {
      expect(response.data.message).toBe('coinbase service not available');
    });
  });

  describe('throwing error', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', { email: 'guiiluiz44@gmail.com', password: '123456' })
        .then(({ data }) => data);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/v1/bpi/currentprice/BTC.json')
        .reply(505, { message: 'AWFUL ERROR' })

      response = await axios.get('/crypto/btc', { headers: { Authorization: token } });
    });

    it('returns a 500 HTTP status code', () => {
      expect(response.status).toBe(500);
    });
  });

  describe('when coinbase API is online', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', { email: 'guiiluiz44@gmail.com', password: '123456' })
        .then(({ data }) => data);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/v1/bpi/currentprice/BTC.json')
        .reply(200, res);

      response = await axios.get('/crypto/btc', { headers: { Authorization: token } });
    });

    it('returns a 200 HTTP status code', () => {
      expect(response.status).toBe(200);
    });

    it('returns an object', () => {
      expect(typeof response.data).toBe('object');
    });

    describe('the object', () => {
      describe('has dollar prices', () => {
        it('has the value in BRL', () => {
          expect(response.data.currencies).toHaveProperty('BRL');
        });

        it('has the value in EUR', () => {
          expect(response.data.currencies).toHaveProperty('EUR');
        });

        it('has the value in CAD', () => {
          expect(response.data.currencies).toHaveProperty('CAD');
        });
      });

      describe('has BTC values', () => {
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
});

describe('POST /crypto/btc', () => {
  const axios = axiosist(app);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('when token is invalid', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/crypto/btc', { currency: 'BRL', value: 10 }, { headers: { Authorization: '123313' } });
    });

    it('returns a 401 HTTP status code', () => {
      expect(response.status).toBe(401);
    });

    it('returns a `Token inválido` message', () => {
      expect(response.data.message).toBe('Token inválido');
    });
  });

  describe('when currency is invalid', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', { email: 'guiiluiz44@gmail.com', password: '123456' })
        .then(({ data }) => data);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/v1/bpi/currentprice/BTC.json')
        .reply(200, res);

        response = await axios.post('/crypto/btc', { currency: 'USA', value: 10 }, { headers: { Authorization: token } });
    });

    it('returns a 400 HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `Moeda inválida` message', () => {
      expect(response.data.message).toBe('Moeda inválida');
    });
  });

  describe('when value is invalid', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', { email: 'guiiluiz44@gmail.com', password: '123456' })
        .then(({ data }) => data);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/v1/bpi/currentprice/BTC.json')
        .reply(200, res);

        response = await axios.post('/crypto/btc', { currency: 'BRL', value: '0' }, { headers: { Authorization: token } });
    });

    it('returns a 400 HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `Valor inválido` message', () => {
      expect(response.data.message).toBe('Valor inválido');
    });
  });

  describe('when everything is ok', () => {
    let response;

    beforeAll(async () => {
      const token = await axios.post('/login', { email: 'guiiluiz44@gmail.com', password: '123456' })
        .then(({ data }) => data);

      nock('https://api.coindesk.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/v1/bpi/currentprice/BTC.json')
        .reply(200, res);

        response = await axios.post('/crypto/btc', { currency: 'BRL', value: 10 }, { headers: { Authorization: token } });
    });

    it('returns a 200 HTTP status code', () => {
      expect(response.status).toBe(200);
    });

    it('returns a `Valor alterado com sucesso!` message', () => {
      expect(response.data.message).toBe('Valor alterado com sucesso!');
    });
  });
});
