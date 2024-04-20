import AddBasicPartyDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddBasicPartyDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Party> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddBasicPartyDto): Promise<string> {
    const payload = new AddBasicPartyDto(data);
    return this.rooster.addDefault(payload);
  }
}
