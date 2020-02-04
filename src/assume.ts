import { Validation } from './Validation';

export function assume(validation: Validation<unknown>): void {
  if (validation.error) {
    throw validation.error;
  }
}
