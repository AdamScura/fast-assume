export class Validation<T> {
  protected _actual: T;
  protected _actualFunc: () => T;
  protected _error: Error = null;
  protected _not = false;

  public get actual(): T {
    return this._actual;
  }

  public get error(): Error {
    return this._error;
  }

  public constructor(actualFunc: () => T) {
    this._actualFunc = actualFunc;
    this._actual = actualFunc();
  }
}

export class ValidationStart<T> extends Validation<T> {
  public get is(): ValidationMiddle<T> {
    return (this as unknown) as ValidationMiddle<T>;
  }

  public constructor(actualFunc: () => T) {
    super(actualFunc);
  }
}

export class ValidationMiddle<T> extends Validation<T> {
  public satisfiedBy(validationFunc: () => boolean, contextFunc: () => object): ValidationEnd<T> {
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
    return (this as unknown) as ValidationEnd<T>;
  }

  public constructor(actualFunc: () => T) {
    super(actualFunc);
  }

  public get not(): ValidationMiddle<T> {
    this._not = !this._not;
    return (this as unknown) as ValidationMiddle<T>;
  }

  public true(this: ValidationMiddle<boolean>): ValidationEnd<boolean> {
    const actual = this.actual;
    return this.satisfiedBy(
      () => actual === true,
      () => ({
        actual,
      }),
    );
  }

  public equalTo(this: ValidationMiddle<number>, expected: number): ValidationEnd<number> {
    const actual = this.actual;
    return this.satisfiedBy(
      () => actual === expected,
      () => ({
        actual,
        expected,
      }),
    );
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

export class ValidationEnd<T> extends Validation<T> {
  public constructor(actualFunc: () => T) {
    super(actualFunc);
  }

  public foo(): void {}
}
