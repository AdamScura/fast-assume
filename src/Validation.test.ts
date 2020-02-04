import 'mocha';
import { expect } from 'chai';
import { Validation } from './Validation';

describe('Validation', () => {
  describe('constructor', () => {
    it('should accept a number', () => {
      const myValue = 7;
      const result = new Validation(() => myValue);
      expect(result.actual).to.equal(myValue);
    });
    it('should accept a string', () => {
      const myValue = 'hello';
      const result = new Validation(() => myValue);
      expect(result.actual).to.equal(myValue);
    });
    it('should accept an array', () => {
      const myValue = [1, 2, 3];
      const result = new Validation(() => myValue);
      expect(result.actual).to.deep.equal(myValue);
    });
    it('should accept an object', () => {
      const myValue = { a: 1, b: 2 };
      const result = new Validation(() => myValue);
      expect(result.actual).to.deep.equal(myValue);
    });
  });
});
