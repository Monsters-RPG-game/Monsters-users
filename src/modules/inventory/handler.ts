import Controller from './controller';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IDropItemDto, IUseItemDto } from './dto';
import type { IInventoryEntity } from './entity';
import type { EModules } from '../../tools/abstract/enums';
import type { ILocalUser } from '../../types';

export default class Handler extends HandlerFactory<EModules.Inventory> {
  constructor() {
    super(new Controller());
  }

  async get(user: ILocalUser): Promise<void> {
    const items = await this.controller.get(user.userId!);
    return State.Broker.send(user.tempId, items, enums.EMessageTypes.Send);
  }

  async useItem(payload: unknown, user: ILocalUser): Promise<void> {
    await this.controller.use(payload as IUseItemDto, user.userId!);
    return State.Broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async dropItem(payload: unknown, user: ILocalUser): Promise<void> {
    await this.controller.drop(payload as IDropItemDto, user.userId!);
    return State.Broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async addBasic(userId: string): Promise<IInventoryEntity> {
    return this.controller.addBasicInventory(userId);
  }
}
