import { Validation } from './Validation';

export function that<T>(valueFunc: () => T): Validation<T> {
  return new Validation(valueFunc);
}
