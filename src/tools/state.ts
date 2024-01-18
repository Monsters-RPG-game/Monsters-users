import type Broker from '../connections/broker';
import type Mongo from '../connections/mongo';
import type Redis from '../connections/redis';
import type { IState } from '../types';

class State implements IState {
  private _broker: Broker | null = null;

  get broker(): Broker {
    return this._broker!;
  }

  set broker(value: Broker) {
    this._broker = value;
  }

  private _redis: Redis | null = null;

  get redis(): Redis {
    return this._redis!;
  }

  set redis(value: Redis) {
    this._redis = value;
  }

  private _mongo: Mongo | null = null;

  get mongo(): Mongo {
    return this._mongo!;
  }

  set mongo(value: Mongo) {
    this._mongo = value;
  }
}

export default new State();
