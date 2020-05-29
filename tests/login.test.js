const axiosist = require('axiosist');
const app = require('../api/server');

jest.setTimeout(10000);

describe('POST /login', () => {
  const axios = axiosist(app);

  describe('when required data is missing', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', {});
    });

    it('returns a 400 HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `missing fields` error message', () => {
      expect(response.data.message).toBe('Campos inválidos');
    });
  });

  describe('when email is invalid', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', { email: 'asdasdas', password: '123456' });
    });

    it('returns 400 a HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `invalid email`', () => {
      expect(response.data.message).toBe('Campos inválidos');
    });
  });

  describe('when everything is ok', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', { email: 'guiiluiz44@gmail.com', password: '123456' });
    });

    it('returns a 200 HTTP status code', () => {
      expect(response.status).toBe(200);
    });

    describe('returns a valid token', () => {
      it('has 16 characters', () => {
        expect(response.data).toHaveLength(16);
      });

      it('is made of numbers and letters', () => {
        expect(/^[0-9a-z]+$/ig.test(response.data)).toBe(true);
      });
    });
  });
});
