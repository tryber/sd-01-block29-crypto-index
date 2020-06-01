const fs = require('fs').promises;
const localCurrencies = require('../currencies.json');

const readFileSpy = jest.spyOn(fs, 'readFile');

describe('read the json files', () => {

  afterAll(() => {
    readFileSpy.mockRestore();
  });

  describe('when everything is ok', () => {

    beforeAll(async () => {
      readFileSpy.mockResolvedValueOnce(localCurrencies);
    });

    it('returns the object in currencies.json', () => {
      expect(localCurrencies).toBe(localCurrencies);
    });
  });
});
