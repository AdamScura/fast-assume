import 'mocha';
import { expect } from 'chai';
import { that } from './that';

describe('that', () => {
  describe('constructor', () => {
    it('should accept a number', () => {
      const myValue = 7;
      const result = that(() => myValue);
      expect(result.actual).to.equal(myValue);
    });
    it('should accept a string', () => {
      const myValue = 'hello';
      const result = that(() => myValue);
      expect(result.actual).to.equal(myValue);
    });
    it('should accept an array', () => {
      const myValue = [1, 2, 3];
      const result = that(() => myValue);
      expect(result.actual).to.deep.equal(myValue);
    });
    it('should accept an object', () => {
      const myValue = { a: 1, b: 2 };
      const result = that(() => myValue);
      expect(result.actual).to.deep.equal(myValue);
    });
  });
});
