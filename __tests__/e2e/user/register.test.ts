import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as types from '../../../src/types';
import * as errors from '../../../src/errors';
import * as enums from '../../../src/enums';
import Controller from '../../../src/modules/user/controller';
import fakeData from '../../utils/fakeData.json';
import FakeFactory from '../../utils/fakeFactory/src';

describe('Register', () => {
  const db = new FakeFactory();
  const registerData: types.IRegisterReq = fakeData.users[0];
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
      it(`Missing login`, () => {
        const clone = structuredClone(registerData);
        delete clone.login;
        controller.register(clone, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentials(localUser.tempId, 'login missing'));
        });
      });

      it(`Missing password`, () => {
        const clone = structuredClone(registerData);
        delete clone.password;
        controller.register(clone, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentials(localUser.tempId, 'password missing'));
        });
      });

      it(`Missing password2`, () => {
        const clone = structuredClone(registerData);
        delete clone.password2;
        controller.register(clone, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentials(localUser.tempId, 'password2 missing'));
        });
      });

      it(`Missing email`, () => {
        const clone = structuredClone(registerData);
        delete clone.email;
        controller.register(clone, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentials(localUser.tempId, 'email missing'));
        });
      });
    });

    describe('Incorrect data', () => {
      beforeEach(async () => {
        await db.user
          .login(registerData.login)
          .password(registerData.password)
          .email(registerData.email)
          .verified(false)
          .create();
      });

      it(`Already registered`, () => {
        controller.register(registerData, localUser).catch((err) => {
          expect(err).toEqual(new errors.UsernameAlreadyInUse(localUser.tempId));
        });
      });

      it(`Login incorrect`, () => {
        controller
          .register(
            {
              ...registerData,
              login: '!@#$%^&*&*()_+P{:"<?a',
              email: 'email@email.email',
            },
            localUser,
          )
          .catch((err) => {
            expect(err).toEqual(
              new errors.IncorrectCredentials(
                localUser.tempId,
                'login should only contain arabic letters, numbers and special characters',
              ),
            );
          });
      });

      it(`Login too short`, () => {
        controller.register({ ...registerData, login: 'a' }, localUser).catch((err) => {
          expect(err).toEqual(
            new errors.IncorrectCredentials(localUser.tempId, 'login should be at least 3 characters'),
          );
        });
      });

      it(`Login too long`, () => {
        controller
          .register(
            {
              ...registerData,
              login:
                'asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
            },
            localUser,
          )
          .catch((err) => {
            expect(err).toEqual(
              new errors.IncorrectCredentials(localUser.tempId, 'login should be less than 30 characters'),
            );
          });
      });

      it(`Password incorrect`, () => {
        controller.register({ ...registerData, password: 'a@$QEWASD+)}KO_PL{:">?' }, localUser).catch((err) => {
          expect(err).toEqual(
            new errors.IncorrectCredentials(
              localUser.tempId,
              'password should contain at least 1 digit, 6 letter, 1 upper case letter and 1 lower case letter',
            ),
          );
        });
      });

      it(`Password too short`, () => {
        controller.register({ ...registerData, password: 'a' }, localUser).catch((err) => {
          expect(err).toEqual(
            new errors.IncorrectCredentials(localUser.tempId, 'password should be at least 6 characters long'),
          );
        });
      });

      it(`Password too long`, () => {
        controller
          .register(
            {
              ...registerData,
              password:
                'aasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsad',
            },
            localUser,
          )
          .catch((err) => {
            expect(err).toEqual(
              new errors.IncorrectCredentials(localUser.tempId, 'password should be less than 200 characters'),
            );
          });
      });

      it(`Passwords do not match`, () => {
        controller.register({ ...registerData, password2: 'a' }, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentials(localUser.tempId, 'Passwords not the same'));
        });
      });

      it(`Email incorrect`, () => {
        controller.register({ ...registerData, email: 'a' }, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectCredentials(localUser.tempId, 'Not valid email address'));
        });
      });
    });
  });

  describe('Should pass', () => {
    it(`Validated`, () => {
      controller.register({ ...registerData, email: 'test22@test.test' }, localUser).catch((err) => {
        expect(err.name).toEqual('MongoPoolClosedError');
      });
    });
  });
});
