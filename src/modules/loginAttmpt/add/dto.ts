import { ELoginOutput } from '../../../enums';
import Validation from '../../../tools/validation';
import type { IAddLoginAttemptDto } from './types';

export default class AddLoginAttemptDto implements IAddLoginAttemptDto {
  login: string;
  ip: string;
  output: ELoginOutput;

  constructor(data: IAddLoginAttemptDto) {
    this.login = data.login;
    this.ip = data.ip;
    this.output = data.output;

    this.validate();
  }

  validate(): void {
    new Validation(this.login, 'login').isDefined().isString();
    new Validation(this.ip, 'ip').isDefined().isString();
    new Validation(this.output, 'output').isDefined().isString().isPartOfEnum(ELoginOutput);
  }
}
