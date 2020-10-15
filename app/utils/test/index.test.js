const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));

const send = require('../response');

describe('Utils', () => {
  describe('Create reponse', () => {
    it('should return formated response', async () => {
      const result = send({}, 200);
      expect(result.statusCode).to.equal(200);
      expect(typeof result.body).to.equal('string');
    });
  });
});
