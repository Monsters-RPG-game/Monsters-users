import type * as types from './';
import type * as enums from '../enums';

export interface IRabbitMessage {
  user: types.ILocalUser;
  target: enums.EMessageTargets | enums.EMessageTypes;
  subTarget:
    | enums.EUserTargets
    | enums.EProfileTargets
    | enums.ESharedTargets
    | enums.EItemsTargets
    | enums.ELogTargets
    | enums.ECharacterStateTargets
    | enums.EPartyTargets;
  payload: unknown;
}
