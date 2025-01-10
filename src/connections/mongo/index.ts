import mongoose from 'mongoose';
import Log from 'simpleLogger';
import getConfig from '../../tools/configLoader.js';
import type { ConnectOptions } from 'mongoose';

export default class Mongo {
  async init(): Promise<void> {
    process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testDev'
      ? await this.startMockServer()
      : await this.startServer();
  }

  disconnect(): void {
    mongoose.disconnect().catch((err) => {
      Log.error('Mongo', 'Cannot disconnect', (err as Error).message);
    });
  }

  private async startMockServer(): Promise<void> {
    const MockServer = await import('./mock.js');
    const mock = new MockServer.default();
    await mock.init();
  }

  private async startServer(): Promise<void> {
    await mongoose.connect(getConfig().mongoURL, {
      dbName: 'Users',
      serverSelectionTimeoutMS: 5000,
    } as ConnectOptions);

    Log.log('Mongo', 'Started server');
  }
}
