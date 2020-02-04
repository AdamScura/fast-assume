import 'mocha';
import { expect } from 'chai';
import { assume, that } from '.';

describe('assume', () => {
  describe('equalTo', () => {
    it('should throw on failure', () => {
      const myValue = 7;
      assume(that(() => myValue).is.equalTo(9));
      expect(true).is.true;
    });
  });
});
