export class Validation<T> {
  private _actual: T;
  private _actualFunc: () => T;
  private _error: Error = null;
  private _not = false;

  public get actual(): T {
    return this._actual;
  }

  public get error(): Error {
    return this._error;
  }

  public get is(): Validation<T> {
    return this;
  }

  public get not(): Validation<T> {
    this._not = !this._not;
    return this;
  }

  public satisfies(validationFunc: () => boolean, contextFunc: () => object): Validation<T> {
    const result = validationFunc();
    const failed = this._not ? result : !result;
    if (failed) {
      const messageParts = [];
      const name = this.getFuncBody(this._actualFunc);
      messageParts.push(`Failed validation on "${name}"`);
      const operationBody = this.getFuncBody(validationFunc);
      const operation = this._not ? `!(${operationBody})` : operationBody;
      messageParts.push(`  operation: ${operation}`);
      const context = contextFunc();
      messageParts.concat(
        Array.from(Object.keys(context)).forEach(key => {
          const value = context[key].toString();
          messageParts.push(`  ${key}: ${value}`);
        }),
      );
      const message = messageParts.join('\n');
      this._error = new Error(message);
    }
    return this;
  }

  public constructor(actualFunc: () => T) {
    this._actualFunc = actualFunc;
    this._actual = actualFunc();
  }

  private getFuncBody(func: () => unknown): string {
    const match = func
      .toString()
      .trim()
      .match(/^(\(\)\s*=>\s*)(.*)/);
    if (match && match.length === 3) {
      return match[2];
    }
  }
}

export interface Validation<T> {
  is: Validation<T>;
  true(this: Validation<boolean>): Validation<boolean>;
  equalTo(this: Validation<number>, expected: number): Validation<number>;
}

Validation.prototype.true = function(): Validation<boolean> {
  const actual = this.actual;
  return this.satisfies(
    () => actual === true,
    () => ({
      actual,
    }),
  );
};

Validation.prototype.equalTo = function(expected: number): Validation<number> {
  const actual = this.actual;
  return this.satisfies(
    () => actual === expected,
    () => ({
      actual,
      expected,
    }),
  );
};
