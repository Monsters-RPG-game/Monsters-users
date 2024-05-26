import type { EModules } from './enums';
import type { IAddBugReport } from '../../modules/bugReport/add/types';
import type { IBugReportEntity } from '../../modules/bugReport/entity';
import type BugReportGet from '../../modules/bugReport/get';
import type BugReportRooster from '../../modules/bugReport/rooster';
import type { IAddItemDto } from '../../modules/inventory/addBasic/types';
import type { IInventoryEntity } from '../../modules/inventory/entity';
import type InventoryGet from '../../modules/inventory/get';
import type InventoryRooster from '../../modules/inventory/rooster';
import type { IAddLoginAttempt } from '../../modules/loginAttmpt/add/types';
import type { ILoginAttemptEntity } from '../../modules/loginAttmpt/entity';
import type LoginAttemptGet from '../../modules/loginAttmpt/get';
import type LoginAttemptRooster from '../../modules/loginAttmpt/rooster';
import type { IAddNpcDto } from '../../modules/npc/add/types';
import type { ICharacterEntity } from '../../modules/npc/entity';
import type NpcGet from '../../modules/npc/get';
import type NpcRooster from '../../modules/npc/rooster';
import type { IAddPartyDto } from '../../modules/party/add/types';
import type { IPartyEntity } from '../../modules/party/entity';
import type PartyGet from '../../modules/party/get';
import type PartyRooster from '../../modules/party/rooster';
import type { IAddProfileDto } from '../../modules/profile/add/types';
import type { IProfileEntity } from '../../modules/profile/entity';
import type ProfileGet from '../../modules/profile/get';
import type ProfileRooster from '../../modules/profile/rooster';
import type { IAddStatsDto } from '../../modules/stats/add/types';
import type { IStatsEntity } from '../../modules/stats/entity';
import type StatsGet from '../../modules/stats/get';
import type StatsRooster from '../../modules/stats/rooster';
import type { IUserEntity } from '../../modules/user/entity';
import type UserGet from '../../modules/user/get';
import type { IRegisterDto } from '../../modules/user/register/types';
import type UserRooster from '../../modules/user/rooster';

export interface IModulesGetControllers {
  [EModules.Npc]: NpcGet;
  [EModules.Stats]: StatsGet;
  [EModules.Users]: UserGet;
  [EModules.Party]: PartyGet;
  [EModules.Profiles]: ProfileGet;
  [EModules.Inventory]: InventoryGet;
  [EModules.BugReport]: BugReportGet;
  [EModules.LoginAttempt]: LoginAttemptGet;
}

export interface IModulesControllers {
  [EModules.Npc]: NpcRooster;
  [EModules.Users]: UserRooster;
  [EModules.Stats]: StatsRooster;
  [EModules.Profiles]: ProfileRooster;
  [EModules.Inventory]: InventoryRooster;
  [EModules.Party]: PartyRooster;
  [EModules.BugReport]: BugReportRooster;
  [EModules.LoginAttempt]: LoginAttemptRooster;
}

export interface IRoosterAddData {
  [EModules.Npc]: IAddNpcDto;
  [EModules.Users]: IRegisterDto;
  [EModules.Stats]: IAddStatsDto;
  [EModules.Profiles]: IAddProfileDto;
  [EModules.Inventory]: IAddItemDto;
  [EModules.Party]: IAddPartyDto;
  [EModules.BugReport]: IAddBugReport;
  [EModules.LoginAttempt]: IAddLoginAttempt;
}

export interface IRoosterAddDefaultData {
  [EModules.Npc]: Partial<ICharacterEntity>;
  [EModules.Users]: Partial<IUserEntity>;
  [EModules.Stats]: Partial<IStatsEntity>;
  [EModules.Profiles]: Partial<IProfileEntity>;
  [EModules.Inventory]: Partial<IInventoryEntity>;
  [EModules.Party]: Partial<IPartyEntity>;
  [EModules.BugReport]: Partial<IBugReportEntity>;
  [EModules.LoginAttempt]: Partial<ILoginAttemptEntity>;
}

export interface IRoosterUpdate extends IRoosterAddDefaultData {
  [EModules.Stats]: Partial<IStatsEntity>;
}

export interface IRoosterGetData {
  [EModules.Npc]: ICharacterEntity | null;
  [EModules.Users]: IUserEntity | null;
  [EModules.Stats]: IStatsEntity | null;
  [EModules.Profiles]: IProfileEntity | null;
  [EModules.Inventory]: IInventoryEntity | null;
  [EModules.Party]: IPartyEntity | null;
  [EModules.BugReport]: IBugReportEntity | null;
  [EModules.LoginAttempt]: ILoginAttemptEntity | null;
}

export interface IRoosterFactory<Z extends EModules> {
  add(data: IRoosterAddData[Z]): Promise<string>;

  get(data: unknown): Promise<IRoosterGetData[Z]>;
}
