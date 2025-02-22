import Log from 'simpl-loggar';
import * as errors from '../../../../errors/index.js';
import type RegisterUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type UserRepository from '../../repository/index.js';

export default class RegisterUserController implements IAbstractSubController<string> {
  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  private accessor repo: UserRepository;

  async execute(data: RegisterUserDto): Promise<string> {
    const { login } = data;
    const byLogin = await this.repo.getByLogin(login);

    if (byLogin) {
      Log.error(
        'Register',
        'Got error that user is already registered using the same username. Either username was somehow faked, or Authorizations service bugged out. THIS IS CRITICAL!',
      );
      throw new errors.InternalError();
    }

    return this.repo.add(data);
  }
}
