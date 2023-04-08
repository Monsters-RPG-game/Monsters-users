// eslint-disable-next-line max-classes-per-file
export class FullError extends Error {
  code = '000';
  status = 500;
}

export class MissingProcessPlatformError extends FullError {
  constructor() {
    super('MissingProcessPlatformError');
    this.message = 'process.platform is missing';
    this.name = 'MissingProcessPlatformError';
    this.code = '001';
    this.status = 500;
  }
}

export class MissingArgError extends FullError {
  constructor(param: string) {
    super('MissingArgError');
    this.message = `Missing param: ${param}`;
    this.name = 'MissingArgError';
    this.code = '002';
    this.status = 400;
  }
}

export class IncorrectArgError extends FullError {
  constructor(err: string) {
    super('IncorrectArgError');
    this.message = err;
    this.name = 'IncorrectArgError';
    this.code = '003';
    this.status = 400;
  }
}

export class IncorrectArgTypeError extends FullError {
  constructor(err: string) {
    super('IncorrectArgTypeError');
    this.message = err;
    this.name = 'IncorrectArgTypeError';
    this.code = '004';
    this.status = 400;
  }
}

export class IncorrectCredentialsError extends FullError {
  constructor(message?: string) {
    super('IncorrectCredentialsError');
    this.message = message ?? 'Incorrect credentials';
    this.name = 'IncorrectCredentialsError';
    this.code = '005';
    this.status = 400;
  }
}

export class UserAlreadyRegisteredError extends FullError {
  constructor() {
    super('UserAlreadyRegisteredError');
    this.message = 'Email already registered';
    this.name = 'UserAlreadyRegisteredError';
    this.code = '006';
    this.status = 400;
  }
}

export class UsernameAlreadyInUseError extends FullError {
  constructor() {
    super('UsernameAlreadyInUseError');
    this.message = 'Selected username is already in use';
    this.name = 'UsernameAlreadyInUseError';
    this.code = '007';
    this.status = 400;
  }
}

export class ProfileAlreadyExistsError extends FullError {
  constructor() {
    super('ProfileAlreadyExistsError');
    this.message = 'Profile already exists';
    this.name = 'ProfileAlreadyExistsError';
    this.code = '008';
    this.status = 400;
  }
}

export class IncorrectArgLengthError extends FullError {
  constructor(target: string, min: number | undefined, max: number) {
    super('IncorrectArgLengthError');
    this.message =
      min === undefined
        ? `Elm ${target} should be less than ${max} characters`
        : min !== max
        ? `Elm ${target} should be more than ${min} and less than ${max} characters`
        : `Elm ${target} should be ${min} characters`;
    this.name = 'IncorrectArgLengthError';
    this.code = '009';
    this.status = 400;
  }
}

export class IncorrectTargetError extends FullError {
  constructor() {
    super('IncorrectTargetError');
    this.message = 'Incorrect data target';
    this.code = '010';
    this.status = 400;
  }
}

export class NotConnectedError extends FullError {
  constructor() {
    super('NotConnectedError');
    this.message = 'Rabbit is not connected';
    this.code = '011';
    this.status = 500;
  }
}
