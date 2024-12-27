import Log from 'simpleLogger';
import Handler from './handler.js';
import * as enums from '../../enums/index.js';
import * as errors from '../../errors/index.js';
import type * as types from '../../types/index.js';

export default class Router {
  private readonly _handler: Handler;

  constructor() {
    this._handler = new Handler();
  }

  private get handler(): Handler {
    return this._handler;
  }

  async handleMessage(payload: types.IRabbitMessage): Promise<void> {
    this.logNewMessage(payload);

    switch (payload.target) {
      case enums.EMessageTargets.Profile:
        return this.handler.profileMessage(payload);
      case enums.EMessageTargets.User:
        return this.handler.userMessage(payload);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  private logNewMessage(message: types.IRabbitMessage): void {
    const toLog = { ...structuredClone(message) };

    if ((toLog.payload as Record<string, string>)?.password) {
      (toLog.payload as Record<string, string>).password = '***';
    }

    Log.log('Rabbit', 'Got new message');
    Log.log('Rabbit', toLog);
  }
}
