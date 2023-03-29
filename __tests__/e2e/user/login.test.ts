import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import type * as types from '../../../src/types';
import * as errors from '../../../src/errors';
import * as enums from '../../../src/enums';
import Controller from '../../../src/modules/user/controller';
import fakeData from '../../utils/fakeData.json';
import FakeFactory from '../../utils/fakeFactory/src';
import type { ILoginDto } from '../../../src/modules/user/dto';

describe('Login', () => {
  const db = new FakeFactory();
  const loginData = fakeData.users[0] as ILoginDto;
  const localUser: types.ILocalUser = {
    userId: undefined,
    tempId: 'tempId',
    validated: true,
    type: enums.EUserTypes.User,
  };
  const controller = new Controller();

  beforeAll(async () => {
    const server = await MongoMemoryServer.create();
    await mongoose.connect(server.getUri());
  });

  afterEach(async () => {
    await db.cleanUp();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing login', () => {
        const clone = structuredClone(loginData);
        clone.login = undefined!;
        controller.login(clone, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentialsError(localUser.tempId));
        });
      });

      it('Missing password', () => {
        const clone = structuredClone(loginData);
        clone.password = undefined!;
        controller.login(clone, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentialsError(localUser.tempId));
        });
      });
    });

    describe('Incorrect data', () => {
      beforeEach(async () => {
        await db.user
          .login(loginData.login)
          .password(loginData.password)
          .email('test@test.test')
          .verified(false)
          .create();
      });

      afterEach(async () => {
        await db.cleanUp();
      });

      it('Login incorrect', () => {
        controller.login({ ...loginData, login: 'a' }, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentialsError(localUser.tempId));
        });
      });

      it('Password incorrect', () => {
        controller.login({ ...loginData, password: 'a' }, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentialsError(localUser.tempId));
        });
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      await db.user
        .login(loginData.login)
        .password(loginData.password)
        .email('test@test.test')
        .verified(false)
        .create();

      const { userId, refreshToken, accessToken } = await controller.login(loginData, localUser);
      expect(userId).not.toBeUndefined();
      expect(userId.length).not.toBeLessThan(10);
      expect(refreshToken).not.toBeUndefined();
      expect(refreshToken.length).not.toBeLessThan(20);
      expect(accessToken).not.toBeUndefined();
      expect(accessToken.length).not.toBeLessThan(20);
    });
  });
});
