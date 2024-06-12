export enum EMessageTypes {
  Error = 'error',
  Credentials = 'credentials',
  Send = 'send',
  Heartbeat = 'heartbeat',
}

export enum ERabbit {
  RetryLimit = 10,
}

export enum EServices {
  Gateway = 'gateway',
  Users = 'users',
}

export enum EAmqQueues {
  Gateway = 'gatewayQueue',
  Users = 'usersQueue',
}

export enum EMessageTargets {
  User = 'user',
  Stats = 'stats',
  Npc = 'npc',
  Party = 'party',
  Profile = 'profile',
  Inventory = 'inventory',
  BugReport = 'bugReport',
  CharacterState = 'characterState',
  Skills = 'skills',
  SingleSkill = 'singleSkill',
}
