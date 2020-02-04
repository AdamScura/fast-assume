import { ValidationStart } from './Validation';

export function that<T>(valueFunc: () => T): ValidationStart<T> {
  return new ValidationStart(valueFunc);
}
