import 'mocha';
import { expect } from 'chai';
import { hello } from './index';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = hello();
    expect(result).to.equal('Hello World!');
  });
});
