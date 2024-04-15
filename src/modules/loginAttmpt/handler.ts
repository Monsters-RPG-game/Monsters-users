import AddController from './add';
import GetController from './get';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddLoginAttemptDto } from './add/types';
import type { IGetLoginAttemptDto } from './get/types';
import type { EModules } from '../../tools/abstract/enums';
import type { ILocalUser } from '../../types';

export default class UserHandler extends HandlerFactory<EModules.LoginAttempt> {
  private readonly _addController: AddController;

  constructor() {
    super(new GetController());
    this._addController = new AddController();
  }

  private get addController(): AddController {
    return this._addController;
  }

  async get(payload: unknown, user: ILocalUser): Promise<void> {
    const callback = await this.getController.get(payload as IGetLoginAttemptDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async add(payload: unknown, user: ILocalUser): Promise<void> {
    await this.addController.add(payload as IAddLoginAttemptDto);
    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }
}
