import 'mocha';
import { expect } from 'chai';
import { assume } from './assume';
import { Validation } from './Validation';

describe('assume', () => {
  it('should pass when given a validation with no error', () => {
    const validation = new Validation(() => 3);
    validation.is.equalTo(3);
    expect(() => assume(new Validation(() => true).is.true())).does.not.throw();
  });
  it('should throw when given a validation with an error', () => {
    expect(() => assume(new Validation(() => 0))).does.not.throw();
  });
});
