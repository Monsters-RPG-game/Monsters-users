import * as enums from '../../enums';
import RemoveUserDto from '../../modules/user/remove/dto';
import State from '../../tools/state';
import type InventoryController from '../../modules/inventory/handler';
import type PartyController from '../../modules/party/handler';
import type ProfileController from '../../modules/profile/handler';
import type UserController from '../../modules/user/handler';
import type { IRegisterDto } from '../../modules/user/register/types';
import type { IRemoveUserDto } from '../../modules/user/remove/types';
import type { ILocalUser } from '../../types';

export default class Controller {
  private readonly _user: UserController;
  private readonly _profile: ProfileController;
  private readonly _inventory: InventoryController;
  private readonly _party: PartyController;

  constructor(
    user: UserController,
    profile: ProfileController,
    inventory: InventoryController,
    party: PartyController,
  ) {
    this._user = user;
    this._profile = profile;
    this._inventory = inventory;
    this._party = party;
  }

  private get user(): UserController {
    return this._user;
  }

  private get profile(): ProfileController {
    return this._profile;
  }

  private get party(): PartyController {
    return this._party;
  }

  private get inventory(): InventoryController {
    return this._inventory;
  }

  async removeUser(payload: unknown, user: ILocalUser): Promise<void> {
    const { password, id } = new RemoveUserDto(payload as IRemoveUserDto, user.userId as string);

    await this.user.remove(password, id);
    await this.profile.remove(id);
    await this.party.remove(id);
    await this.inventory.remove(id);

    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async register(payload: unknown, user: ILocalUser): Promise<void> {
    const id = (await this.user.register(payload as IRegisterDto)).toString();

    const party = await this.party.addBasic(id);
    const inventory = await this.inventory.addBasic(id);
    await this.profile.addBasic(id, party._id.toString(), inventory._id.toString());

    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }
}
