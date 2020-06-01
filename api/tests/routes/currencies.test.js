const axiosist = require('axiosist');
const app = require('../../server');
const fs = require('fs').promises;

const localCurrencies = '{"BRL":"5200","EUR":"5","CAD":"1.440"}';

describe('POST /currencies', () => {
  const axios = axiosist(app);

  const readFileSpy = jest.spyOn(fs, 'readFile');

  afterAll(() => {
    readFileSpy.mockRestore();
  });

  describe('when dont read the file', () => {
    let response;

    beforeAll(async () => {
      readFileSpy.mockRejectedValueOnce(new Error('Erro ao ler o arquivo'));
      response = await axios.get('/currencies');
    });

    it('return `Erro ao ler o arquivo` error message', () => {
      expect(response.data.message).toBe('Erro ao ler o arquivo');
    });
  });

  describe('when everything is ok', () => {
    let response;

    beforeAll(async () => {
      readFileSpy.mockResolvedValueOnce(localCurrencies);
      response = await axios.get('/currencies');
    });

    it('returns the object in currencies.json', () => {
      expect(JSON.stringify(response.data)).toBe(localCurrencies);
    });
  });
});
