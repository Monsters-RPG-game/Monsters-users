import AddBasicController from './addBasic';
import DropController from './drop';
import GetController from './get';
import RemoveController from './remove';
import UseController from './use';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddBasicInventoryDto } from './addBasic/types';
import type { IDropItemDto } from './drop/types';
import type { IGetInventoryDto } from './get/types';
import type { IRemoveInventoryDto } from './remove/types';
import type { IUseItemDto } from './use/types';
import type { EModules } from '../../tools/abstract/enums';
import type { ILocalUser } from '../../types';

export default class Handler extends HandlerFactory<EModules.Inventory> {
  private readonly _addBasicController: AddBasicController;
  private readonly _dropController: DropController;
  private readonly _useController: UseController;
  private readonly _removeController: RemoveController;

  constructor() {
    super(new GetController());
    this._addBasicController = new AddBasicController();
    this._dropController = new DropController();
    this._useController = new UseController();
    this._removeController = new RemoveController();
  }

  private get addBasicController(): AddBasicController {
    return this._addBasicController;
  }

  private get useController(): UseController {
    return this._useController;
  }

  private get removeController(): RemoveController {
    return this._removeController;
  }

  private get dropController(): DropController {
    return this._dropController;
  }

  async get(user: ILocalUser): Promise<void> {
    const callback = await this.getController.get({ userId: user.userId! } as IGetInventoryDto);
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async useItem(payload: unknown, user: ILocalUser): Promise<void> {
    await this.useController.use(payload as IUseItemDto, user.userId!);
    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async dropItem(payload: unknown, user: ILocalUser): Promise<void> {
    await this.dropController.drop(payload as IDropItemDto, user.userId!);
    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async addBasic(userId: string): Promise<string> {
    return this.addBasicController.add({ userId } as IAddBasicInventoryDto);
  }

  async remove(owner: string): Promise<void> {
    await this.removeController.remove({ owner } as IRemoveInventoryDto);
  }
}
