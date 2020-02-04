import { ValidationEnd } from './Validation';

export function assume(validation: ValidationEnd<unknown>): void {
  if (validation.error) {
    throw validation.error;
  }
}
