import Log from 'simpleLogger';
import Broker from './connections/broker/index.js';
import Mongo from './connections/mongo/index.js';
import Bootstrap from './tools/bootstrap.js';
import Liveness from './tools/liveness.js';
import State from './tools/state.js';
import type { IFullError } from './types/index.js';

class App {
  private _liveness: Liveness | undefined;

  private get liveness(): Liveness | undefined {
    return this._liveness;
  }

  private set liveness(val: Liveness | undefined) {
    this._liveness = val;
  }

  init(): void {
    this.handleInit().catch((err) => {
      const { stack, message } = err as IFullError | Error;
      Log.error('Server', 'Err while initializing app', message, stack);

      this.close();
    });
  }

  private close(): void {
    State.kill();

    this.liveness?.close();
  }

  private configLogger(): void {
    Log.setPrefix('monsters');
  }

  @Log.decorateTime('App init')
  private async handleInit(): Promise<void> {
    this.configLogger();

    const mongo = new Mongo();
    const controllers = new Bootstrap();
    const broker = new Broker();

    State.broker = broker;
    State.controllers = controllers;
    State.mongo = mongo;

    State.controllers.init();

    await broker.init();
    await mongo.init();

    Log.log('Server', 'Server started');

    this.liveness = new Liveness();
    this.liveness.init();
    this.listenForSignals();
  }

  private listenForSignals(): void {
    process.on('SIGTERM', () => {
      Log.log('Server', 'Received signal SIGTERM. Gracefully closing');
      this.close();
    });
    process.on('SIGINT', () => {
      Log.log('Server', 'Received signal SIGINT. Gracefully closing');
      this.close();
    });
  }
}

const app = new App();
app.init();
